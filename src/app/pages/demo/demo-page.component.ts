import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { projectDemoConfig } from '../../core/config/project-demos.config';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { FooterComponent } from '../../sections/footer/footer.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';

@Component({
  selector: 'app-demo-page',
  imports: [AsyncPipe, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly portfolioDataService = inject(PortfolioDataService);

  protected readonly vm$ = combineLatest([
    this.route.paramMap,
    this.portfolioDataService.getPortfolioData(),
  ]).pipe(
    map(([params, data]) => {
      const repositoryName = params.get('repo') ?? '';
      const repository = data.repositories.find((item) => item.name === repositoryName);

      if (!repository) {
        return {
          status: 'missing' as const,
          repositoryName,
          user: data.user,
        };
      }

      const demoEntry = projectDemoConfig[repository.name];
      const variants = demoEntry?.variants ?? [];
      const hasMultipleDemos = variants.length > 1 || (!!demoEntry && !repository.demoUrl);

      return {
        status: 'ready' as const,
        repository,
        user: data.user,
        overview:
          demoEntry?.overview ??
          (repository.demoUrl
            ? 'Este proyecto tiene una demo principal publicada y puedes abrirla desde aqui.'
            : 'Este proyecto todavia no tiene una demo publica unica conectada al portafolio.'),
        variants,
        hasMultipleDemos,
      };
    }),
  );
}
