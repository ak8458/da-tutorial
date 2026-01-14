# FirstNet Website - Site Structure Analysis

**Project:** FirstNet to AEM Edge Delivery Services Migration  
**Date:** January 12, 2026  
**Status:** Site Structure Analysis (Phase 1)

---

## Executive Summary

This document provides a comprehensive analysis of the FirstNet website structure based on the sitemap containing **400+ pages**. The analysis identifies page templates, content patterns, and provides a foundation for the complete migration strategy to AEM Edge Delivery Services.

---

## 1. Site Structure Overview

### Total Pages: ~400+ URLs

### Primary Site Sections

Based on the sitemap URL patterns, the site is organized into the following major sections:

#### **1.1 Core Content Sections**

| Section | URL Pattern | Est. Pages | Purpose |
|---------|-------------|------------|---------|
| Homepage | `/` | 1 | Main landing page |
| Power of FirstNet | `/power-of-firstnet/*` | ~25 | Feature descriptions, advantages, promise |
| Coverage | `/coverage/*` | ~15 | Network coverage, enhancements, solutions |
| Plans | `/plans/*` | ~10 | Service plans and pricing |
| Devices | `/devices/*` | ~150 | Phones, tablets, hotspots, wearables, accessories |
| Apps & Solutions | `/apps-and-solutions/*` | ~40 | Software applications and integrations |
| Resources | `/resources/*` | ~30 | Case studies, guides, white papers |
| News & Events | `/newsroom/*` | ~50 | Press releases, blog posts, events |
| Agency Sign-up | `/agency-sign-up/*` | ~40 | Government agency onboarding pages |
| Help & Support | `/help/*` | ~30 | FAQs, device help, account support |
| Campaigns | `/campaigns/*` | ~10 | Marketing campaign landing pages |

#### **1.2 URL Pattern Analysis**

```
Root Level (/)
├── power-of-firstnet/
│   ├── firstnet-advantages/
│   │   ├── firstnet-central.html
│   │   ├── security.html
│   │   ├── training.html
│   │   └── service-plans-devices.html
│   ├── response-to-disasters.html
│   └── firstnet-promise/
│       └── security.html
│
├── coverage/
│   ├── coverage-new.html
│   ├── coverage-enhancements/
│   │   ├── in-building-solutions.html
│   │   ├── in-field-solutions.html
│   │   └── in-vehicle-solutions.html
│   ├── network-investments.html
│   ├── band-14.html
│   └── deployables.html
│
├── devices/
│   ├── phones/
│   │   ├── iphone-15-pro.html
│   │   ├── samsung-galaxy-s24.html
│   │   └── [~80 phone models]
│   ├── tablets/
│   │   └── [~20 tablet models]
│   ├── hotspots/
│   │   └── [~15 hotspot models]
│   ├── wearables/
│   │   └── [~10 wearable models]
│   └── accessories/
│       └── [~25 accessory items]
│
├── apps-and-solutions/
│   ├── push-to-talk/
│   ├── fleet-management/
│   └── [various solutions]
│
├── resources/
│   ├── case-studies/
│   ├── white-papers/
│   └── guides/
│
└── help/
    ├── device-help/
    └── account-help/
```

---

## 2. Page Template Identification

Based on URL patterns and typical website structures, the following page templates are identified:

### **Template 1: Homepage**
- **Count:** 1 page
- **URL:** `/`
- **Characteristics:** Hero section, feature highlights, CTAs, news/updates

### **Template 2: Feature/Marketing Pages**
- **Count:** ~70 pages
- **Sections:** `/power-of-firstnet/*`, `/coverage/*`, `/campaigns/*`
- **Characteristics:** 
  - Large hero sections with imagery
  - Feature highlights with icons/images
  - Testimonials/case studies
  - Multiple CTAs
  - Trust indicators

### **Template 3: Product Detail Pages (Devices)**
- **Count:** ~150 pages
- **Sections:** `/devices/phones/*`, `/devices/tablets/*`, `/devices/hotspots/*`, `/devices/wearables/*`
- **Characteristics:**
  - Product hero with image
  - Specifications table
  - Features grid/cards
  - Pricing information
  - Related products
  - Purchase CTAs

