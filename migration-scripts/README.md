# FirstNet Migration Scripts

This directory contains automation scripts for migrating the FirstNet website to AEM Edge Delivery Services.

## Scripts Overview

### 1. `bulk-migrate.js`
Main migration script that processes multiple URLs in batch.

**Features:**
- Batch processing of URLs from sitemap or text file
- Parallel processing support
- Progress tracking and resume capability
- Retry logic for failed pages
- Detailed logging

**Usage:**
```bash
# Process all URLs from sitemap
node migration-scripts/bulk-migrate.js --input firstnet-sitemap.xml

# Process with 3 parallel workers
node migration-scripts/bulk-migrate.js --input urls.txt --parallel 3 --output ./migrated-content

# Resume from previous run
node migration-scripts/bulk-migrate.js --resume migration-progress.json

# Dry run to preview
node migration-scripts/bulk-migrate.js --input urls.txt --dry-run

# Process specific range
node migration-scripts/bulk-migrate.js --input urls.txt --start-from 50 --limit 10
```

### 2. `extract-urls-from-sitemap.js`
Extract and filter URLs from sitemap.xml.

**Features:**
- Extract all URLs from sitemap
- Filter by URL pattern
- Group by section
- Output as text or JSON
- Count URLs by section

**Usage:**
```bash
# Extract all URLs
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml > urls.txt

# Extract as JSON
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --json > urls.json

# Extract only device pages
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/devices/" > device-urls.txt

# Group by section
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --grouped --json > grouped-urls.json

# Count URLs by section
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --count --grouped
```

### 3. `validate-migration.js`
Validate migrated content for completeness and quality.

**Features:**
- Check all HTML files exist
- Validate images are present
- Check for broken internal links
- Detect common issues
- Generate validation report

**Usage:**
```bash
# Validate migrated content
node migration-scripts/validate-migration.js ./migrated-content

# Save detailed report
node migration-scripts/validate-migration.js ./migrated-content --report validation-report.json
```

## Migration Workflow

### Step 1: Prepare URL List
```bash
# Download sitemap (if not already done)
curl -o firstnet-sitemap.xml https://www.firstnet.com/sitemap.xml

# Extract URLs and review
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --count --grouped

# Create filtered lists for phased migration
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/devices/" > device-urls.txt
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/plans/" > plan-urls.txt
```

### Step 2: Pilot Migration (10-20 pages)
```bash
# Create pilot URL list
head -20 urls.txt > pilot-urls.txt

# Run pilot migration
node migration-scripts/bulk-migrate.js --input pilot-urls.txt --output ./pilot-content

# Validate pilot
node migration-scripts/validate-migration.js ./pilot-content --report pilot-validation.json
```

### Step 3: Review & Refine
- Review migrated pilot pages
- Check validation report
- Adjust block mappings if needed
- Update scripts based on findings

### Step 4: Phased Migration
```bash
# Migrate by section
node migration-scripts/bulk-migrate.js --input device-urls.txt --output ./migrated-content
node migration-scripts/bulk-migrate.js --input plan-urls.txt --output ./migrated-content

# Or migrate all at once
node migration-scripts/bulk-migrate.js --input urls.txt --output ./migrated-content --parallel 3
```

### Step 5: Validation & QA
```bash
# Validate all migrated content
node migration-scripts/validate-migration.js ./migrated-content --report final-validation.json

# Review validation report
cat final-validation.json | jq '.summary'
```

### Step 6: Manual Review
- Spot-check random pages
- Test interactive elements
- Verify forms work
- Check responsive design
- Test on different browsers

## Progress Tracking

The bulk migration script creates a `migration-progress.json` file that tracks:
- Total URLs to process
- Processed count
- Success/failure counts
- Detailed results for each URL
- Timestamps

**Resume from failure:**
```bash
node migration-scripts/bulk-migrate.js --resume migration-progress.json
```

## Logging

All migration activity is logged to `migration-log.txt`:
- Timestamps for each operation
- Success/failure status
- Error messages
- Progress updates
- Summary statistics

## Performance Tips

### Parallel Processing
- Start with `--parallel 1` to ensure stability
- Increase to `--parallel 3` for faster processing
- Monitor system resources
- Too many parallel processes can cause failures

### Batch Size
- Process in batches of 50-100 URLs
- Allows for incremental progress
- Easier to troubleshoot issues
- Can adjust strategy between batches

### Network Considerations
- Some pages may be slow to load
- Retry logic handles temporary failures
- Consider running during off-peak hours
- Monitor for rate limiting

## Troubleshooting

### Script Fails to Start
```bash
# Check Node.js version (requires Node 14+)
node --version

# Install dependencies
npm install

# Make scripts executable
chmod +x migration-scripts/*.js
```

### Migration Failures
```bash
# Check migration log
tail -100 migration-log.txt

# Review progress file
cat migration-progress.json | jq '.results[] | select(.success == false)'

# Retry failed URLs
node migration-scripts/bulk-migrate.js --resume migration-progress.json
```

### Validation Errors
```bash
# Get summary
node migration-scripts/validate-migration.js ./migrated-content | head -20

# Get detailed report
node migration-scripts/validate-migration.js ./migrated-content --report report.json
cat report.json | jq '.files[] | select(.isValid == false)'
```

## Advanced Usage

### Custom URL List
Create a text file with URLs (one per line):
```
https://www.firstnet.com/
https://www.firstnet.com/coverage.html
https://www.firstnet.com/plans.html
```

Then migrate:
```bash
node migration-scripts/bulk-migrate.js --input custom-urls.txt
```

### Selective Re-migration
Extract failed URLs from progress file:
```bash
cat migration-progress.json | jq -r '.results[] | select(.success == false) | .url' > failed-urls.txt
node migration-scripts/bulk-migrate.js --input failed-urls.txt
```

### Integration with CI/CD
```bash
#!/bin/bash
# migrate-and-validate.sh

# Run migration
node migration-scripts/bulk-migrate.js --input urls.txt --output ./content

# Validate
node migration-scripts/validate-migration.js ./content --report validation.json

# Check exit code
if [ $? -eq 0 ]; then
  echo "✓ Migration validated successfully"
  exit 0
else
  echo "✗ Validation failed"
  cat validation.json | jq '.summary'
  exit 1
fi
```

## Configuration

Edit the `CONFIG` object in `bulk-migrate.js` to customize:
- `maxParallel`: Default parallel workers
- `retryAttempts`: Number of retries for failed pages
- `retryDelay`: Delay between retries (ms)
- `outputDir`: Default output directory
- `workDir`: Temporary work directory

## Support

For issues or questions:
1. Check the migration log: `migration-log.txt`
2. Review progress file: `migration-progress.json`
3. Run validation: `validate-migration.js`
4. Check the main migration playbook: `../firstnet-migration-playbook.md`

## Next Steps

After successful migration:
1. Deploy to staging environment
2. Run full QA testing
3. Get stakeholder approval
4. Deploy to production
5. Set up redirects
6. Monitor analytics

See `../firstnet-migration-playbook.md` for complete workflow.
