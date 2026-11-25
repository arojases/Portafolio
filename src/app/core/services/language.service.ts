import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { copy, CopyKey } from '../data/copy';
import { Language, Localized } from '../models/project';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly selected = signal<Language>(this.initialLanguage());
  readonly language = this.selected.asReadonly();

  constructor() {
    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;
      try {
        this.document.defaultView?.localStorage.setItem('portfolio-locale', language);
      } catch {
        // Language selection still works without browser storage.
      }
    });
  }

  set(language: Language): void {
    this.selected.set(language);
  }

  t(key: CopyKey): string {
    return this.text(copy[key]);
  }

  text(value: Localized): string {
    return value[this.language()];
  }

  private initialLanguage(): Language {
    try {
      return this.document.defaultView?.localStorage.getItem('portfolio-locale') === 'es'
        ? 'es'
        : 'en';
    } catch {
      return 'en';
    }
  }
}
