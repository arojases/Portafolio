import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate('700ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'none' })),
  ]),
]);

export const staggerReveal = trigger('staggerReveal', [
  transition(':enter', [
    query(
      ':scope > *',
      [
        style({ opacity: 0, transform: 'translateY(18px)' }),
        stagger(
          80,
          animate(
            '600ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 1, transform: 'none' }),
          ),
        ),
      ],
      { optional: true },
    ),
  ]),
]);
