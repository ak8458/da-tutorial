// ai-content-curator-ui.js
// eslint-disable-next-line import/no-unresolved
import { LitElement, html, css } from 'https://da.live/deps/lit/lit-all.min.js';

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const PREFERRED_ENDPOINT_KEYS = [
  'aiContentEndpoint',
  'aiCuratorEndpoint',
  'aiAssistantEndpoint',
  'aiPluginEndpoint',
];

const sanitizeHtmlSnippet = (snippet) => {
  if (!snippet || typeof snippet !== 'string') return '';
  const template = document.createElement('template');
  template.innerHTML = snippet;
  template.content.querySelectorAll('script, style').forEach((node) => node.remove());
  template.content.querySelectorAll('[onload],[onclick],[onerror],[onfocus],[onmouseover]')
    .forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if (/^on/i.test(attr.name)) node.removeAttribute(attr.name);
      });
    });
  return template.innerHTML.trim();
};

const escapeHtml = (value) => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

class AiContentCurator extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      font-family: "adobe-clean", "Adobe Clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #2c2c2c;
      display: block;
      padding: 24px;
      background: #f5f5f7;
      min-height: 100vh;
    }

    .card {
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(15, 15, 36, 0.08);
      padding: 32px;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .ai-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 10px 20px rgba(79, 70, 229, 0.25);
    }

    .ai-icon svg {
      width: 24px;
      height: 24px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-weight: 600;
      font-size: 0.95rem;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #d0d0d7;
      font-size: 1rem;
      line-height: 1.5;
      font-family: inherit;
      color: inherit;
      background-color: #fafafe;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    textarea:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    input[type="url"] {
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #d0d0d7;
      font-size: 0.95rem;
      font-family: inherit;
      background-color: #fafafe;
    }

    .inline {
      display: flex;
      gap: 12px;
      align-items: center;
      font-weight: 500;
    }

    .inline input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #4f46e5;
    }

    button {
      cursor: pointer;
      border: none;
      border-radius: 12px;
      padding: 12px 20px;
      font-size: 0.95rem;
      font-weight: 600;
      font-family: inherit;
      background: #4f46e5;
      color: #fff;
      transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    button:hover:not([disabled]) {
      background: #4338ca;
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.25);
    }

    button:disabled {
      cursor: not-allowed;
      background: #a5a5b4;
      box-shadow: none;
    }

    .secondary {
      background: #eef1ff;
      color: #4338ca;
      border: 1px solid rgba(79, 70, 229, 0.25);
    }

    .secondary:hover:not([disabled]) {
      background: #dde2ff;
    }

    .status {
      font-size: 0.9rem;
      color: #4338ca;
    }

    .error {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #b91c1c;
      padding: 12px 16px;
      border-radius: 12px;
      font-weight: 500;
      margin-top: 8px;
    }

    .result {
      margin-top: 24px;
      padding: 24px;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(124, 58, 237, 0.1));
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .sections {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-card {
      background: #fff;
      border-radius: 14px;
      padding: 20px;
      border: 1px solid rgba(79, 70, 229, 0.08);
      box-shadow: 0 4px 20px rgba(79, 70, 229, 0.08);
    }

    .section-card h2 {
      margin: 0 0 12px 0;
      font-size: 1.1rem;
      color: #1e1b4b;
    }

    .section-card p {
      margin: 0 0 12px 0;
      font-size: 0.98rem;
      line-height: 1.5;
      color: #2c2c37;
    }

    .section-card ul {
      margin: 0;
      padding-left: 20px;
      color: #363653;
    }

    .cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .raw-json {
      background: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 12px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.85rem;
      overflow: auto;
      max-height: 240px;
    }

    .helper-text {
      font-size: 0.85rem;
      color: #6b7280;
    }

    @media (max-width: 640px) {
      :host {
        padding: 16px;
      }

      .card {
        padding: 24px 20px;
      }

      .header h1 {
        font-size: 1.25rem;
      }

      textarea {
        min-height: 150px;
      }
    }
  `;

  static properties = {
    context: { type: Object },
    token: { type: String },
    actions: { type: Object },
    prompt: { type: String },
    apiEndpoint: { type: String },
    includeContext: { type: Boolean },
    useAuthHeader: { type: Boolean },
    status: { type: String },
    errorMessage: { type: String },
    response: { type: Object },
    sections: { type: Array },
    generatedHtml: { type: String },
    previewMode: { type: String },
  };

  constructor() {
    super();
    this.context = {};
    this.token = '';
    this.actions = {};
    this.prompt = '';
    this.apiEndpoint = '';
    this.includeContext = true;
    this.useAuthHeader = true;
    this.status = STATUS.IDLE;
    this.errorMessage = '';
    this.response = null;
    this.sections = [];
    this.generatedHtml = '';
    this.previewMode = 'sections';
  }

  updated(changedProps) {
    if (changedProps.has('context')) {
      this.resolveEndpoint();
    }
    if (changedProps.has('generatedHtml') && this.previewMode === 'html') {
      const container = this.renderRoot?.querySelector('.preview-html');
      if (container) {
        container.innerHTML = this.generatedHtml || '<p class="helper-text">No HTML preview available.</p>';
      }
    }
  }

  resolveEndpoint() {
    const params = new URLSearchParams(window.location.search);
    const paramEndpoint = params.get('endpoint') || params.get('api');

    const contextEndpoint = this.lookupEndpointInContext(this.context);

    const resolved = paramEndpoint || contextEndpoint || this.apiEndpoint;

    if (resolved && resolved !== this.apiEndpoint) {
      this.apiEndpoint = resolved;
    }
  }

  lookupEndpointInContext(ctx) {
    if (!ctx || typeof ctx !== 'object') return '';

    const search = (node) => {
      if (!node || typeof node !== 'object') return '';
      for (const key of PREFERRED_ENDPOINT_KEYS) {
        if (node[key] && typeof node[key] === 'string') {
          return node[key];
        }
      }
      for (const value of Object.values(node)) {
        if (value && typeof value === 'object') {
          const found = search(value);
          if (found) return found;
        }
      }
      return '';
    };

    return search(ctx);
  }

  handlePromptInput(event) {
    this.prompt = event.target.value;
  }

  handleEndpointInput(event) {
    this.apiEndpoint = event.target.value.trim();
  }

  toggleIncludeContext(event) {
    this.includeContext = event.target.checked;
  }

  toggleUseAuth(event) {
    this.useAuthHeader = event.target.checked;
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.apiEndpoint) {
      this.errorMessage = 'Please provide an API endpoint URL.';
      this.status = STATUS.ERROR;
      return;
    }
    if (!this.prompt || !this.prompt.trim()) {
      this.errorMessage = 'Prompt cannot be empty.';
      this.status = STATUS.ERROR;
      return;
    }

    this.status = STATUS.LOADING;
    this.errorMessage = '';
    this.response = null;
    this.sections = [];
    this.generatedHtml = '';
    this.previewMode = 'sections';

    const payload = {
      prompt: this.prompt.trim(),
    };

    if (this.includeContext) {
      payload.context = this.buildContextPayload();
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (this.useAuthHeader && this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error (${response.status}): ${text || response.statusText}`);
      }

      const data = await response.json();
      this.response = data;
      this.sections = this.extractSections(data);
      this.generatedHtml = this.buildHtmlSnippet(data, this.sections);
      this.previewMode = this.generatedHtml && !this.sections.length ? 'html' : 'sections';
      this.status = STATUS.SUCCESS;
    } catch (error) {
      this.errorMessage = error.message || 'Unexpected error while calling the API.';
      this.status = STATUS.ERROR;
    }
  }

  buildContextPayload() {
    const { url, selection, metadata, path, locale } = this.context || {};
    const trimmedSelection = typeof selection === 'string' ? selection.slice(0, 4000) : '';
    return {
      url,
      path,
      locale,
      selection: trimmedSelection,
      metadata: (metadata && typeof metadata === 'object') ? metadata : undefined,
    };
  }

  extractSections(data) {
    if (!data || typeof data !== 'object') return [];

    if (Array.isArray(data.sections)) {
      return data.sections.map((section, index) => ({
        heading: section.heading || section.title || `Section ${index + 1}`,
        body: section.body || section.description || section.summary || '',
        bullets: this.normalizeBullets(section.bullets || section.points || section.list),
        cta: this.normalizeCta(section.cta || section.callToAction),
        image: section.image || section.visual || null,
      }));
    }

    const fallback = {
      heading: data.title || data.headline || data.heading || 'Generated Content',
      body: data.summary || data.description || data.body || '',
      bullets: this.normalizeBullets(data.bullets || data.points || data.list),
      cta: this.normalizeCta(data.cta || data.callToAction),
      image: data.image || null,
    };

    return [fallback];
  }

  normalizeBullets(bullets) {
    if (!bullets) return [];
    if (Array.isArray(bullets)) {
      return bullets
        .map((item) => (item && typeof item === 'object' ? item.text || item.title || '' : item))
        .filter((item) => item && String(item).trim().length > 0)
        .map((item) => String(item).trim());
    }
    if (typeof bullets === 'string') {
      return bullets.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    }
    return [];
  }

  normalizeCta(cta) {
    if (!cta || typeof cta !== 'object') return null;
    const label = cta.label || cta.title || cta.text;
    const url = cta.url || cta.href;
    if (!label || !url) return null;
    return {
      label: String(label),
      url: String(url),
    };
  }

  buildHtmlSnippet(data, sections) {
    if (data && typeof data === 'object' && data.html) {
      const sanitized = sanitizeHtmlSnippet(data.html);
      if (sanitized) return sanitized;
    }

    if (!sections || !sections.length) return '';

    const sectionHtml = sections.map((section) => {
      const parts = [];
      if (section.heading) {
        parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
      }
      if (section.body) {
        parts.push(`<p>${escapeHtml(section.body)}</p>`);
      }
      if (section.bullets?.length) {
        const list = section.bullets
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');
        parts.push(`<ul>${list}</ul>`);
      }
      if (section.cta?.label && section.cta?.url) {
        const href = encodeURI(section.cta.url);
        parts.push(`<p><a href="${href}" class="button">${escapeHtml(section.cta.label)}</a></p>`);
      }
      return `<section class="ai-curated-section">${parts.join('')}</section>`;
    }).join('');

    return `<div class="ai-curated">${sectionHtml}</div>`;
  }

  handleInsertClick() {
    if (!this.generatedHtml) {
      this.errorMessage = 'No generated HTML available to insert.';
      this.status = STATUS.ERROR;
      return;
    }
    if (!this.actions || typeof this.actions.sendHTML !== 'function') {
      this.errorMessage = 'DA sendHTML action is not available.';
      this.status = STATUS.ERROR;
      return;
    }

    this.actions.sendHTML(this.generatedHtml);
    this.actions.closeLibrary?.();
  }

  handleSendJsonClick() {
    if (!this.response) return;
    const jsonString = JSON.stringify(this.response, null, 2);
    const message = `AI Content JSON\n${jsonString}`;
    if (typeof this.actions?.sendText === 'function') {
      this.actions.sendText(message);
      this.actions.closeLibrary?.();
    }
  }

  renderSection(section, index) {
    return html`
      <div class="section-card" part="section-card" data-index="${index}">
        ${section.heading ? html`<h2>${section.heading}</h2>` : ''}
        ${section.body ? html`<p>${section.body}</p>` : ''}
        ${section.bullets?.length
          ? html`<ul>${section.bullets.map((item) => html`<li>${item}</li>`)}</ul>`
          : ''}
        ${section.cta
          ? html`<a class="cta" href="${section.cta.url}" target="_blank" rel="noopener noreferrer">
              ${section.cta.label}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a>`
          : ''}
      </div>
    `;
  }

  renderPreview() {
    if (this.previewMode === 'html') {
      return html`<div class="preview-html" part="preview-html"></div>`;
    }
    if (this.sections?.length) {
      return html`
        <div class="sections">
          ${this.sections.map((section, index) => this.renderSection(section, index))}
        </div>
      `;
    }
    return html`<p class="helper-text">No structured sections detected in the API response. Review the JSON below.</p>`;
  }

  renderStatus() {
    if (this.status === STATUS.LOADING) {
      return html`<p class="status">Calling AI service…</p>`;
    }
    if (this.status === STATUS.SUCCESS) {
      return html`<p class="status">Response ready. Review the preview and insert into the document.</p>`;
    }
    if (this.status === STATUS.ERROR && this.errorMessage) {
      return html`<div class="error" role="alert">${this.errorMessage}</div>`;
    }
    return null;
  }

  render() {
    return html`
      <div class="card">
        <header class="header">
          <div class="ai-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3l2.09 4.23L18 8l-3 3 0.7 4.29L12 13.5 8.3 15.29 9 12 6 8l3.91-0.77L12 3z" fill="currentColor" opacity="0.85"></path>
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4" opacity="0.35"></circle>
            </svg>
          </div>
          <div>
            <h1>AI Content Curator</h1>
            <p class="helper-text">Generate structured content snippets directly in DA using your AI service.</p>
          </div>
        </header>

        <form @submit=${(event) => this.handleSubmit(event)}>
          <label>
            Prompt
            <textarea
              .value=${this.prompt}
              @input=${(event) => this.handlePromptInput(event)}
              placeholder="Describe the content you want to generate..."
              required
            ></textarea>
          </label>

          <label>
            API Endpoint
            <input
              type="url"
              .value=${this.apiEndpoint}
              inputmode="url"
              placeholder="https://example.com/api/generate"
              @input=${(event) => this.handleEndpointInput(event)}
              required
            />
            <span class="helper-text">
              You can override this via the <code>?endpoint=</code> query parameter or by exposing
              <code>${PREFERRED_ENDPOINT_KEYS.join('</code>, <code>')}</code> in the DA context.
            </span>
          </label>

          <label class="inline">
            <input
              type="checkbox"
              .checked=${this.includeContext}
              @change=${(event) => this.toggleIncludeContext(event)}
            />
            Include current document context (url, selection, metadata)
          </label>

          <label class="inline">
            <input
              type="checkbox"
              .checked=${this.useAuthHeader}
              @change=${(event) => this.toggleUseAuth(event)}
              ?disabled=${!this.token}
            />
            Send DA bearer token with the request
          </label>

          <div class="actions">
            <button type="submit" ?disabled=${this.status === STATUS.LOADING}>
              ${this.status === STATUS.LOADING ? 'Generating…' : 'Generate Content'}
            </button>
            <button
              type="button"
              class="secondary"
              ?disabled=${this.status === STATUS.LOADING}
              @click=${() => {
                this.prompt = '';
                this.status = STATUS.IDLE;
                this.errorMessage = '';
                this.response = null;
                this.sections = [];
                this.generatedHtml = '';
                this.previewMode = 'sections';
              }}
            >
              Reset
            </button>
          </div>
        </form>

        ${this.renderStatus()}

        ${this.response
          ? html`
              <section class="result" aria-live="polite">
                <h2>Preview</h2>
                ${this.renderPreview()}

                <div class="actions">
                  <button type="button" @click=${() => this.handleInsertClick()}>
                    Insert curated HTML
                  </button>
                  <button
                    type="button"
                    class="secondary"
                    @click=${() => this.handleSendJsonClick()}
                  >
                    Send JSON to document
                  </button>
                </div>

                <details>
                  <summary>View raw JSON response</summary>
                  <pre class="raw-json">${JSON.stringify(this.response, null, 2)}</pre>
                </details>
              </section>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('ai-content-curator', AiContentCurator);
