/*
 * AI Content Curator Plugin
 * Collects a user prompt, calls an external AI API, and helps authors
 * curate DOM content inside the DA document based on the JSON response.
 */

// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';
import './ai-content-curator-ui.js';

(async function init() {
  const { context, token, actions } = await DA_SDK;
  const curator = document.createElement('ai-content-curator');
  curator.context = context;
  curator.token = token;
  curator.actions = actions;
  document.body.appendChild(curator);
}());
