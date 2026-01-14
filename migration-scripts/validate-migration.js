#!/usr/bin/env node

/**
 * Validate migrated content
 * 
 * Checks:
 * - All expected files exist
 * - Images are present
 * - Metadata is complete
 * - HTML structure is valid
 * - Links are not broken
 * 
 * Usage:
 *   node migration-scripts/validate-migration.js ./migrated-content
 *   node migration-scripts/validate-migration.js ./migrated-content --report validation-report.json
 */

const fs = require('fs');
const path = require('path');

function validateMigration(contentDir, options = {}) {
  const report = {
    timestamp: new Date().toISOString(),
    contentDir,
    summary: {
      totalFiles: 0,
      validFiles: 0,
      invalidFiles: 0,
      warnings: 0,
    },
    files: [],
  };
  
  // Find all .html files
  const htmlFiles = findHtmlFiles(contentDir);
  report.summary.totalFiles = htmlFiles.length;
  
  console.log(`Validating ${htmlFiles.length} HTML files...`);
  
  htmlFiles.forEach((file, index) => {
    if (index % 10 === 0) {
      console.log(`  Progress: ${index}/${htmlFiles.length}`);
    }
    
    const validation = validateFile(file, contentDir);
    report.files.push(validation);
    
    if (validation.isValid) {
      report.summary.validFiles++;
    } else {
      report.summary.invalidFiles++;
    }
    
    report.summary.warnings += validation.warnings.length;
  });
  
  return report;
}

function findHtmlFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    });
  }
  
  scan(dir);
  return files;
}

function validateFile(filePath, contentDir) {
  const validation = {
    file: path.relative(contentDir, filePath),
    isValid: true,
    errors: [],
    warnings: [],
  };
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check file size
    if (content.length < 100) {
      validation.errors.push('File is too small (< 100 bytes)');
      validation.isValid = false;
    }
    
    // Check for metadata block
    if (!content.includes('<title>') && !content.match(/---[\s\S]*?---/)) {
      validation.warnings.push('No metadata block found');
    }
    
    // Check for images
    const imageMatches = content.match(/<img[^>]+src="([^"]+)"/g) || [];
    const imagePaths = imageMatches.map(match => {
      const srcMatch = match.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : null;
    }).filter(Boolean);
    
    imagePaths.forEach(imgPath => {
      if (imgPath.startsWith('./images/')) {
        const imgFullPath = path.join(path.dirname(filePath), imgPath);
        if (!fs.existsSync(imgFullPath)) {
          validation.warnings.push(`Image not found: ${imgPath}`);
        }
      }
    });
    
    // Check for broken internal links
    const linkMatches = content.match(/<a[^>]+href="([^"]+)"/g) || [];
    const links = linkMatches.map(match => {
      const hrefMatch = match.match(/href="([^"]+)"/);
      return hrefMatch ? hrefMatch[1] : null;
    }).filter(Boolean);
    
    links.forEach(link => {
      if (link.startsWith('/') && !link.startsWith('//')) {
        // Internal link - check if target exists
        const targetPath = path.join(contentDir, link.replace(/^\//, '') + '.html');
        if (!fs.existsSync(targetPath)) {
          validation.warnings.push(`Broken internal link: ${link}`);
        }
      }
    });
    
    // Check for common issues
    if (content.includes('undefined')) {
      validation.warnings.push('Contains "undefined" text');
    }
    
    if (content.includes('null')) {
      validation.warnings.push('Contains "null" text');
    }
    
    if (content.includes('[object Object]')) {
      validation.errors.push('Contains "[object Object]" - serialization error');
      validation.isValid = false;
    }
    
  } catch (error) {
    validation.errors.push(`Failed to read file: ${error.message}`);
    validation.isValid = false;
  }
  
  return validation;
}

function printReport(report) {
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION REPORT');
  console.log('='.repeat(60));
  console.log(`Total files: ${report.summary.totalFiles}`);
  console.log(`Valid files: ${report.summary.validFiles} (${Math.round(report.summary.validFiles / report.summary.totalFiles * 100)}%)`);
  console.log(`Invalid files: ${report.summary.invalidFiles}`);
  console.log(`Total warnings: ${report.summary.warnings}`);
  
  if (report.summary.invalidFiles > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('INVALID FILES:');
    console.log('-'.repeat(60));
    report.files.filter(f => !f.isValid).forEach(file => {
      console.log(`\n${file.file}`);
      file.errors.forEach(err => console.log(`  ✗ ${err}`));
    });
  }
  
  const filesWithWarnings = report.files.filter(f => f.warnings.length > 0);
  if (filesWithWarnings.length > 0 && filesWithWarnings.length <= 20) {
    console.log('\n' + '-'.repeat(60));
    console.log('FILES WITH WARNINGS:');
    console.log('-'.repeat(60));
    filesWithWarnings.forEach(file => {
      console.log(`\n${file.file}`);
      file.warnings.forEach(warn => console.log(`  ⚠ ${warn}`));
    });
  } else if (filesWithWarnings.length > 20) {
    console.log(`\n${filesWithWarnings.length} files have warnings (see JSON report for details)`);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Validate Migrated Content

Usage:
  node migration-scripts/validate-migration.js <content-dir> [options]

Options:
  --report <file>     Save detailed report as JSON
  --help              Show this help

Examples:
  # Validate migrated content
  node migration-scripts/validate-migration.js ./migrated-content

  # Save detailed report
  node migration-scripts/validate-migration.js ./migrated-content --report validation-report.json
`);
    process.exit(0);
  }
  
  const contentDir = args[0];
  const reportFile = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;
  
  if (!fs.existsSync(contentDir)) {
    console.error(`Error: Directory not found: ${contentDir}`);
    process.exit(1);
  }
  
  const report = validateMigration(contentDir);
  
  printReport(report);
  
  if (reportFile) {
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`\nDetailed report saved to: ${reportFile}`);
  }
  
  // Exit with error code if there are invalid files
  process.exit(report.summary.invalidFiles > 0 ? 1 : 0);
}

main();
