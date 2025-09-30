import { getMetadata, createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Creates a custom article hero block that reads data from page metadata
 * Only runs when the page theme is set to "article"
 * @param {Element} block The article-hero block element
 */
export default async function decorate(block) {
  // Get metadata from page head
  const title = getMetadata('title') || getMetadata('og:title') || 'Article Title';
  const description = getMetadata('description') || getMetadata('og:description') || '';
  const imageUrl = getMetadata('image') || getMetadata('og:image') || '';
  const author = getMetadata('author') || getMetadata('article:author') || '';
  const publishDate = getMetadata('article:published_time') || getMetadata('date') || '';
  const robots = getMetadata('robots') || '';

  // Clear existing content
  block.innerHTML = '';

  // Create hero container
  const heroContainer = document.createElement('div');
  heroContainer.className = 'article-hero-container';

  // Add background image if available
  if (imageUrl) {
    const picture = createOptimizedPicture(
      imageUrl,
      title,
      true, // eager loading for hero image
      [
        { media: '(min-width: 1200px)', width: '2000' },
        { media: '(min-width: 768px)', width: '1200' },
        { width: '800' }
      ]
    );
    picture.className = 'article-hero-background';
    heroContainer.appendChild(picture);
  }

  // Create hero content wrapper
  const heroContent = document.createElement('div');
  heroContent.className = 'article-hero-content';

  // Create article meta info
  const articleMeta = document.createElement('div');
  articleMeta.className = 'article-hero-meta';

  if (author) {
    const authorElement = document.createElement('span');
    authorElement.className = 'article-hero-author';
    authorElement.textContent = `By ${author}`;
    articleMeta.appendChild(authorElement);
  }

  if (publishDate) {
    const dateElement = document.createElement('time');
    dateElement.className = 'article-hero-date';
    dateElement.textContent = new Date(publishDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    dateElement.setAttribute('datetime', publishDate);
    articleMeta.appendChild(dateElement);
  }

  // Create title
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  titleElement.className = 'article-hero-title';

  // Create description if available
  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    descriptionElement.className = 'article-hero-description';
    heroContent.appendChild(descriptionElement);
  }

  // Add meta info to content
  if (articleMeta.children.length > 0) {
    heroContent.appendChild(articleMeta);
  }

  // Add title to content
  heroContent.appendChild(titleElement);

  // Add content to container
  heroContainer.appendChild(heroContent);

  // Add container to block
  block.appendChild(heroContainer);

  // Add additional metadata as data attributes for styling
  if (robots) {
    block.dataset.robots = robots;
  }

  // Add loading complete class for animations
  block.classList.add('article-hero-loaded');
}
