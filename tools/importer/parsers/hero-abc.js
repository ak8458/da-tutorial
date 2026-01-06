/* global WebImporter */

/**
 * Parser for hero-abc block
 *
 * Source: https://www.ab.bluecross.ca/index.php
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Heading and description content
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img') ||
                  element.querySelector('picture img') ||
                  element.querySelector('[class*="hero"] img');

  // Extract heading
  const heading = element.querySelector('h1') ||
                  element.querySelector('h2') ||
                  element.querySelector('[class*="title"]') ||
                  element.querySelector('[class*="heading"]');

  // Extract description/paragraph
  const description = element.querySelector('p') ||
                      element.querySelector('[class*="description"]') ||
                      element.querySelector('[class*="subtitle"]');

  // Build cells array
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    cells.push([bgImage.cloneNode(true)]);
  }

  // Row 2: Content (heading and description)
  const contentCell = [];
  if (heading) contentCell.push(heading.cloneNode(true));
  if (description) contentCell.push(description.cloneNode(true));

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-ABC', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
