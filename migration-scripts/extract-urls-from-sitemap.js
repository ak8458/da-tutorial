#!/usr/bin/env node

/**
 * Extract URLs from FirstNet sitemap.xml
 * 
 * Usage:
 *   node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml > urls.txt
 *   node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --json > urls.json
 *   node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/devices/" > device-urls.txt
 */

const fs = require('fs');

function extractUrls(sitemapFile, options = {}) {
  const content = fs.readFileSync(sitemapFile, 'utf-8');
  const urlMatches = content.matchAll(/<loc>(.*?)<\/loc>/g);
  let urls = Array.from(urlMatches, m => m[1]);
  
  // Apply filter if specified
  if (options.filter) {
    urls = urls.filter(url => url.includes(options.filter));
  }
  
  // Sort URLs
  urls.sort();
  
  return urls;
}

function groupUrlsBySection(urls) {
  const groups = {};
  
  urls.forEach(url => {
    const path = url.replace('https://www.firstnet.com', '');
    const section = path.split('/')[1] || 'root';
    
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(url);
  });
  
  return groups;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Extract URLs from FirstNet sitemap

Usage:
  node migration-scripts/extract-urls-from-sitemap.js <sitemap.xml> [options]

Options:
  --json              Output as JSON array
  --grouped           Group URLs by section
  --filter <pattern>  Only include URLs containing pattern
  --count             Show count only
  --help              Show this help

Examples:
  # Extract all URLs to text file
  node migration-scripts/extract-urls-from-sitemap.js sitemap.xml > urls.txt

  # Extract as JSON
  node migration-scripts/extract-urls-from-sitemap.js sitemap.xml --json > urls.json

  # Extract only device pages
  node migration-scripts/extract-urls-from-sitemap.js sitemap.xml --filter "/devices/" > device-urls.txt

  # Group by section
  node migration-scripts/extract-urls-from-sitemap.js sitemap.xml --grouped --json > grouped-urls.json

  # Count URLs
  node migration-scripts/extract-urls-from-sitemap.js sitemap.xml --count
`);
    process.exit(0);
  }
  
  const sitemapFile = args[0];
  const options = {
    json: args.includes('--json'),
    grouped: args.includes('--grouped'),
    count: args.includes('--count'),
    filter: args.includes('--filter') ? args[args.indexOf('--filter') + 1] : null,
  };
  
  if (!fs.existsSync(sitemapFile)) {
    console.error(`Error: File not found: ${sitemapFile}`);
    process.exit(1);
  }
  
  const urls = extractUrls(sitemapFile, options);
  
  if (options.count) {
    console.log(`Total URLs: ${urls.length}`);
    if (options.grouped) {
      const groups = groupUrlsBySection(urls);
      console.log('\nBy section:');
      Object.entries(groups)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(([section, sectionUrls]) => {
          console.log(`  ${section}: ${sectionUrls.length}`);
        });
    }
  } else if (options.grouped) {
    const groups = groupUrlsBySection(urls);
    if (options.json) {
      console.log(JSON.stringify(groups, null, 2));
    } else {
      Object.entries(groups)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([section, sectionUrls]) => {
          console.log(`\n# ${section} (${sectionUrls.length} URLs)`);
          sectionUrls.forEach(url => console.log(url));
        });
    }
  } else if (options.json) {
    console.log(JSON.stringify(urls, null, 2));
  } else {
    urls.forEach(url => console.log(url));
  }
}

main();
