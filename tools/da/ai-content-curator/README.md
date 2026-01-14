# AI Content Curator Plugin

This plugin provides a DA library experience that lets authors craft a generative AI prompt, send it to any JSON-producing endpoint, and curate the resulting content into the document. It follows the [DA App & Plugin development guide](https://docs.da.live/developers/guides/developing-apps-and-plugins#developing-apps--plugins) with a dedicated HTML entry point and a modular JS implementation.

## Features

- Prompt form with contextual metadata opt-in and bearer token forwarding for authenticated services.
- Flexible API endpoint resolution via site config (`aiContentEndpoint`, `aiCuratorEndpoint`, `aiAssistantEndpoint`, `aiPluginEndpoint`) or `?endpoint=` query override.
- Structured preview cards that adapt to common JSON shapes (`sections`, `bullets`, `cta`) and a sanitized HTML fallback.
- One-click insertion of curated HTML into the active DA document, plus a secondary option to inject the raw JSON payload.
- Built-in AI brand icon and elevated visual styling inspired by the `menu-picker` plugin experience.

## Files

- `ai-content-curator.html` – lightweight HTML scaffold loaded by DA.
- `ai-content-curator.js` – bootstraps the SDK and mounts the web component.
- `ai-content-curator-ui.js` – Lit-based component with UI, fetch logic, and DOM curation helpers.

## Usage

### 1. Serve locally

```bash
npm install
npm run start
```

Visit the plugin via DA with `ref=local`:

```
https://da.live/app/<ORG>/<SITE>/tools/ai-content-curator?ref=local
```

### 2. Configure your AI endpoint

Expose an endpoint URL in your site config JSON under any of the supported keys:

```json
{
  "aiContentEndpoint": "https://your-domain.example/api/generate"
}
```

Alternatively, add `?endpoint=https://your-domain.example/api/generate` to the plugin URL for ad hoc testing.

### 3. Implement the API

The plugin sends a `POST` request with:

```json
{
  "prompt": "Author provided text",
  "context": {
    "url": "...",
    "path": "...",
    "locale": "...",
    "selection": "current selection, truncated",
    "metadata": { "...": "..." }
  }
}
```

Include the DA bearer token if your service validates authenticated authors.

Respond with JSON using either a simple structure:

```json
{
  "title": "Headline",
  "summary": "Two sentence overview.",
  "bullets": ["Point one", "Point two"],
  "cta": { "label": "Shop Now", "url": "/products" }
}
```

Or a richer format:

```json
{
  "sections": [
    {
      "heading": "Hero",
      "body": "Lead paragraph…",
      "bullets": ["Key fact A", "Key fact B"],
      "cta": { "label": "Learn more", "url": "https://…" }
    }
  ]
}
```

The plugin automatically renders previews and generates sanitized HTML for insertion.

### 4. Insert curated content

After the response arrives:

- Use **Insert curated HTML** to send the generated snippet via `actions.sendHTML()` and close the library.
- Use **Send JSON to document** to embed the formatted JSON payload as plain text.

### 5. Customize the UI

The AI badge lives inside the web component (`render()` in `ai-content-curator-ui.js`). Replace the inline SVG or tweak the gradient to align with your brand palette. Additional component theming can be applied by overriding the supplied CSS parts (`section-card`, `preview-html`) or by swapping the Lit component with your preferred FE stack.

## Deployment

Commit the new tool files and promote through your usual branch workflow. Once available at `https://<branch>--<repo>.aem.live/tools/ai-content-curator/ai-content-curator.html`, register it in your site config’s apps sheet so authors can access it from DA.
