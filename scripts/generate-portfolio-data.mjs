import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const username = process.env.GITHUB_PORTFOLIO_USERNAME || 'arojases';
const token = process.env.GITHUB_TOKEN;
const apiUrl = 'https://api.github.com';

const headers = {
  'User-Agent': 'portfolio-sync-script',
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function fetchJson(url) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

function toLanguageUsage(languageMap) {
  const entries = Object.entries(languageMap);
  const totalBytes = entries.reduce((sum, [, value]) => sum + value, 0);

  if (!totalBytes) {
    return [];
  }

  return entries
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
    }))
    .sort((left, right) => right.bytes - left.bytes);
}

function mapRepository(repository, languageMap) {
  const languages = toLanguageUsage(languageMap).slice(0, 4);
  const demo = resolveDemo(repository);

  return {
    id: repository.id,
    name: repository.name,
    description:
      repository.description?.trim() ||
      'Repositorio publicado en GitHub sin descripcion adicional disponible.',
    htmlUrl: repository.html_url,
    homepage: repository.homepage,
    demoUrl: demo.url,
    demoLabel: demo.label,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    isFork: repository.fork,
    topics: repository.topics ?? [],
    languages,
    primaryLanguage: languages[0]?.name ?? 'Sin datos',
  };
}

function resolveDemo(repository) {
  const homepage = repository.homepage?.trim();

  if (homepage) {
    return {
      url: normalizeUrl(homepage),
      label: 'Ver demo',
    };
  }

  if (repository.fork) {
    return {
      url: null,
      label: 'Demo no disponible',
    };
  }

  const owner = repository.owner.login;
  const isUserPage = repository.name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  const demoUrl = isUserPage ? `https://${owner}.github.io/` : `https://${owner}.github.io/${repository.name}/`;

  return {
    url: demoUrl,
    label: 'Ver demo',
  };
}

function normalizeUrl(url) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

function aggregateLanguages(repositories) {
  const totals = repositories.reduce((accumulator, repository) => {
    for (const language of repository.languages) {
      accumulator[language.name] = (accumulator[language.name] ?? 0) + language.bytes;
    }

    return accumulator;
  }, {});

  return toLanguageUsage(totals).slice(0, 8);
}

async function main() {
  const user = await fetchJson(`${apiUrl}/users/${username}`);
  const repositories = await fetchJson(
    `${apiUrl}/users/${username}/repos?sort=created&direction=desc&per_page=100`,
  );

  const mappedRepositories = await Promise.all(
    repositories.map(async (repository) => {
      try {
        const languageMap = await fetchJson(`${apiUrl}/repos/${repository.owner.login}/${repository.name}/languages`);
        return mapRepository(repository, languageMap);
      } catch {
        return mapRepository(repository, {});
      }
    }),
  );

  const sortedRepositories = [...mappedRepositories].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  const languageSummary = aggregateLanguages(sortedRepositories);
  const totalStars = sortedRepositories.reduce((sum, repository) => sum + repository.stars, 0);
  const totalForks = sortedRepositories.reduce((sum, repository) => sum + repository.forks, 0);

  const payload = {
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      blog: user.blog,
      location: user.location,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
    },
    repositories: sortedRepositories,
    languageSummary,
    stats: {
      totalRepos: sortedRepositories.length,
      totalStars,
      totalForks,
      featuredLanguage: languageSummary[0]?.name ?? 'TypeScript',
    },
    source: 'live',
  };

  const outputDir = path.resolve('public', 'data');
  const outputPath = path.join(outputDir, 'portfolio-data.json');

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Generated ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
