#!/usr/bin/env node

/**
 * FirstNet Bulk Migration Script
 * 
 * This script processes multiple URLs from the FirstNet sitemap and migrates them to EDS.
 * It uses the existing page-import skill workflow for each page.
 * 
 * Usage:
 *   node migration-scripts/bulk-migrate.js --input sitemap.xml --output ./migrated-content
 *   node migration-scripts/bulk-migrate.js --input urls.txt --output ./migrated-content --parallel 3
 *   node migration-scripts/bulk-migrate.js --resume migration-progress.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  maxParallel: 1, // Number of pages to process in parallel (start with 1 for safety)
  retryAttempts: 3,
  retryDelay: 5000, // ms
  outputDir: './migrated-content',
  workDir: './import-work',
  progressFile: 'migration-progress.json',
  logFile: 'migration-log.txt',
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: CONFIG.outputDir,
    parallel: CONFIG.maxParallel,
    resume: null,
    dryRun: false,
    startFrom: 0,
    limit: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--input':
        options.input = args[++i];
        break;
      case '--output':
        options.output = args[++i];
        break;
      case '--parallel':
        options.parallel = parseInt(args[++i], 10);
        break;
      case '--resume':
        options.resume = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--start-from':
        options.startFrom = parseInt(args[++i], 10);
        break;
      case '--limit':
        options.limit = parseInt(args[++i], 10);
        break;
      case '--help':
        printHelp();
        process.exit(0);
      default:
        console.error(`Unknown option: ${args[i]}`);
        process.exit(1);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
FirstNet Bulk Migration Script

Usage:
  node migration-scripts/bulk-migrate.js [options]

Options:
  --input <file>       Input file (sitemap.xml or urls.txt)
  --output <dir>       Output directory (default: ./migrated-content)
  --parallel <num>     Number of parallel processes (default: 1)
  --resume <file>      Resume from progress file
  --dry-run            Show what would be done without doing it
  --start-from <num>   Start from URL index (default: 0)
  --limit <num>        Limit number of URLs to process
  --help               Show this help message

Examples:
  # Process all URLs from sitemap
  node migration-scripts/bulk-migrate.js --input firstnet-sitemap.xml

  # Process with 3 parallel workers
  node migration-scripts/bulk-migrate.js --input urls.txt --parallel 3

  # Resume from previous run
  node migration-scripts/bulk-migrate.js --resume migration-progress.json

  # Dry run to see what would happen
  node migration-scripts/bulk-migrate.js --input urls.txt --dry-run

  # Process only 10 URLs starting from index 50
  node migration-scripts/bulk-migrate.js --input urls.txt --start-from 50 --limit 10
`);
}

// Load URLs from input file
function loadUrls(inputFile) {
  const ext = path.extname(inputFile).toLowerCase();
  
  if (ext === '.xml') {
    return loadUrlsFromSitemap(inputFile);
  } else if (ext === '.txt') {
    return loadUrlsFromTextFile(inputFile);
  } else if (ext === '.json') {
    return loadUrlsFromJson(inputFile);
  } else {
    throw new Error(`Unsupported input file format: ${ext}`);
  }
}

function loadUrlsFromSitemap(sitemapFile) {
  const content = fs.readFileSync(sitemapFile, 'utf-8');
  const urlMatches = content.matchAll(/<loc>(.*?)<\/loc>/g);
  const urls = Array.from(urlMatches, m => m[1]);
  console.log(`Loaded ${urls.length} URLs from sitemap`);
  return urls;
}

function loadUrlsFromTextFile(textFile) {
  const content = fs.readFileSync(textFile, 'utf-8');
  const urls = content.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
  console.log(`Loaded ${urls.length} URLs from text file`);
  return urls;
}

function loadUrlsFromJson(jsonFile) {
  const content = fs.readFileSync(jsonFile, 'utf-8');
  const data = JSON.parse(content);
  const urls = data.urls || data;
  console.log(`Loaded ${urls.length} URLs from JSON file`);
  return urls;
}

// Load or initialize progress
function loadProgress(progressFile) {
  if (fs.existsSync(progressFile)) {
    const content = fs.readFileSync(progressFile, 'utf-8');
    return JSON.parse(content);
  }
  
  return {
    startTime: new Date().toISOString(),
    totalUrls: 0,
    processed: 0,
    successful: 0,
    failed: 0,
    skipped: 0,
    results: [],
  };
}

function saveProgress(progress, progressFile) {
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
}

function log(message, logFile) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(logFile, logMessage);
}

// Migrate a single URL
async function migrateUrl(url, outputDir, workDir, retryCount = 0) {
  const urlSlug = url.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-').substring(0, 50);
  const pageWorkDir = path.join(workDir, urlSlug);
  
  try {
    // Create work directory
    fs.mkdirSync(pageWorkDir, { recursive: true });
    
    // Run the scrape-webpage script
    const scrapeCmd = `node .skills/scrape-webpage/scripts/analyze-webpage.js "${url}" --output ${pageWorkDir}`;
    console.log(`  Scraping: ${url}`);
    execSync(scrapeCmd, { stdio: 'pipe' });
    
    // Check if metadata.json was created
    const metadataPath = path.join(pageWorkDir, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
      throw new Error('Scraping failed: metadata.json not found');
    }
    
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    
    // TODO: Add steps to run identify-page-structure, authoring-analysis, and generate-import-html
    // For now, we just scrape and save metadata
    
    return {
      success: true,
      url,
      metadata,
      workDir: pageWorkDir,
    };
    
  } catch (error) {
    if (retryCount < CONFIG.retryAttempts) {
      console.log(`  Retry ${retryCount + 1}/${CONFIG.retryAttempts} for ${url}`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
      return migrateUrl(url, outputDir, workDir, retryCount + 1);
    }
    
    return {
      success: false,
      url,
      error: error.message,
    };
  }
}

// Main execution
async function main() {
  const options = parseArgs();
  
  // Load URLs
  let urls;
  if (options.resume) {
    const progress = loadProgress(options.resume);
    urls = progress.results
      .filter(r => !r.success)
      .map(r => r.url);
    console.log(`Resuming: ${urls.length} failed URLs to retry`);
  } else if (options.input) {
    urls = loadUrls(options.input);
    
    // Apply start-from and limit
    if (options.startFrom > 0) {
      urls = urls.slice(options.startFrom);
      console.log(`Starting from index ${options.startFrom}`);
    }
    if (options.limit) {
      urls = urls.slice(0, options.limit);
      console.log(`Limited to ${options.limit} URLs`);
    }
  } else {
    console.error('Error: --input or --resume required');
    printHelp();
    process.exit(1);
  }
  
  if (options.dryRun) {
    console.log('\nDRY RUN - Would process the following URLs:');
    urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
    console.log(`\nTotal: ${urls.length} URLs`);
    return;
  }
  
  // Initialize progress
  const progress = loadProgress(CONFIG.progressFile);
  progress.totalUrls = urls.length;
  
  // Create output directories
  fs.mkdirSync(options.output, { recursive: true });
  fs.mkdirSync(CONFIG.workDir, { recursive: true });
  
  log(`Starting migration of ${urls.length} URLs`, CONFIG.logFile);
  log(`Output directory: ${options.output}`, CONFIG.logFile);
  log(`Parallel workers: ${options.parallel}`, CONFIG.logFile);
  
  // Process URLs
  const startTime = Date.now();
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    log(`\n[${i + 1}/${urls.length}] Processing: ${url}`, CONFIG.logFile);
    
    const result = await migrateUrl(url, options.output, CONFIG.workDir);
    
    if (result.success) {
      progress.successful++;
      log(`  ✓ Success`, CONFIG.logFile);
    } else {
      progress.failed++;
      log(`  ✗ Failed: ${result.error}`, CONFIG.logFile);
    }
    
    progress.processed++;
    progress.results.push(result);
    
    // Save progress periodically
    if (progress.processed % 10 === 0) {
      saveProgress(progress, CONFIG.progressFile);
    }
    
    // Estimate time remaining
    const elapsed = Date.now() - startTime;
    const avgTime = elapsed / progress.processed;
    const remaining = (urls.length - progress.processed) * avgTime;
    const remainingMin = Math.round(remaining / 60000);
    log(`  Progress: ${progress.processed}/${urls.length} | Est. ${remainingMin}min remaining`, CONFIG.logFile);
  }
  
  // Final save
  progress.endTime = new Date().toISOString();
  saveProgress(progress, CONFIG.progressFile);
  
  // Summary
  const totalTime = Math.round((Date.now() - startTime) / 1000);
  log(`\n${'='.repeat(60)}`, CONFIG.logFile);
  log(`Migration Complete!`, CONFIG.logFile);
  log(`${'='.repeat(60)}`, CONFIG.logFile);
  log(`Total URLs: ${progress.totalUrls}`, CONFIG.logFile);
  log(`Successful: ${progress.successful}`, CONFIG.logFile);
  log(`Failed: ${progress.failed}`, CONFIG.logFile);
  log(`Total time: ${totalTime}s`, CONFIG.logFile);
  log(`Average: ${(totalTime / progress.totalUrls).toFixed(2)}s per URL`, CONFIG.logFile);
  log(`\nProgress saved to: ${CONFIG.progressFile}`, CONFIG.logFile);
  log(`Log saved to: ${CONFIG.logFile}`, CONFIG.logFile);
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
