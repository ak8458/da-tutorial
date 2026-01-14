# FirstNet to EDS - Block Mapping Strategy

**Project:** FirstNet Website Migration to AEM Edge Delivery Services  
**Date:** January 12, 2026  
**Status:** Block Mapping & Component Analysis

---

## Executive Summary

This document provides a comprehensive mapping between FirstNet website components and AEM Edge Delivery Services blocks. The strategy prioritizes reusing existing boilerplate blocks to minimize custom development while ensuring content fidelity.

---

## Available EDS Blocks (Current Project)

The following blocks are available in the current boilerplate:

| Block Name | Purpose | Status |
|------------|---------|--------|
| **accordion** | Expandable Q&A sections | ✅ Available |
| **article-hero** | Article/blog post headers | ✅ Available |
| **cards** | Grid of content items | ✅ Available |
| **carousel** | Rotating content/images | ✅ Available |
| **columns** | Side-by-side layouts | ✅ Available |
| **embed** | Third-party content embeds | ✅ Available |
| **footer** | Site footer | ✅ Available |
| **form** | Contact/signup forms | ✅ Available |
| **fragment** | Reusable content sections | ✅ Available |
| **header** | Site navigation | ✅ Available |
| **hero** | Large page introductions | ✅ Available |
| **modal** | Popup/overlay content | ✅ Available |
| **quote** | Testimonials/pullquotes | ✅ Available |
| **search** | Search functionality | ✅ Available |
| **table** | Data tables | ✅ Available |
| **tabs** | Tabbed content panels | ✅ Available |
| **video** | Video embeds | ✅ Available |

**Total:** 17 blocks available

---

## FirstNet Component Analysis

Based on scraped pages, the following component patterns were identified:

### 1. Hero/Marquee Sections
**FirstNet Pattern:**
- Full-width background image
- Large heading + subheading
- 1-2 CTA buttons
- Breadcrumb navigation

**EDS Block Mapping:**
- **Primary:** `hero` block
- **Alternative:** `article-hero` (for news/blog pages)
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Hero |
|------|
| Heading text |
| Subheading/description |
| CTA button text | CTA URL |
| Background image |
```

---

### 2. Feature Highlights / Icon Grids
**FirstNet Pattern:**
- 3-4 items in a row
- Icon + heading + description
- Optional "Learn More" links
- Used extensively across feature pages

**EDS Block Mapping:**
- **Primary:** `cards` block (with icon variant)
- **Alternative:** `columns` block (for simpler layouts)
- **Confidence:** ✅ High

**Content Model:**
```
| Cards |
|-------|
| Icon image | Heading | Description | Link |
| Icon image | Heading | Description | Link |
| Icon image | Heading | Description | Link |
```

---

### 3. Product/Offer Cards
**FirstNet Pattern:**
- Grid layout (2-4 columns)
- Product image
- Product name
- Price/description
- CTA button
- Used for devices, plans, offers

**EDS Block Mapping:**
- **Primary:** `cards` block
- **Confidence:** ✅ High (perfect match)

**Content Model:**
```
| Cards (Product) |
|-----------------|
| Product image | Product name | Price | Description | CTA text | CTA URL |
| Product image | Product name | Price | Description | CTA text | CTA URL |
```

---

### 4. Specifications / Comparison Tables
**FirstNet Pattern:**
- Technical specifications
- Plan comparison tables
- Feature matrices
- Multi-column data

**EDS Block Mapping:**
- **Primary:** `table` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Table |
|-------|
| Spec Name | Value |
| Spec Name | Value |
```

---

### 5. FAQ / Expandable Sections
**FirstNet Pattern:**
- Question/Answer format
- Expandable/collapsible
- Common in help pages
- Also used for feature details

**EDS Block Mapping:**
- **Primary:** `accordion` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Accordion |
|-----------|
| Question 1 |
| Answer 1 |
| Question 2 |
| Answer 2 |
```

---

### 6. Testimonials / Customer Quotes
**FirstNet Pattern:**
- Quote text
- Attribution (name, title, organization)
- Optional photo
- Agency logo

**EDS Block Mapping:**
- **Primary:** `quote` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Quote |
|-------|
| "Quote text here..." |
| - Name, Title, Organization |
| Photo image |
```

---

