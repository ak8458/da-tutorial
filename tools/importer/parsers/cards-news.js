/* global WebImporter */

/**
 * Parser for cards-news block
 *
 * Source: https://www.ab.bluecross.ca/index.php
 * Base Block: cards
 *
 * Block Structure:
 * - Each row: [image | heading + description + link]
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  // Find all card items
  const cardItems = element.querySelectorAll('[class*="card"], [class*="news-item"], article, .item');

  const cells = [];

  cardItems.forEach(card => {
    // Extract image
    const image = card.querySelector('img') ||
                  card.querySelector('picture img');

    // Extract heading
    const heading = card.querySelector('h2, h3, h4') ||
                    card.querySelector('[class*="title"]') ||
                    card.querySelector('[class*="heading"]');

    // Extract description
    const description = card.querySelector('p') ||
                        card.querySelector('[class*="description"]') ||
                        card.querySelector('[class*="excerpt"]');

    // Extract link
    const link = card.querySelector('a[href]');

    // Build row: [image | content]
    const imageCell = image ? image.cloneNode(true) : '';
    const contentCell = [];

    if (heading) contentCell.push(heading.cloneNode(true));
    if (description) contentCell.push(description.cloneNode(true));
    if (link) contentCell.push(link.cloneNode(true));

    if (imageCell || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  // If no card items found, try to extract single card pattern
  if (cells.length === 0) {
    const image = element.querySelector('img');
    const heading = element.querySelector('h2, h3, h4');
    const description = element.querySelector('p');
    const link = element.querySelector('a[href]');

    const contentCell = [];
    if (heading) contentCell.push(heading.cloneNode(true));
    if (description) contentCell.push(description.cloneNode(true));
    if (link) contentCell.push(link.cloneNode(true));

    if (image || contentCell.length > 0) {
      cells.push([image ? image.cloneNode(true) : '', contentCell]);
    }
  }

  // Create block
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-News', cells });

  element.replaceWith(block);
}
