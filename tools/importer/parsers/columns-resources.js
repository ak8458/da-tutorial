/* global WebImporter */

/**
 * Parser for columns-resources block
 *
 * Source: https://www.ab.bluecross.ca/index.php
 * Base Block: columns
 *
 * Block Structure:
 * - Single row with 2 columns: [content + link | image]
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  // Find column containers
  const columns = element.querySelectorAll('[class*="col"], [class*="column"], > div');

  const cells = [];
  const row = [];

  columns.forEach(col => {
    // Extract content from each column
    const heading = col.querySelector('h2, h3, h4') ||
                    col.querySelector('[class*="title"]');
    const description = col.querySelector('p') ||
                        col.querySelector('[class*="description"]');
    const link = col.querySelector('a[href]');
    const image = col.querySelector('img') ||
                  col.querySelector('picture img');

    const cellContent = [];

    // If column has image only, add image
    if (image && !heading && !description) {
      row.push(image.cloneNode(true));
    } else {
      // Add text content
      if (heading) cellContent.push(heading.cloneNode(true));
      if (description) cellContent.push(description.cloneNode(true));
      if (link) cellContent.push(link.cloneNode(true));
      if (image) cellContent.push(image.cloneNode(true));

      if (cellContent.length > 0) {
        row.push(cellContent);
      }
    }
  });

  // If we have columns, add as single row
  if (row.length > 0) {
    cells.push(row);
  }

  // Fallback: treat entire element as single column
  if (cells.length === 0) {
    const heading = element.querySelector('h2, h3, h4');
    const description = element.querySelector('p');
    const link = element.querySelector('a[href]');
    const image = element.querySelector('img');

    const content = [];
    if (heading) content.push(heading.cloneNode(true));
    if (description) content.push(description.cloneNode(true));
    if (link) content.push(link.cloneNode(true));

    if (content.length > 0 || image) {
      cells.push([content, image ? image.cloneNode(true) : '']);
    }
  }

  // Create block
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Resources', cells });

  element.replaceWith(block);
}