### 7. Image Carousels / Sliders
**FirstNet Pattern:**
- Rotating product images
- Device galleries
- Solution screenshots
- Navigation dots/arrows

**EDS Block Mapping:**
- **Primary:** `carousel` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Carousel |
|----------|
| Image 1 | Caption 1 |
| Image 2 | Caption 2 |
| Image 3 | Caption 3 |
```

---

### 8. Tabbed Content
**FirstNet Pattern:**
- Content organized in tabs
- Plan comparisons
- Feature categories
- Less common but present

**EDS Block Mapping:**
- **Primary:** `tabs` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Tabs |
|------|
| Tab 1 Title |
| Tab 1 Content... |
| Tab 2 Title |
| Tab 2 Content... |
```

---

### 9. Video Content
**FirstNet Pattern:**
- Product demos
- Testimonial videos
- Training content
- YouTube embeds

**EDS Block Mapping:**
- **Primary:** `video` block
- **Alternative:** `embed` block (for other platforms)
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Video |
|-------|
| https://www.youtube.com/watch?v=VIDEO_ID |
```

---

### 10. Forms
**FirstNet Pattern:**
- Contact forms
- Sign-up forms
- Quote requests
- Newsletter subscription

**EDS Block Mapping:**
- **Primary:** `form` block
- **Confidence:** ⚠️ Medium (may need field customization)

**Content Model:**
```
| Form |
|------|
| Form ID or configuration |
```

**Note:** Form endpoints and validation logic will need to be configured.

---

### 11. Call-to-Action Blocks
**FirstNet Pattern:**
- Prominent heading
- Supporting text
- Primary button(s)
- Background color/image
- Appears between sections

**EDS Block Mapping:**
- **Primary:** `hero` block (simplified variant)
- **Alternative:** `columns` block (with styling)
- **Confidence:** ✅ High

**Content Model:**
```
| Hero (CTA) |
|------------|
| Heading |
| Description |
| Button text | Button URL |
```

---

### 12. Side-by-Side Content
**FirstNet Pattern:**
- Image + text layouts
- Feature explanations
- Benefit descriptions
- 50/50 or 60/40 splits

**EDS Block Mapping:**
- **Primary:** `columns` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Columns |
|---------|
| ![Image](image.jpg) | Text content here... |
```

---

### 13. Reusable Content Sections
**FirstNet Pattern:**
- Common disclaimers
- Repeated CTAs
- Shared content blocks
- Footer content

**EDS Block Mapping:**
- **Primary:** `fragment` block
- **Confidence:** ✅ High (direct match)

**Content Model:**
```
| Fragment |
|----------|
| /fragments/disclaimer |
```

---

### 14. News/Blog Articles
**FirstNet Pattern:**
- Article header with image
- Date and author
- Article body
- Related articles

**EDS Block Mapping:**
- **Primary:** `article-hero` block (header)
- **Secondary:** Default content (body)
- **Tertiary:** `cards` block (related articles)
- **Confidence:** ✅ High

---

### 15. Modal/Popup Content
**FirstNet Pattern:**
- Overlay content
- Terms and conditions
- Image lightboxes
- Promotional popups

**EDS Block Mapping:**
- **Primary:** `modal` block
- **Confidence:** ⚠️ Medium (implementation dependent)

---

## Component Frequency & Priority

Based on site analysis, here's the estimated usage and migration priority:

| Component Type | Est. Usage | Block Mapping | Priority | Effort |
|----------------|------------|---------------|----------|--------|
| Hero sections | 400+ | `hero` | **Critical** | Low |
| Product/Offer cards | 300+ | `cards` | **Critical** | Low |
| CTA blocks | 350+ | `hero` (variant) | **Critical** | Low |
| Feature highlights | 200+ | `cards` | **High** | Low |
| Specifications tables | 150+ | `table` | **High** | Low |
| FAQ/Accordions | 100+ | `accordion` | **High** | Low |
| Side-by-side content | 180+ | `columns` | **High** | Low |
| Testimonials | 80+ | `quote` | **Medium** | Low |
| Carousels | 60+ | `carousel` | **Medium** | Low |
| Videos | 50+ | `video` | **Medium** | Low |
| Forms | 40+ | `form` | **Medium** | Medium |
| Tabs | 30+ | `tabs` | **Low** | Low |
| Fragments | 20+ | `fragment` | **Low** | Low |
| Modals | 15+ | `modal` | **Low** | Medium |

