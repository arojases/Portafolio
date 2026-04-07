import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio-theme';
  readonly theme = signal<ThemeMode>('dark');

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    const savedTheme = this.readSavedTheme();
    const preferred = savedTheme ?? this.getPreferredTheme();
    this.setTheme(preferred);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
    localStorage.setItem(this.storageKey, theme);
  }

  private readSavedTheme(): ThemeMode | null {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return null;
  }

  private getPreferredTheme(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
