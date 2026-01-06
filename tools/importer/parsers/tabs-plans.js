/* global WebImporter */

/**
 * Parser for tabs-plans block
 *
 * Source: https://www.ab.bluecross.ca/index.php
 * Base Block: tabs
 *
 * Block Structure:
 * - Each row: [tab label | tab content]
 *
 * Generated: 2026-01-06
 */
export default function parse(element, { document }) {
  // Find tab buttons/labels
  const tabButtons = element.querySelectorAll('[role="tab"], .tab-button, [class*="tab-label"], button[data-tab]');

  // Find tab panels/content
  const tabPanels = element.querySelectorAll('[role="tabpanel"], .tab-panel, .tab-content, [class*="tab-pane"]');

  const cells = [];

  // Match tabs with their panels
  tabButtons.forEach((button, index) => {
    const label = button.textContent.trim();
    const panel = tabPanels[index];

    if (panel) {
      // Extract panel content
      const heading = panel.querySelector('h2, h3, h4');
      const paragraphs = panel.querySelectorAll('p');
      const links = panel.querySelectorAll('a[href]');

      const contentCell = [];
      if (heading) contentCell.push(heading.cloneNode(true));
      paragraphs.forEach(p => contentCell.push(p.cloneNode(true)));
      links.forEach(link => contentCell.push(link.cloneNode(true)));

      cells.push([label, contentCell]);
    } else {
      cells.push([label, '']);
    }
  });

  // Fallback: if no structured tabs found, look for alternative patterns
  if (cells.length === 0) {
    const sections = element.querySelectorAll('section, [class*="tab-section"]');
    sections.forEach(section => {
      const label = section.querySelector('h3, h4, [class*="label"]');
      const content = section.querySelector('[class*="content"], p');

      if (label) {
        cells.push([label.textContent.trim(), content ? content.cloneNode(true) : '']);
      }
    });
  }

  // Create block
  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Plans', cells });

  element.replaceWith(block);
}