---

## Block Coverage Analysis

### ✅ Fully Covered (90%+ confidence)
- Hero sections → `hero` block
- Product cards → `cards` block
- Feature highlights → `cards` block
- Specifications → `table` block
- FAQs → `accordion` block
- Testimonials → `quote` block
- Carousels → `carousel` block
- Videos → `video` block
- Side-by-side → `columns` block
- Tabs → `tabs` block
- Fragments → `fragment` block

### ⚠️ Partially Covered (needs configuration)
- Forms → `form` block (needs field mapping)
- Modals → `modal` block (needs trigger logic)
- CTA blocks → `hero` block (needs variant styling)

### ❌ Gaps Identified
**None** - All FirstNet components can be mapped to existing blocks!

---

## Special Considerations

### 1. Navigation (Header/Footer)
**Approach:** Use `header` and `footer` blocks
- FirstNet has complex mega-menu navigation
- May need customization of header block
- Footer has multiple columns and links

**Recommendation:** Configure once, reuse across all pages

### 2. Search Functionality
**Approach:** Use `search` block
- FirstNet uses Cludo search
- May need to integrate with new search provider
- Search block may need customization

**Recommendation:** Evaluate search provider options early

### 3. Forms & Integrations
**Approach:** Use `form` block with backend configuration
- Contact forms
- Sign-up forms
- Lead capture

**Recommendation:** Map form endpoints and test submissions

### 4. Analytics & Tracking
**Approach:** Configure in EDS project settings
- FirstNet uses Google Analytics, GTM, Adobe Analytics
- Conversion tracking pixels
- Social media pixels

**Recommendation:** Migrate tracking codes to EDS head.html

### 5. Image Optimization
**Approach:** EDS automatic image optimization
- FirstNet has 2,000+ images
- Many are SVG icons (already optimized)
- Product photos need WebP conversion

**Recommendation:** Let EDS handle optimization automatically

---

## Block Variant Requirements

Some FirstNet patterns may need block variants (CSS styling only, no new blocks):

### Hero Block Variants
1. **Full-width hero** (default)
2. **CTA hero** (centered, smaller, for mid-page CTAs)
3. **Article hero** (with date/author)

### Cards Block Variants
1. **Product cards** (with price, CTA button)
2. **Icon cards** (with SVG icons, no images)
3. **News cards** (with date, category tags)
4. **Offer cards** (with promotional badges)

### Columns Block Variants
1. **50/50 split** (default)
2. **60/40 split** (image emphasis)
3. **40/60 split** (text emphasis)
4. **Three columns** (feature comparison)

**Implementation:** Use block variant classes (e.g., `cards-product`, `hero-cta`)

---

## Migration Strategy by Page Template

### Template 1: Homepage
**Blocks needed:**
- `hero` (main hero)
- `cards` (offers, features)
- `columns` (feature explanations)
- `quote` (testimonials)
- `carousel` (optional)

**Estimated effort:** 4-6 hours

---

### Template 2: Feature/Marketing Pages
**Blocks needed:**
- `hero` (page intro)
- `columns` (feature details)
- `cards` (feature highlights)
- `quote` (customer testimonials)
- `accordion` (FAQs)
- `hero` (CTA sections)

**Estimated effort:** 2-3 hours per page

---

### Template 3: Product Detail Pages (Devices)
**Blocks needed:**
- `hero` (product hero)
- `table` (specifications)
- `cards` (features)
- `carousel` (product images)
- `cards` (related products)

**Estimated effort:** 1-2 hours per page

---

### Template 4: Plan/Pricing Pages
**Blocks needed:**
- `hero` (page intro)
- `table` (plan comparison)
- `cards` (plan features)
- `accordion` (FAQs)

**Estimated effort:** 2-3 hours per page

---

### Template 5: Help/Support Pages
**Blocks needed:**
- `article-hero` (page header)
- Default content (instructions)
- `accordion` (FAQs)
- `cards` (related articles)

**Estimated effort:** 1-2 hours per page

---

### Template 6: News/Blog Pages
**Blocks needed:**
- `article-hero` (article header)
- Default content (article body)
- `video` or `embed` (optional media)
- `cards` (related articles)

**Estimated effort:** 1 hour per page

---

## Block Usage Guidelines

