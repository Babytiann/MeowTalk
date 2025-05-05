// utils/md.ts
import MarkdownIt from 'markdown-it';

export const md = new MarkdownIt({
    html: false, // 避免 XSS
    linkify: true,
    typographer: true,
});
