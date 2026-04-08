import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, from, map, mergeMap, of, shareReplay, throwError, toArray } from 'rxjs';

import { portfolioConfig } from '../config/portfolio.config';
import { GitHubRepositoryApi, GitHubUser, LanguageUsage, PortfolioData, ProjectCardData } from '../models/github.models';

interface PortfolioCache {
  data: PortfolioData;
  cachedAt: string;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com';
  private readonly cacheKey = 'portfolio-github-cache-v2';
  private readonly cacheMaxAgeMs = 1000 * 60 * 30;
  private readonly username = portfolioConfig.githubUsername;

  private readonly user$ = this.http
    .get<GitHubUser>(`${this.apiUrl}/users/${this.username}`)
    .pipe(shareReplay(1));

  private readonly repositories$ = this.http
    .get<GitHubRepositoryApi[]>(`${this.apiUrl}/users/${this.username}/repos`, {
      params: new HttpParams().set('sort', 'updated').set('direction', 'desc').set('per_page', '100'),
    })
    .pipe(shareReplay(1));

  private readonly portfolio$ = forkJoin({
    user: this.getUserData(),
    repositories: this.getRepositories(),
  }).pipe(
    mergeMap(({ user, repositories }) =>
      from(repositories).pipe(
        mergeMap(
          (repository) =>
            this.getLanguages(repository.name, repository.owner.login).pipe(
              map((languageMap) => this.mapRepository(repository, languageMap)),
              catchError(() => of(this.mapRepository(repository, {}))),
            ),
          5,
        ),
        toArray(),
        map((projectCards) => this.buildPortfolioData(user, projectCards)),
      ),
    ),
    map((data) => ({ ...data, source: 'live' as const })),
    map((data) => this.storeCache(data)),
    catchError((error: unknown) => {
      const fallback = this.readCache();

      if (fallback) {
        return of({
          ...fallback.data,
          source: 'cache' as const,
          cachedAt: fallback.cachedAt,
        });
      }

      const message =
        error instanceof Error
          ? error.message
          : 'No fue posible obtener datos desde GitHub. Intenta nuevamente en unos minutos.';

      return throwError(() => new Error(message));
    }),
    shareReplay(1),
  );

  getPortfolioData(): Observable<PortfolioData> {
    return this.portfolio$;
  }

  getUserData(): Observable<GitHubUser> {
    return this.user$;
  }

  getRepositories(): Observable<GitHubRepositoryApi[]> {
    return this.repositories$;
  }

  getLanguages(repository: string, owner = this.username): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/repos/${owner}/${repository}/languages`);
  }

  private mapRepository(repository: GitHubRepositoryApi, languageMap: Record<string, number>): ProjectCardData {
    const languages = this.toLanguageUsage(languageMap).slice(0, 4);

    return {
      id: repository.id,
      name: repository.name,
      description:
        repository.description?.trim() ||
        'Repositorio publicado en GitHub sin descripcion adicional disponible.',
      htmlUrl: repository.html_url,
      homepage: repository.homepage,
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

  private buildPortfolioData(user: GitHubUser, repositories: ProjectCardData[]): PortfolioData {
    const languageSummary = this.aggregateLanguages(repositories);
    const totalStars = repositories.reduce((sum, repository) => sum + repository.stars, 0);
    const totalForks = repositories.reduce((sum, repository) => sum + repository.forks, 0);

    return {
      user,
      repositories: [...repositories].sort(
        (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
      ),
      languageSummary,
      stats: {
        totalRepos: repositories.length,
        totalStars,
        totalForks,
        featuredLanguage: languageSummary[0]?.name ?? 'TypeScript',
      },
      source: 'live',
    };
  }

  private aggregateLanguages(repositories: ProjectCardData[]): LanguageUsage[] {
    const totals = repositories.reduce<Record<string, number>>((accumulator, repository) => {
      repository.languages.forEach((language) => {
        accumulator[language.name] = (accumulator[language.name] ?? 0) + language.bytes;
      });

      return accumulator;
    }, {});

    return this.toLanguageUsage(totals).slice(0, 8);
  }

  private toLanguageUsage(languageMap: Record<string, number>): LanguageUsage[] {
    const totalBytes = Object.values(languageMap).reduce((sum, value) => sum + value, 0);

    if (!totalBytes) {
      return [];
    }

    return Object.entries(languageMap)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      }))
      .sort((left, right) => right.bytes - left.bytes);
  }

  private storeCache(data: PortfolioData): PortfolioData {
    const payload: PortfolioCache = {
      data,
      cachedAt: new Date().toISOString(),
    };

    localStorage.setItem(this.cacheKey, JSON.stringify(payload));

    return data;
  }

  private readCache(): PortfolioCache | null {
    const raw = localStorage.getItem(this.cacheKey);

    if (!raw) {
      return null;
    }

    try {
      const payload = JSON.parse(raw) as PortfolioCache;
      const cachedAtTime = new Date(payload.cachedAt).getTime();

      if (!Number.isFinite(cachedAtTime) || Date.now() - cachedAtTime > this.cacheMaxAgeMs) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return payload;
    } catch {
      localStorage.removeItem(this.cacheKey);
      return null;
    }
  }
}
