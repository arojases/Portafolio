import { DOCUMENT } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appScrollReveal]' })
export class ScrollRevealDirective implements AfterViewInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (
      !this.window ||
      !('IntersectionObserver' in this.window) ||
      this.window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.element.classList.add('section-entered');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(this.element);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
