import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { PortfolioData } from '../../core/models/github.models';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { FooterComponent } from '../../sections/footer/footer.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';

type HomeViewModel = {
  status: 'success' | 'loading' | 'error';
  data: PortfolioData | null;
  message: string;
};

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, FooterComponent, HeroComponent, NavbarComponent, ProjectsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly portfolioDataService = inject(PortfolioDataService);

  readonly i18n = inject(LanguageService);
  readonly config = portfolioConfig;

  readonly vm$ = this.portfolioDataService.getPortfolioData().pipe(
    map((data: PortfolioData): HomeViewModel => ({ status: 'success', data, message: '' })),
    startWith({ status: 'loading', data: null, message: '' } satisfies HomeViewModel),
    catchError((error: Error) =>
      of({
        status: 'error',
        data: null,
        message: error.message,
      } satisfies HomeViewModel),
    ),
  );
}