### **Template 4: Accessory/Product Support Pages**
- **Count:** ~25 pages
- **Section:** `/devices/accessories/*`
- **Characteristics:**
  - Product image and description
  - Compatibility information
  - Specifications
  - Purchase links

### **Template 5: Solution/Service Pages**
- **Count:** ~40 pages
- **Section:** `/apps-and-solutions/*`
- **Characteristics:**
  - Solution overview
  - Benefits/features
  - Use cases
  - Integration information
  - Demo/trial CTAs

### **Template 6: Resource/Content Pages**
- **Count:** ~30 pages
- **Section:** `/resources/*`
- **Characteristics:**
  - Article/document hero
  - Rich text content
  - Download CTAs
  - Related resources
  - Share functionality

### **Template 7: News/Blog Pages**
- **Count:** ~50 pages
- **Section:** `/newsroom/*`
- **Characteristics:**
  - Article header with date/author
  - Featured image
  - Article body content
  - Related articles
  - Social sharing

### **Template 8: Agency Onboarding Pages**
- **Count:** ~40 pages
- **Section:** `/agency-sign-up/*`
- **Characteristics:**
  - Agency-specific hero
  - Benefits for that agency
  - Sign-up forms
  - Contact information

### **Template 9: Help/Support Pages**
- **Count:** ~30 pages
- **Section:** `/help/*`
- **Characteristics:**
  - Step-by-step instructions
  - Screenshots/images
  - Accordion FAQs
  - Related help articles
  - Contact support CTAs

### **Template 10: Plan/Pricing Pages**
- **Count:** ~10 pages
- **Section:** `/plans/*`
- **Characteristics:**
  - Plan comparison tables
  - Feature lists
  - Pricing information
  - Sign-up CTAs

---

## 3. Common Content Patterns

Across all templates, the following content patterns appear frequently:

### **3.1 Hero Sections**
- Large heading + subheading
- Background image or video
- 1-2 CTA buttons
- Breadcrumb navigation

### **3.2 Feature Highlights**
- Icon + heading + description
- 3-4 items in a row
- Often with "Learn More" links

### **3.3 Card Grids**
- Product cards (image, title, description, CTA)
- Resource cards (thumbnail, title, excerpt, link)
- News cards (image, date, headline, summary)
- Typically 2-4 columns

### **3.4 Testimonials/Quotes**
- Quote text
- Attribution (name, title, organization)
- Optional photo
- Often with agency logo

### **3.5 Specifications/Tables**
- Technical specifications
- Plan comparisons
- Feature matrices
- Pricing tables

### **3.6 Accordion/FAQ Sections**
- Expandable Q&A format
- Common in help/support pages
- Also used for feature details

### **3.7 Call-to-Action Blocks**
- Prominent heading
- Supporting text
- Primary button(s)
- Often with background color/image

### **3.8 Image Galleries/Carousels**
- Product images
- Solution screenshots
- Event photos
- Device comparisons

### **3.9 Video Embeds**
- Product demos
- Testimonial videos
- Training content
- Promotional videos

### **3.10 Forms**
- Contact forms
- Sign-up forms
- Quote request forms
- Newsletter subscription

---

## 4. Content Component Frequency Estimate

Based on typical enterprise website patterns:

| Component Type | Est. Usage | Priority |
|----------------|------------|----------|
| Hero sections | 400+ (1 per page) | **Critical** |
| Card grids | 300+ | **Critical** |
| CTA blocks | 350+ | **Critical** |
| Feature highlights | 200+ | **High** |
| Tables | 150+ | **High** |
| Accordions | 100+ | **High** |
| Testimonials/Quotes | 80+ | **Medium** |
| Carousels | 60+ | **Medium** |
| Video embeds | 50+ | **Medium** |
| Forms | 40+ | **Medium** |
| Tabs | 30+ | **Low** |

---

## 5. Migration Complexity Assessment

### **5.1 Low Complexity Pages (~100 pages)**
- Simple content structure
- Mostly text and images
- Standard hero + content + CTA pattern
- Examples: Basic feature pages, simple help articles

