export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  blog: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubRepositoryApi {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  owner: {
    login: string;
  };
}

export interface LanguageUsage {
  name: string;
  bytes: number;
  percentage: number;
}

export interface ProjectCardData {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  updatedAt: string;
  pushedAt: string;
  stars: number;
  forks: number;
  isFork: boolean;
  topics: string[];
  languages: LanguageUsage[];
  primaryLanguage: string;
}

export interface PortfolioStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  featuredLanguage: string;
}

export interface PortfolioData {
  user: GitHubUser;
  repositories: ProjectCardData[];
  languageSummary: LanguageUsage[];
  stats: PortfolioStats;
  source: 'live' | 'cache';
  cachedAt?: string;
}
