import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { portfolio } from '../src/app/core/config/portfolio.config.ts';
import { featuredProjects } from '../src/app/core/data/projects.ts';

const output = 'dist/portfolio-app';
const site = 'https://arojases.github.io/Portafolio/';
const indexPath = join(output, 'index.html');
const fonts = (await readdir(join(output, 'media'))).filter((file) =>
  /^poppins-\d+-[\w-]+\.woff2$/.test(file),
);
const fontPreloads = fonts.map(
  (file) => `<link rel="preload" as="font" type="font/woff2" href="media/${file}" crossorigin>`,
);
const index = (await readFile(indexPath, 'utf8')).replace(
  '</head>',
  `${fontPreloads.join('')}</head>`,
);

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function setMeta(html, attribute, key, value) {
  const tag = new RegExp(`<meta ${attribute}="${key}" content="[^"]*">`);
  if (!tag.test(html)) throw new Error(`Missing metadata tag: ${key}`);
  return html.replace(tag, () => `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`);
}

const heroPreload = portfolio.photo
  ? `<link rel="preload" as="image" href="${escapeHtml(portfolio.photo.src)}" fetchpriority="high">`
  : '';
await writeFile(indexPath, index.replace('</head>', `${heroPreload}</head>`));

for (const project of featuredProjects) {
  const route = `projects/${project.slug}/`;
  const title = `${project.title} | Ariel Rojas`;
  let html = index.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
  html = setMeta(html, 'name', 'description', project.description.en);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', project.description.en);
  html = setMeta(html, 'property', 'og:url', new URL(route, site).href);
  if (project.coverImage) {
    html = setMeta(html, 'property', 'og:image', new URL(project.coverImage.src, site).href);
    html = setMeta(html, 'property', 'og:image:alt', project.coverImage.alt.en);
  }
  const directory = join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}

const notFound = index.replace(
  /<title>[^<]*<\/title>/,
  '<title>Page not found | Ariel Rojas</title><meta name="robots" content="noindex">',
);
await writeFile(join(output, '404.html'), notFound);
console.log(`Wrote ${featuredProjects.length} project entry points and 404.html.`);