### **5.2 Medium Complexity Pages (~200 pages)**
- Multiple content blocks
- Tables or accordions
- Product listings
- Examples: Most device pages, solution pages, resource pages

### **5.3 High Complexity Pages (~100 pages)**
- Rich interactive elements
- Complex tables/comparisons
- Multiple carousels or galleries
- Forms with validation
- Examples: Homepage, plan comparison pages, complex product pages

---

## 6. Technical Considerations

### **6.1 Image Assets**
- Estimated 2,000+ images across the site
- Product photos, hero images, icons, thumbnails
- Need image optimization and CDN strategy

### **6.2 Metadata**
- SEO metadata (title, description, keywords)
- Open Graph tags for social sharing
- Canonical URLs
- Structured data (JSON-LD for products)

### **6.3 Redirects**
- All 400+ URLs need redirect mapping
- Maintain URL structure where possible
- 301 redirects for SEO preservation

### **6.4 Forms & Integrations**
- Form submission endpoints
- CRM integrations
- Analytics tracking
- Third-party embeds

---

## 7. Next Steps

### **Phase 1: Sample Page Analysis** (Current)
- ✅ Sitemap structure analyzed
- ⏳ Select representative pages from each template
- ⏳ Scrape and analyze sample pages
- ⏳ Document detailed content patterns

### **Phase 2: Block Mapping**
- Map FirstNet components to EDS blocks
- Identify gaps requiring custom blocks
- Create block usage guidelines

### **Phase 3: Bulk Processing Scripts**
- Develop automated migration scripts
- Create batch processing workflows
- Build validation and QA tools

### **Phase 4: Migration Execution**
- Pilot migration (10-20 pages)
- Iterative migration by section
- QA and stakeholder review
- Production deployment

---

## 8. Representative Sample Pages for Analysis

To proceed with detailed analysis, the following representative pages should be scraped and analyzed:

### **Priority 1: Core Templates (10 pages)**
1. Homepage: `https://www.firstnet.com/`
2. Feature page: `https://www.firstnet.com/power-of-firstnet/firstnet-advantages.html`
3. Coverage page: `https://www.firstnet.com/coverage/coverage-new.html`
4. Phone product: `https://www.firstnet.com/devices/phones/iphone-15-pro.html`
5. Accessory: `https://www.firstnet.com/devices/accessories/att-cell-booster.html`
6. Solution page: `https://www.firstnet.com/apps-and-solutions/push-to-talk.html`
7. Resource page: `https://www.firstnet.com/resources/case-studies.html`
8. News article: `https://www.firstnet.com/newsroom/firstnet-expands-coverage.html`
9. Help page: `https://www.firstnet.com/help/device-help/activate-esim.html`
10. Plan page: `https://www.firstnet.com/plans/agency.html`

### **Priority 2: Complex Pages (5 pages)**
11. Campaign landing: `https://www.firstnet.com/campaigns/connected-response.html`
12. Agency signup: `https://www.firstnet.com/agency-sign-up/us-capitol-police.html`
13. Tablet product: `https://www.firstnet.com/devices/tablets/ipad-pro.html`
14. Solution detail: `https://www.firstnet.com/apps-and-solutions/fleet-management.html`
15. Help with images: `https://www.firstnet.com/help/device-help/numbersync-for-wearables.html`

---

## Appendix A: URL Categories

### Device URLs by Type
- **Phones:** ~80 pages (`/devices/phones/*`)
- **Tablets:** ~20 pages (`/devices/tablets/*`)
- **Hotspots:** ~15 pages (`/devices/hotspots/*`)
- **Wearables:** ~10 pages (`/devices/wearables/*`)
- **Accessories:** ~25 pages (`/devices/accessories/*`)

### Help URLs by Category
- **Device Help:** ~20 pages (`/help/device-help/*`)
- **Account Help:** ~10 pages (`/help/account-help/*`)

### Agency Sign-up URLs
- Federal agencies: ~15 pages
- State/local agencies: ~10 pages
- Healthcare organizations: ~5 pages
- Other eligible entities: ~10 pages

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-12 | AI Migration Team | Initial site structure analysis |

---

**Next Document:** Block Mapping Strategy (pending sample page analysis)
