import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  computed,
  inject,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { portfolio } from '../../core/config/portfolio.config';
import { LanguageService } from '../../core/services/language.service';
import { Icon } from '../../shared/components/icon/icon';

export const navigationItems = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
] as const;
type Section = (typeof navigationItems)[number];

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Icon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class Navbar {
  protected readonly name = portfolio.name;
  protected readonly nav = navigationItems;
  protected readonly lang = inject(LanguageService);
  protected readonly open = signal(false);
  protected readonly current = signal<Section>('home');
  private readonly route = signal('/');
  protected readonly isHome = computed(() => this.route() === '/');
  protected readonly projectPage = computed(() => this.route().startsWith('/projects/'));
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private frame = 0;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.set(event.urlAfterRedirects.split(/[?#]/)[0]);
        this.open.set(false);
        this.updateSection();
      }
    });
    inject(DestroyRef).onDestroy(() => this.document.defaultView?.cancelAnimationFrame(this.frame));
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateSection(): void {
    const window = this.document.defaultView;
    if (!window || !this.isHome() || this.frame) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = 0;
      let active: Section = 'home';
      for (const section of this.nav) {
        const area = this.document.getElementById(section);
        if (area && area.getBoundingClientRect().top <= Math.max(126, window.innerHeight * 0.25)) {
          active = section;
        }
      }
      if (
        window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >=
          this.document.documentElement.scrollHeight - 1
      ) {
        active = 'contact';
      }
      this.current.set(active);
    });
  }

  @HostListener('document:keydown.escape')
  protected closeWithEscape(): void {
    if (this.open()) {
      this.open.set(false);
      this.menuButton()?.nativeElement.focus();
    }
  }
}
