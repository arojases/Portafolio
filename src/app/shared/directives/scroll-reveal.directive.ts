import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Input, PLATFORM_ID, inject, signal } from '@angular/core';

export type ScrollRevealDirection = 'up' | 'left' | 'right' | 'zoom';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: {
    class: 'scroll-reveal',
    '[class.is-revealed]': 'isRevealed()',
    '[attr.data-reveal-direction]': 'appScrollReveal',
    '[style.--reveal-delay]': 'delayValue',
  },
})
export class ScrollRevealDirective implements AfterViewInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  @Input() appScrollReveal: ScrollRevealDirection = 'up';
  @Input() revealDelay = 0;

  readonly isRevealed = signal(false);

  get delayValue(): string {
    return `${this.revealDelay}ms`;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      this.isRevealed.set(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => this.isRevealed.set(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '-4% 0px -12% 0px' },
    );

    observer.observe(this.element.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
