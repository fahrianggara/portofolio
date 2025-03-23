import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';

const md = new MarkdownIt({
  linkify: true, // Otomatis deteksi link tanpa markdown (contoh: www.google.com)
  breaks: true,  // Line break otomatis
});

// Tambahkan atribut `target="_blank"` dan `rel="noopener noreferrer"`
const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrPush(['target', '_blank']); // Buka link di tab baru
  tokens[idx].attrPush(['rel', 'noopener noreferrer']); // Keamanan tambahan
  return defaultRender(tokens, idx, options, env, self);
};

export function renderMarkdown(content) {
  return md.render(DOMPurify.sanitize(content));
}
