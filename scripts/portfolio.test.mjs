import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { featuredProjects, projects } from '../src/app/core/data/projects.ts';
import { portfolio } from '../src/app/core/config/portfolio.config.ts';
import * as profile from '../src/app/core/data/profile.ts';
import { copy } from '../src/app/core/data/copy.ts';

test('visible projects are unique, ordered and safe to use in static URLs', () => {
  assert.ok(featuredProjects.length > 0);
  for (const field of ['id', 'slug', 'order']) {
    assert.equal(new Set(projects.map((project) => project[field])).size, projects.length);
  }
  assert.ok(
    featuredProjects.every(
      (project, i) => project.visible && (i === 0 || project.order > featuredProjects[i - 1].order),
    ),
  );
  for (const project of projects) assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('copy, profile and project content contain both languages', () => {
  function checkLocalizedValues(value) {
    if (!value || typeof value !== 'object') return;
    if ('en' in value || 'es' in value) {
      assert.ok(value.en?.trim(), 'English text is required');
      assert.ok(value.es?.trim(), 'Spanish text is required');
      return;
    }
    for (const child of Object.values(value)) checkLocalizedValues(child);
  }
  checkLocalizedValues(copy);
  checkLocalizedValues(projects);
  checkLocalizedValues(profile);
});

test('all configured images and documents are present in public', async () => {
  const files = [portfolio.photo?.src, ...Object.values(portfolio.cv)];
  for (const project of featuredProjects) {
    files.push(
      project.cardImage?.src,
      project.coverImage?.src,
      ...(project.screenshots ?? []).map((image) => image.src),
    );
  }
  files.push(...profile.skillGroups.flatMap((group) => group.items.map((item) => item.logo)));
  for (const file of files.filter(Boolean)) {
    assert.match(file, /^(images|documents|icons)\/[a-zA-Z0-9_./-]+$/);
    assert.ok(!file.split('/').includes('..'));
    assert.ok((await stat(new URL(`../public/${file}`, import.meta.url))).size > 0, file);
  }
});

test('project links use HTTPS', () => {
  for (const project of featuredProjects) {
    const urls = [
      project.githubUrl,
      project.demoUrl?.startsWith('demos/') ? undefined : project.demoUrl,
      project.downloadUrl,
      project.documentationUrl,
      ...(project.links ?? []).map((link) => link.url),
      ...(project.codeSamples ?? []).map((sample) => sample.url),
    ];
    for (const url of urls.filter(Boolean)) assert.equal(new URL(url).protocol, 'https:');
  }
});

test('English and Spanish CVs are separate PDF files', async () => {
  assert.deepEqual(portfolio.cv, {
    en: 'documents/CV_Ariel_Rojas_Software_EN.pdf',
    es: 'documents/CV_Ariel_Rojas_Software_ES.pdf',
  });
  for (const file of Object.values(portfolio.cv)) {
    const pdf = await readFile(new URL(`../public/${file}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  }
});

test('local project demo uses a static entry point and relative assets', async () => {
  for (const project of featuredProjects) {
    if (!project.demoUrl?.startsWith('demos/')) continue;
    assert.match(project.demoUrl, /^demos\/[a-z0-9-]+\/index\.html$/);
    const entry = new URL(`../public/${project.demoUrl}`, import.meta.url);
    const html = await readFile(entry, 'utf8');
    assert.match(html, /<base href="\.\/"/);
    const scripts = [...html.matchAll(/<script src="([^"]+)"/g)];
    assert.ok(scripts.length > 0);
    for (const [, script] of scripts) {
      assert.match(script, /^[a-zA-Z0-9.-]+\.js$/);
      await stat(new URL(script, entry));
    }
  }
});

if (process.env['CHECK_PAGES'] === '1') {
  test('Pages output includes all configured skill logos', async () => {
    const output = new URL('../dist/portfolio-app/', import.meta.url);
    for (const logo of new Set(
      profile.skillGroups.flatMap((group) => group.items.map((item) => item.logo)),
    )) {
      if (logo) {
        const svg = await readFile(new URL(logo, output), 'utf8');
        assert.match(svg, /^<svg\b/);
      }
    }
  });

  test('Pages output contains both localized CV downloads', async () => {
    const index = await readFile(
      new URL('../dist/portfolio-app/index.html', import.meta.url),
      'utf8',
    );
    assert.match(index, /<base href="\/Portafolio\/">/);
    for (const file of Object.values(portfolio.cv)) {
      const source = await readFile(new URL(`../public/${file}`, import.meta.url));
      const build = await readFile(new URL(`../dist/portfolio-app/${file}`, import.meta.url));
      assert.deepEqual(build, source);
    }
  });

  test('production emits direct route pages with a Pages base href and unique metadata', async () => {
    const output = new URL('../dist/portfolio-app/', import.meta.url);
    for (const project of featuredProjects) {
      const html = await readFile(new URL(`projects/${project.slug}/index.html`, output), 'utf8');
      assert.match(html, /<base href="\/Portafolio\/">/);
      assert.ok(html.includes(`<title>${project.title} | Ariel Rojas</title>`));
      if (project.coverImage) await stat(new URL(project.coverImage.src, output));
      if (project.cardImage) await stat(new URL(project.cardImage.src, output));
      if (project.demoUrl?.startsWith('demos/')) await stat(new URL(project.demoUrl, output));
    }
    const fallback = await readFile(new URL('404.html', output), 'utf8');
    assert.match(fallback, /content="noindex"/);
  });
}