### When to Use Default Content vs. Blocks

**Use Default Content for:**
- Paragraphs of text
- Simple headings
- Inline images
- Bulleted/numbered lists
- Simple links

**Use Blocks for:**
- Structured layouts (cards, columns)
- Interactive elements (accordion, tabs, carousel)
- Special formatting (hero, quote)
- Reusable content (fragment)
- Data tables
- Forms
- Videos

**Rule of Thumb:** If an author would create it naturally in Word/Google Docs, use default content. If it needs special structure or interactivity, use a block.

---

## Content Authoring Workflow

### Step 1: Identify Page Template
Determine which template the page follows (homepage, feature, product, etc.)

### Step 2: Map Sections to Blocks
For each section of the page:
1. Is it a hero? → `hero` block
2. Is it a grid of items? → `cards` block
3. Is it side-by-side content? → `columns` block
4. Is it expandable Q&A? → `accordion` block
5. Is it a data table? → `table` block
6. Is it a quote? → `quote` block
7. Is it rotating content? → `carousel` block
8. Is it a video? → `video` block
9. Is it tabbed content? → `tabs` block
10. Is it a form? → `form` block
11. Everything else → Default content

### Step 3: Extract Content
- Copy text content
- Download images
- Note styling (colors, backgrounds)
- Capture metadata (title, description)

### Step 4: Author in EDS Format
- Create sections with `---`
- Add block tables
- Insert images
- Add metadata block

### Step 5: Preview & Validate
- Check in local dev server
- Compare with original page
- Verify all content migrated
- Test interactions (accordions, carousels, etc.)

---

## Quality Assurance Checklist

For each migrated page:

### Content Completeness
- [ ] All text content migrated
- [ ] All images migrated
- [ ] All links functional
- [ ] All CTAs present
- [ ] Metadata complete (title, description)

### Block Implementation
- [ ] Correct blocks used
- [ ] Block content models followed
- [ ] Variants applied correctly
- [ ] Sections properly separated

### Visual Fidelity
- [ ] Layout matches original
- [ ] Spacing/padding appropriate
- [ ] Colors/styling preserved
- [ ] Images display correctly
- [ ] Responsive design works

### Functionality
- [ ] Links work
- [ ] Accordions expand/collapse
- [ ] Carousels rotate
- [ ] Videos play
- [ ] Forms submit (if applicable)
- [ ] Tabs switch

### SEO & Metadata
- [ ] Page title correct
- [ ] Meta description present
- [ ] Canonical URL set
- [ ] Open Graph tags
- [ ] Heading hierarchy (H1, H2, H3)

---

## Block Mapping Quick Reference

| FirstNet Component | EDS Block | Variant | Notes |
|--------------------|-----------|---------|-------|
| Page hero | `hero` | default | Large intro section |
| Mid-page CTA | `hero` | cta | Smaller, centered |
| Product grid | `cards` | product | With price, CTA |
| Feature highlights | `cards` | icon | With SVG icons |
| Offer cards | `cards` | offer | With badges |
| News grid | `cards` | news | With date |
| Side-by-side | `columns` | 2-col | Image + text |
| Feature comparison | `columns` | 3-col | Three columns |
| Specifications | `table` | default | Data table |
| Plan comparison | `table` | comparison | Multi-column |
| FAQ section | `accordion` | default | Q&A format |
| Testimonial | `quote` | default | With attribution |
| Product gallery | `carousel` | default | Rotating images |
| Video embed | `video` | default | YouTube/Vimeo |
| Tabbed content | `tabs` | default | Switchable panels |
| Contact form | `form` | contact | With fields |
| Reusable content | `fragment` | default | Shared sections |
| Popup content | `modal` | default | Overlay |

---

## Next Steps

1. **Validate Block Mapping** - Review with stakeholders
2. **Configure Block Variants** - Add CSS for product cards, CTA heroes, etc.
3. **Create Migration Scripts** - Automate bulk processing
4. **Pilot Migration** - Test with 10-20 representative pages
5. **Refine Process** - Adjust based on pilot learnings
6. **Full Migration** - Process all 400+ pages
7. **QA & Review** - Validate all migrated content
8. **Launch** - Deploy to production

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-12 | AI Migration Team | Initial block mapping strategy |

---

**Next Document:** Bulk Processing Scripts & Migration Automation
