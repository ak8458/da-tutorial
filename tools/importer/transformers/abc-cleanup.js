/* global WebImporter */

/**
 * Transformer for Alberta Blue Cross website cleanup
 * Purpose: Remove non-content elements and fix HTML issues
 * Applies to: www.ab.bluecross.ca (all templates)
 * Generated: 2026-01-06
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header and navigation (handled separately)
    WebImporter.DOMUtils.remove(element, [
      'header',
      'nav',
      '.header',
      '.navigation',
      '#header'
    ]);

    // Remove footer (handled separately)
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer',
      '#footer'
    ]);

    // Remove cookie consent and privacy banners
    WebImporter.DOMUtils.remove(element, [
      '[class*="cookie"]',
      '[class*="consent"]',
      '[id*="cookie"]',
      '.privacy-banner'
    ]);

    // Remove chat widgets and support tools
    WebImporter.DOMUtils.remove(element, [
      '[class*="chat"]',
      '[id*="chat"]',
      '.live-chat',
      '#support-widget'
    ]);

    // Remove skip links and accessibility helpers
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.skip-to-content',
      '[class*="skip"]'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining script and style elements
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'link[rel="stylesheet"]',
      'noscript'
    ]);

    // Remove tracking pixels and iframes
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'img[src*="analytics"]',
      'img[src*="pixel"]',
      'img[src*="tracking"]'
    ]);

    // Clean up data attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('onclick');
      el.removeAttribute('onload');
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
    });
  }
}
