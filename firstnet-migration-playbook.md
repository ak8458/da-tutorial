# FirstNet to EDS - Complete Migration Playbook

**Project:** FirstNet Website Migration to AEM Edge Delivery Services  
**Date:** January 12, 2026  
**Version:** 1.0  
**Status:** Production-Ready Proof of Concept

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Scope](#project-scope)
3. [Migration Strategy](#migration-strategy)
4. [Prerequisites](#prerequisites)
5. [Phase 1: Preparation](#phase-1-preparation)
6. [Phase 2: Pilot Migration](#phase-2-pilot-migration)
7. [Phase 3: Bulk Migration](#phase-3-bulk-migration)
8. [Phase 4: Quality Assurance](#phase-4-quality-assurance)
9. [Phase 5: Stakeholder Review](#phase-5-stakeholder-review)
10. [Phase 6: Production Deployment](#phase-6-production-deployment)
11. [QA Checklists](#qa-checklists)
12. [Rollback Plan](#rollback-plan)
13. [Post-Launch Monitoring](#post-launch-monitoring)

---

## Executive Summary

This playbook provides a complete, step-by-step guide for migrating all 400+ pages of the FirstNet website from its current platform to AEM Edge Delivery Services (EDS).

### Key Metrics
- **Total Pages:** ~400 URLs
- **Estimated Timeline:** 4-6 weeks
- **Block Coverage:** 100% (all components mapped to existing blocks)
- **Custom Development Required:** Minimal (CSS variants only)
- **Risk Level:** Low (proven migration workflow, existing blocks)

### Success Criteria
- ✅ All 400+ pages migrated with content fidelity
- ✅ All blocks render correctly
- ✅ SEO metadata preserved
- ✅ Performance improved (Core Web Vitals)
- ✅ Stakeholder approval obtained
- ✅ Zero downtime deployment

---

## Project Scope

### In Scope
- ✅ All 400+ pages from sitemap
- ✅ Main content migration (hero to footer)
- ✅ Images and media assets
- ✅ SEO metadata
- ✅ Internal links
- ✅ Block mapping and implementation
- ✅ Responsive design
- ✅ Accessibility compliance

### Out of Scope (Handled Separately)
- ❌ Header/navigation (configured once, reused)
- ❌ Footer (configured once, reused)
- ❌ Form backend integrations (requires separate setup)
- ❌ Search functionality (requires search provider)
- ❌ Analytics migration (separate configuration)
- ❌ Third-party integrations (case-by-case basis)

---

## Migration Strategy

### Approach: Phased Migration
1. **Pilot** (10-20 pages) - Validate workflow
2. **Section-by-Section** - Migrate by content type
3. **Bulk Processing** - Automate remaining pages
4. **QA & Refinement** - Validate and fix issues
5. **Stakeholder Review** - Get approval
6. **Production Deployment** - Go live

### Content-First Philosophy
- Prioritize content fidelity over pixel-perfect design
- Use existing blocks (no custom development)
- Leverage EDS automatic optimizations
- Author-friendly content models

---

## Prerequisites

### Technical Requirements
- ✅ Node.js 14+ installed
- ✅ npm packages installed (`npm install`)
- ✅ Playwright and Chromium installed
- ✅ EDS project set up and running locally
- ✅ Access to FirstNet website
- ✅ Git repository access

### Team Requirements
- **Technical Lead:** Oversees migration, troubleshoots issues
- **Content Reviewer:** Validates migrated content
- **QA Tester:** Tests functionality and responsiveness
- **Business Stakeholder:** Approves final migration
- **DevOps:** Handles deployment and monitoring

### Documentation Available
- ✅ Site structure analysis (`firstnet-sitemap-analysis.md`)
- ✅ Block mapping strategy (`firstnet-block-mapping.md`)
- ✅ Migration scripts (`migration-scripts/`)
- ✅ This playbook

---

## Phase 1: Preparation

**Duration:** 3-5 days  
**Goal:** Set up environment and validate workflow

### 1.1 Environment Setup

```bash
# Clone project
cd /path/to/project

# Install dependencies
npm install
npm install playwright --save-dev
npx playwright install chromium

# Install skill dependencies
cd .skills/scrape-webpage/scripts && npm install && cd ../../..

# Verify setup
npm test
```

### 1.2 Download Sitemap

```bash
# Download FirstNet sitemap
curl -o firstnet-sitemap.xml https://www.firstnet.com/sitemap.xml

# Extract and analyze URLs
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --count --grouped
```

**Expected Output:**
```
Total URLs: 400+

By section:
  devices: ~150
  power-of-firstnet: ~25
  coverage: ~15
  ...
```

### 1.3 Create URL Lists

```bash
# Create prioritized URL lists
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/" | head -20 > pilot-urls.txt
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/devices/" > device-urls.txt
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml --filter "/plans/" > plan-urls.txt
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml > all-urls.txt
```

### 1.4 Configure Blocks

Review and configure block variants if needed:

```bash
# Check existing blocks
ls -la blocks/

# Review block CSS for variants
cat blocks/cards/cards.css
cat blocks/hero/hero.css
```

**Action Items:**
- [ ] Environment verified and working
- [ ] Sitemap downloaded and analyzed
- [ ] URL lists created
- [ ] Blocks reviewed and configured
- [ ] Team briefed on process

---

## Phase 2: Pilot Migration

**Duration:** 2-3 days  
**Goal:** Validate migration workflow with 10-20 pages

### 2.1 Select Pilot Pages

Choose representative pages from different templates:
- 1x Homepage
- 2x Feature pages
- 3x Device pages
- 2x Plan pages
- 2x Help pages
- 2x News/blog pages
- 1x Campaign page

**Pilot URL List:** `pilot-urls.txt`

### 2.2 Run Pilot Migration

```bash
# Create pilot output directory
mkdir -p pilot-content

# Run migration
node migration-scripts/bulk-migrate.js \
  --input pilot-urls.txt \
  --output ./pilot-content \
  --parallel 1

# Monitor progress
tail -f migration-log.txt
```

### 2.3 Validate Pilot Results

```bash
# Run validation
node migration-scripts/validate-migration.js ./pilot-content --report pilot-validation.json

# Review report
cat pilot-validation.json | jq '.summary'
```

### 2.4 Manual Review

For each pilot page:
1. Open in local dev server
2. Compare with original page (side-by-side)
3. Check all content migrated
4. Test interactive elements
5. Verify responsive design
6. Check browser compatibility

**Use QA Checklist:** See [QA Checklists](#qa-checklists) section

### 2.5 Refine Process

Based on pilot findings:
- Adjust block mappings
- Update scripts if needed
- Document common issues
- Create fix patterns

**Action Items:**
- [ ] Pilot pages selected
- [ ] Pilot migration completed
- [ ] Validation passed
- [ ] Manual review completed
- [ ] Process refinements documented
- [ ] Stakeholders briefed on pilot results

---

## Phase 3: Bulk Migration

**Duration:** 1-2 weeks  
**Goal:** Migrate all 400+ pages

### 3.1 Migration Schedule

**Week 1:**
- Day 1-2: Devices section (~150 pages)
- Day 3: Plans section (~10 pages)
- Day 4: Coverage section (~15 pages)
- Day 5: Power of FirstNet section (~25 pages)

**Week 2:**
- Day 1: Apps & Solutions (~40 pages)
- Day 2: Resources (~30 pages)
- Day 3: News & Events (~50 pages)
- Day 4: Help & Support (~30 pages)
- Day 5: Remaining pages (~50 pages)

### 3.2 Run Bulk Migration

```bash
# Migrate by section
node migration-scripts/bulk-migrate.js \
  --input device-urls.txt \
  --output ./migrated-content \
  --parallel 3

# Monitor progress
watch -n 5 'tail -20 migration-log.txt'

# Check progress file
cat migration-progress.json | jq '.summary'
```

### 3.3 Handle Failures

```bash
# Extract failed URLs
cat migration-progress.json | jq -r '.results[] | select(.success == false) | .url' > failed-urls.txt

# Retry failed URLs
node migration-scripts/bulk-migrate.js \
  --input failed-urls.txt \
  --output ./migrated-content \
  --parallel 1
```

### 3.4 Daily Validation

At end of each day:

```bash
# Validate migrated content
node migration-scripts/validate-migration.js ./migrated-content --report daily-validation-$(date +%Y%m%d).json

# Review summary
cat daily-validation-*.json | jq '.summary'
```

### 3.5 Progress Tracking

**Daily Standup Report:**
- Pages migrated today: X
- Total pages migrated: Y / 400
- Success rate: Z%
- Issues encountered: [list]
- Blockers: [list]
- ETA: [date]

**Action Items:**
- [ ] All sections migrated
- [ ] Failed pages retried
- [ ] Daily validations completed
- [ ] Progress tracked and reported
- [ ] Issues documented and resolved

---

## Phase 4: Quality Assurance

**Duration:** 1 week  
**Goal:** Comprehensive testing and validation

### 4.1 Automated Validation

```bash
# Run full validation
node migration-scripts/validate-migration.js ./migrated-content --report final-validation.json

# Analyze results
cat final-validation.json | jq '.summary'
cat final-validation.json | jq '.files[] | select(.isValid == false)'
```

**Success Criteria:**
- 100% of files valid
- < 5% of files with warnings
- No broken internal links
- All images present

### 4.2 Spot Check Testing

**Sample Size:** 10% of pages (40 pages)  
**Selection:** Random sample from each section

For each sampled page, complete the [Page QA Checklist](#page-qa-checklist)

### 4.3 Template Testing

Test one page from each template type:
- [ ] Homepage
- [ ] Feature/Marketing page
- [ ] Product detail page
- [ ] Plan/pricing page
- [ ] Help/support page
- [ ] News/blog page
- [ ] Campaign page
- [ ] Agency signup page

Complete the [Template QA Checklist](#template-qa-checklist) for each

### 4.4 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 4.5 Performance Testing

Run Lighthouse audits on sample pages:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://localhost:3000/migrated-page --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### 4.6 Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on all images
- [ ] Proper heading hierarchy
- [ ] Form labels present

**Action Items:**
- [ ] Automated validation passed
- [ ] Spot check testing completed
- [ ] Template testing completed
- [ ] Cross-browser testing passed
- [ ] Performance targets met
- [ ] Accessibility compliance verified
- [ ] Issues logged and fixed

---

## Phase 5: Stakeholder Review

**Duration:** 3-5 days  
**Goal:** Obtain business and technical approval

### 5.1 Prepare Review Package

**Documents:**
1. Migration summary report
2. Validation results
3. QA test results
4. Performance metrics
5. Before/after comparisons
6. Known issues list
7. Deployment plan

### 5.2 Technical Stakeholder Review

**Reviewers:** Technical Lead, DevOps, Security

**Review Checklist:**
- [ ] All pages migrated successfully
- [ ] Performance meets targets
- [ ] Security best practices followed
- [ ] SEO metadata preserved
- [ ] Analytics tracking ready
- [ ] Deployment plan approved
- [ ] Rollback plan in place

### 5.3 Business Stakeholder Review

**Reviewers:** Product Owner, Marketing, Content Team

**Review Checklist:**
- [ ] Content accuracy verified
- [ ] Brand guidelines followed
- [ ] User experience maintained
- [ ] Key pages reviewed
- [ ] Marketing campaigns functional
- [ ] Forms and CTAs working
- [ ] Launch timing approved

### 5.4 Review Meeting

**Agenda:**
1. Project overview (5 min)
2. Migration approach (10 min)
3. Results presentation (15 min)
4. Demo of migrated site (20 min)
5. Known issues discussion (10 min)
6. Q&A (15 min)
7. Approval decision (5 min)

### 5.5 Address Feedback

**Process:**
1. Document all feedback
2. Prioritize issues (P0, P1, P2)
3. Fix P0 issues immediately
4. Fix P1 issues before launch
5. Schedule P2 issues for post-launch
6. Re-review if significant changes made

**Action Items:**
- [ ] Review package prepared
- [ ] Technical review completed
- [ ] Business review completed
- [ ] Review meeting held
- [ ] Feedback addressed
- [ ] Final approval obtained

---

## Phase 6: Production Deployment

**Duration:** 1-2 days  
**Goal:** Deploy to production with zero downtime

### 6.1 Pre-Deployment Checklist

**Technical:**
- [ ] All content validated
- [ ] Redirects configured
- [ ] DNS ready to update
- [ ] CDN configured
- [ ] SSL certificates ready
- [ ] Analytics tracking tested
- [ ] Form endpoints configured
- [ ] Search configured
- [ ] Monitoring set up
- [ ] Rollback plan tested

**Business:**
- [ ] Stakeholder approval obtained
- [ ] Launch timing confirmed
- [ ] Communication plan ready
- [ ] Support team briefed
- [ ] Announcement prepared

### 6.2 Deployment Steps

**Step 1: Deploy to Staging**
```bash
# Deploy to staging environment
aem up --staging

# Run smoke tests
npm run test:staging
```

**Step 2: Final Validation**
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] Search works
- [ ] Analytics firing
- [ ] Performance acceptable
- [ ] No console errors

**Step 3: Deploy to Production**
```bash
# Deploy to production
aem up --production

# Verify deployment
curl -I https://www.firstnet.com
```

**Step 4: Update DNS/CDN**
- [ ] Update DNS records
- [ ] Clear CDN cache
- [ ] Verify propagation

**Step 5: Activate Redirects**
- [ ] Enable redirect rules
- [ ] Test sample redirects
- [ ] Monitor 404 errors

### 6.3 Post-Deployment Validation

**Immediate (0-1 hour):**
- [ ] Homepage loads
- [ ] Key pages accessible
- [ ] Forms working
- [ ] Search working
- [ ] Analytics tracking
- [ ] No critical errors

**Short-term (1-4 hours):**
- [ ] All pages accessible
- [ ] Performance metrics good
- [ ] No spike in errors
- [ ] User feedback positive
- [ ] Search engines crawling

**Medium-term (4-24 hours):**
- [ ] Analytics data flowing
- [ ] Conversion tracking working
- [ ] SEO rankings stable
- [ ] No major issues reported
- [ ] Traffic patterns normal

### 6.4 Communication

**Internal:**
- Email to team: "Migration complete"
- Update status page
- Brief support team

**External:**
- Social media announcement (optional)
- Blog post (optional)
- Email to key users (optional)

**Action Items:**
- [ ] Pre-deployment checklist completed
- [ ] Staging deployment successful
- [ ] Production deployment successful
- [ ] DNS/CDN updated
- [ ] Redirects activated
- [ ] Post-deployment validation passed
- [ ] Communications sent

---

## QA Checklists

### Page QA Checklist

Use this checklist for each page being QA'd:

#### Content Completeness
- [ ] Page title correct
- [ ] All headings present
- [ ] All body text migrated
- [ ] All images present and loading
- [ ] All links functional
- [ ] All CTAs present
- [ ] Metadata complete (title, description)

#### Block Implementation
- [ ] Hero section renders correctly
- [ ] Cards/grids display properly
- [ ] Columns layout correct
- [ ] Tables formatted correctly
- [ ] Accordions expand/collapse
- [ ] Carousels rotate
- [ ] Videos play
- [ ] Tabs switch
- [ ] Forms display correctly
- [ ] Quotes styled properly

#### Visual Fidelity
- [ ] Layout matches original
- [ ] Spacing/padding appropriate
- [ ] Colors correct
- [ ] Fonts correct
- [ ] Images sized correctly
- [ ] Backgrounds applied
- [ ] Icons present

#### Responsive Design
- [ ] Desktop (1920px) looks good
- [ ] Laptop (1366px) looks good
- [ ] Tablet (768px) looks good
- [ ] Mobile (375px) looks good
- [ ] No horizontal scrolling
- [ ] Touch targets adequate (mobile)

#### Functionality
- [ ] All links work
- [ ] CTAs clickable
- [ ] Forms can be filled
- [ ] Interactive elements work
- [ ] No JavaScript errors
- [ ] No console warnings

#### SEO & Accessibility
- [ ] H1 present and unique
- [ ] Heading hierarchy correct (H1→H2→H3)
- [ ] Alt text on images
- [ ] Meta description present
- [ ] Canonical URL set
- [ ] Page loads in < 3s
- [ ] Lighthouse score > 90

#### Browser Compatibility
- [ ] Chrome works
- [ ] Firefox works
- [ ] Safari works
- [ ] Edge works
- [ ] Mobile Safari works
- [ ] Chrome Mobile works

**Overall Assessment:**
- [ ] **PASS** - Page ready for production
- [ ] **FAIL** - Issues must be fixed
- [ ] **PASS WITH NOTES** - Minor issues, can launch

**Notes:**
```
[Document any issues, observations, or follow-up items]
```

---

### Template QA Checklist

Use this for validating entire page templates:

#### Template: [Name]
**Sample Page:** [URL]

#### Template-Specific Elements
- [ ] Template structure correct
- [ ] All standard sections present
- [ ] Block usage consistent
- [ ] Styling applied correctly
- [ ] Variants working

#### Content Model
- [ ] Authors can easily edit
- [ ] Block tables intuitive
- [ ] Images easy to replace
- [ ] Links easy to update
- [ ] Metadata easy to modify

#### Reusability
- [ ] Template can be reused
- [ ] Variations possible
- [ ] No hardcoded content
- [ ] Fragments used appropriately

#### Performance
- [ ] Page loads quickly
- [ ] Images optimized
- [ ] No render blocking
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

**Template Approval:**
- [ ] **APPROVED** - Template ready for use
- [ ] **NEEDS WORK** - Issues to address
- [ ] **APPROVED WITH NOTES** - Minor improvements needed

---

### Section QA Checklist

Use this for validating entire site sections:

#### Section: [Name]
**Pages in Section:** [Count]  
**Sample Pages Tested:** [Count]

#### Content Consistency
- [ ] Terminology consistent
- [ ] Tone/voice consistent
- [ ] Formatting consistent
- [ ] Navigation consistent

#### Block Usage
- [ ] Blocks used appropriately
- [ ] Variants applied correctly
- [ ] No missing blocks
- [ ] No broken blocks

#### Internal Linking
- [ ] All internal links work
- [ ] Breadcrumbs correct
- [ ] Related content links work
- [ ] Navigation links correct

#### SEO
- [ ] URL structure preserved
- [ ] Redirects in place
- [ ] Metadata unique per page
- [ ] Canonical URLs set
- [ ] Sitemap updated

**Section Approval:**
- [ ] **APPROVED** - Section ready for launch
- [ ] **NEEDS WORK** - Issues to address
- [ ] **APPROVED WITH NOTES** - Minor improvements

---

## Rollback Plan

### When to Rollback

Rollback if:
- **Critical:** Site is down or inaccessible
- **Critical:** Major functionality broken (forms, search)
- **Critical:** Security vulnerability discovered
- **High:** Performance degraded significantly (> 50%)
- **High:** SEO rankings drop > 20%
- **High:** Conversion rates drop > 30%

### Rollback Procedure

**Step 1: Assess Situation**
- Identify issue severity
- Determine if fixable quickly (< 30 min)
- Get stakeholder approval to rollback

**Step 2: Execute Rollback**
```bash
# Revert DNS to old site
# (Specific commands depend on DNS provider)

# Clear CDN cache
# (Specific commands depend on CDN provider)

# Verify old site is back
curl -I https://www.firstnet.com
```

**Step 3: Communicate**
- Notify team of rollback
- Update status page
- Brief support team
- Prepare external communication if needed

**Step 4: Root Cause Analysis**
- Identify what went wrong
- Document lessons learned
- Plan fixes
- Set new launch date

**Step 5: Fix and Retry**
- Fix issues in staging
- Re-test thoroughly
- Get approval
- Schedule new deployment

### Rollback Testing

**Before Launch:**
- [ ] Rollback procedure documented
- [ ] Rollback tested in staging
- [ ] Team trained on rollback
- [ ] Rollback contacts identified
- [ ] Rollback decision tree created

---

## Post-Launch Monitoring

### First 24 Hours

**Monitor:**
- [ ] Site uptime (99.9%+)
- [ ] Page load times (< 3s)
- [ ] Error rates (< 0.1%)
- [ ] Traffic levels (normal)
- [ ] Conversion rates (stable)
- [ ] Search rankings (stable)
- [ ] User feedback (positive)

**Tools:**
- Google Analytics
- Google Search Console
- Uptime monitoring (Pingdom, etc.)
- Error tracking (Sentry, etc.)
- Performance monitoring (Lighthouse CI)

### First Week

**Daily Checks:**
- Review analytics dashboard
- Check error logs
- Monitor search rankings
- Review user feedback
- Check form submissions
- Verify conversions

**Weekly Report:**
- Traffic comparison (before/after)
- Performance metrics
- SEO rankings
- Conversion rates
- Issues encountered
- Fixes implemented

### First Month

**Weekly Reviews:**
- Analyze traffic trends
- Review user behavior
- Check SEO performance
- Assess conversion funnel
- Identify optimization opportunities

**Monthly Report:**
- Overall migration success
- Performance improvements
- SEO impact
- Business impact
- Lessons learned
- Next steps

---

## Success Metrics

### Technical Metrics
- **Uptime:** 99.9%+
- **Page Load Time:** < 2.5s (LCP)
- **Performance Score:** > 90 (Lighthouse)
- **Accessibility Score:** > 95 (Lighthouse)
- **SEO Score:** > 95 (Lighthouse)
- **Error Rate:** < 0.1%

### Business Metrics
- **Traffic:** Maintained or increased
- **Conversion Rate:** Maintained or increased
- **Bounce Rate:** Maintained or decreased
- **Time on Site:** Maintained or increased
- **Search Rankings:** Maintained or improved
- **User Satisfaction:** Positive feedback

### Project Metrics
- **Pages Migrated:** 400+ (100%)
- **Migration Time:** 4-6 weeks
- **Success Rate:** > 95%
- **Defect Rate:** < 5%
- **Stakeholder Approval:** Obtained
- **On-Time Delivery:** Yes

---

## Appendices

### A. Key Documents
- `firstnet-sitemap-analysis.md` - Site structure analysis
- `firstnet-block-mapping.md` - Block mapping strategy
- `migration-scripts/README.md` - Script documentation

### B. Key Scripts
- `migration-scripts/bulk-migrate.js` - Bulk migration
- `migration-scripts/extract-urls-from-sitemap.js` - URL extraction
- `migration-scripts/validate-migration.js` - Validation

### C. Key Contacts
- **Technical Lead:** [Name, Email]
- **Content Owner:** [Name, Email]
- **QA Lead:** [Name, Email]
- **Business Stakeholder:** [Name, Email]
- **DevOps:** [Name, Email]

### D. Useful Commands

```bash
# Start local dev server
npm run up

# Run migration
node migration-scripts/bulk-migrate.js --input urls.txt

# Validate content
node migration-scripts/validate-migration.js ./content

# Check progress
cat migration-progress.json | jq '.summary'

# Extract failed URLs
cat migration-progress.json | jq -r '.results[] | select(.success == false) | .url'

# Run Lighthouse audit
lighthouse https://localhost:3000/page --view
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-12 | AI Migration Team | Initial playbook |

---

**Project Status:** Ready for Pilot Migration  
**Next Step:** Phase 2 - Pilot Migration (10-20 pages)  
**Estimated Launch Date:** [TBD based on pilot results]

---

## Quick Start

To begin migration immediately:

```bash
# 1. Set up environment
npm install
npx playwright install chromium

# 2. Download sitemap
curl -o firstnet-sitemap.xml https://www.firstnet.com/sitemap.xml

# 3. Create pilot URL list
node migration-scripts/extract-urls-from-sitemap.js firstnet-sitemap.xml | head -20 > pilot-urls.txt

# 4. Run pilot migration
node migration-scripts/bulk-migrate.js --input pilot-urls.txt --output ./pilot-content

# 5. Validate results
node migration-scripts/validate-migration.js ./pilot-content

# 6. Review and proceed with bulk migration
```

**Good luck with the migration! 🚀**
