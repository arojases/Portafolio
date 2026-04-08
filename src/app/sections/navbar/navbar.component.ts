import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { portfolioConfig } from '../../core/config/portfolio.config';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  protected readonly items: NavItem[] = [
    { id: 'hero', label: 'Inicio' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' },
  ];

  protected readonly config = portfolioConfig;
  protected readonly activeSection = signal('hero');
  protected readonly menuOpen = signal(false);

  private observer?: IntersectionObserver;
  private readonly viewportScroller = inject(ViewportScroller);

  ngAfterViewInit(): void {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));

    if (!sections.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.7],
      },
    );

    sections.forEach((section) => this.observer?.observe(section));
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900) {
      this.menuOpen.set(false);
    }
  }

  protected scrollTo(id: string): void {
    this.menuOpen.set(false);
    this.activeSection.set(id);
    this.viewportScroller.scrollToAnchor(id);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((current) => !current);
  }
}
