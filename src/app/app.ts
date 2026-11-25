import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { portfolio } from './core/config/portfolio.config';
import { LanguageService } from './core/services/language.service';
import type { Project } from './core/models/project';
import { Navbar } from './sections/navbar/navbar.component';
import { Footer } from './sections/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
})
export class App {
  protected readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly navigation = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  constructor() {
    inject(ViewportScroller).setOffset(() => [
      0,
      (this.document.querySelector('app-navbar header')?.getBoundingClientRect().height ?? 72) + 16,
    ]);
    effect(() => {
      const navigation = this.navigation();
      const project = this.router.routerState.snapshot.root.firstChild?.data['project'] as
        | Project
        | undefined;
      const missing =
        !project && !!navigation && navigation.urlAfterRedirects.split(/[?#]/)[0] !== '/';
      const title = project
        ? `${project.title} | ${portfolio.name}`
        : `${portfolio.name} | ${this.lang.t(missing ? 'missing' : 'role')}`;
      const description = project
        ? this.lang.text(project.description)
        : this.lang.t(missing ? 'missing' : 'intro');
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({
        property: 'og:locale',
        content: this.lang.language() === 'en' ? 'en_US' : 'es_CL',
      });
      const url = new URL(
        (navigation?.urlAfterRedirects ?? '/').split(/[?#]/)[0].replace(/^\//, ''),
        'https://arojases.github.io/Portafolio/',
      );
      this.meta.updateTag({ property: 'og:url', content: url.href });
      const preview = project?.coverImage ?? portfolio.photo;
      if (preview) {
        this.meta.updateTag({
          property: 'og:image',
          content: new URL(preview.src, 'https://arojases.github.io/Portafolio/').href,
        });
        this.meta.updateTag({ property: 'og:image:alt', content: this.lang.text(preview.alt) });
      }
    });
  }

  protected skip(event: MouseEvent): void {
    event.preventDefault();
    const main = this.document.getElementById('main-content');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView();
  }
}
