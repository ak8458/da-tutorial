# Custom Article Hero Component

This custom article hero component automatically reads data from page metadata and displays it as a beautiful hero section, but **only when the page theme is set to "article"**.

## Features

- ✅ **Theme-Based Activation**: Only appears when page theme is set to "article"
- ✅ **Automatic Metadata Reading**: Reads title, description, image, author, and date from page meta tags
- ✅ **Article-Specific Design**: Optimized styling for article pages
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Background Images**: Supports optimized images with WebP format and fallbacks
- ✅ **Smooth Animations**: Fade-in animations for better user experience
- ✅ **Author & Date Display**: Shows article author and publish date
- ✅ **Fallback Content**: Graceful degradation when metadata is missing
- ✅ **SEO Friendly**: Uses proper semantic HTML structure

## How It Works

The article-hero component automatically:

1. **Checks page theme** - only activates when `theme=article`
2. **Reads page metadata** from the HTML `<head>` section
3. **Creates an article hero section** with title, description, author, date, and background image
4. **Applies article-specific styling** and animations
5. **Falls back gracefully** when metadata is missing

## Required Metadata

Add these meta tags to your HTML `<head>` section:

```html
<head>
    <!-- REQUIRED: Theme must be set to "article" -->
    <meta name="theme" content="article">
    
    <!-- Basic meta tags -->
    <meta name="title" content="Your Article Title">
    <meta name="description" content="Your article description">
    <meta name="image" content="https://example.com/your-hero-image.jpg">
    <meta name="author" content="Author Name">
    <meta name="robots" content="index, follow">
    
    <!-- Article-specific meta tags -->
    <meta property="article:author" content="Author Name">
    <meta property="article:published_time" content="2024-01-15T10:00:00Z">
    <meta property="article:section" content="Technology">
    
    <!-- Open Graph meta tags (optional, used as fallback) -->
    <meta property="og:title" content="Your Article Title">
    <meta property="og:description" content="Your article description">
    <meta property="og:image" content="https://example.com/your-hero-image.jpg">
    <meta property="og:type" content="article">
</head>
```

## Metadata Priority

The component reads metadata in this order:

1. **Title**: `meta name="title"` → `meta property="og:title"` → "Article Title" (fallback)
2. **Description**: `meta name="description"` → `meta property="og:description"` → "" (empty if not found)
3. **Image**: `meta name="image"` → `meta property="og:image"` → "" (no image if not found)
4. **Author**: `meta name="author"` → `meta property="article:author"` → "" (empty if not found)
5. **Publish Date**: `meta property="article:published_time"` → `meta name="date"` → "" (empty if not found)

## Usage

The article-hero component is automatically generated when:
1. The page theme is set to "article" (`<meta name="theme" content="article">`)
2. The page loads

No additional HTML is needed in your page content - just ensure you have the proper metadata in your `<head>` section.

## Regular Pages vs Article Pages

- **Regular Pages**: Use the standard hero block (requires h1 + picture elements in HTML)
- **Article Pages**: Use the article-hero block (metadata-driven, theme-activated)

## Customization

### CSS Classes

The component uses these CSS classes for styling:

- `.article-hero-container` - Main hero container
- `.article-hero-content` - Content wrapper
- `.article-hero-meta` - Author and date container
- `.article-hero-author` - Author element
- `.article-hero-date` - Publish date element
- `.article-hero-title` - Title element
- `.article-hero-description` - Description element
- `.article-hero-background` - Background image container

### Styling

You can customize the appearance by modifying `/blocks/article-hero/article-hero.css`:

```css
.article-hero-container {
  min-height: 500px; /* Adjust hero height */
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); /* Fallback gradient */
}

.article-hero-title {
  font-size: 3.5rem; /* Adjust title size */
  color: white; /* Adjust title color */
}

.article-hero-description {
  font-size: 1.4rem; /* Adjust description size */
  opacity: 0.95; /* Adjust description opacity */
}
```

## Demo

- **Article Hero**: See `demo-article-hero.html` for a working example with article theme
- **Regular Hero**: See `demo-regular-hero.html` for comparison with standard hero

## Technical Details

- **File Location**: `/blocks/article-hero/article-hero.js`
- **CSS Location**: `/blocks/article-hero/article-hero.css`
- **Model Location**: `/ue/models/blocks/article-hero.json`
- **Dependencies**: Uses `getMetadata()` and `createOptimizedPicture()` from `/scripts/aem.js`
- **Auto-loading**: Automatically loads when page theme is "article"

## Browser Support

- Modern browsers with ES6+ support
- Responsive design works on mobile, tablet, and desktop
- Graceful degradation for older browsers
