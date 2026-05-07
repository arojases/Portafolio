import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { getProjectDemoEntry } from '../../core/config/project-demos.config';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { FooterComponent } from '../../sections/footer/footer.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';

const repositoryDescriptionsEn: Record<number, string> = {
  1216264769: 'Private web app for sending romantic messages in real time between two people.',
  1216241405:
    'Latido is a real-time Angular app for private messaging between two people, built with Firebase Authentication, Firestore, and Hosting.',
  1204394814:
    'Couples app that lets you send instant gestures of affection. With one tap, let your special person know you are thinking of them in real time.',
  1204350549:
    'Personal portfolio built with Angular, focused on showcasing projects, experience, and technologies in a visual and professional way.',
  1049454014:
    'Web application for contact management built with Django, Bootstrap, and SQLite, featuring a clean interface and basic record handling.',
  898691876:
    'Collection of practical projects built with HTML, CSS, and JavaScript to strengthen frontend skills through daily exercises.',
  607933813:
    'Web blog project focused on publishing and displaying content with a simple, functional structure.',
  595949854:
    'Personal project created for CSE341, focused on backend web development and good API-building practices.',
  586097855:
    'API built with Node.js, documented with Swagger, and integrated with MongoDB to manage structured data.',
  574794761:
    'Car management system developed in PHP to manage records, operations, and a basic inventory flow.',
  484629855:
    'Web Frontend Development II repository with exercises and course projects for WDD330, focused on JavaScript and interactive applications.',
  333825988:
    'Introductory presentation and practice project used for initial tests and basic development structure.',
  333512782:
    'Academic repository for the CS246 course with exercises and projects focused on programming and problem solving.',
  296005232:
    'WDD230 course repository with web development practices and projects using HTML, CSS, and JavaScript.',
  295965224:
    'Testing and academic exercises repository used to experiment with features and validate implementations.',
  158885932:
    'Java application focused on practicing project structure, logic, and desktop or console development.',
};

@Component({
  selector: 'app-demo-page',
  imports: [AsyncPipe, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent {
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly portfolioDataService = inject(PortfolioDataService);
  readonly i18n = inject(LanguageService);

  readonly vm$ = combineLatest([
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

      const demoEntry = getProjectDemoEntry(repository.id);

      return {
        status: 'ready' as const,
        repository,
        user: data.user,
        primaryUrl: this.resolveUrl(demoEntry?.primaryUrl ?? repository.demoUrl ?? undefined),
        primaryLabel: demoEntry?.primaryLabel,
        overview: demoEntry?.overview,
        overviewKey: repository.demoUrl ? 'demo.publishedOverview' : 'demo.unpublishedOverview',
      };
    }),
  );

  getPrimaryLabel(label?: string): string {
    if (!label || label === 'Abrir demo') {
      return this.i18n.t('demo.openDemo');
    }

    if (this.i18n.language() === 'en') {
      const labels: Record<string, string> = {
        'Abrir Latido': 'Open Latido',
        'Abrir galeria': 'Open gallery',
        'Abrir demo Django': 'Open Django demo',
        'Abrir Blog': 'Open Blog',
        'Abrir PHP Motors': 'Open PHP Motors',
        'Abrir CSE341 demo': 'Open CSE341 demo',
        'Abrir API demo': 'Open API demo',
        'Abrir Swagger': 'Open Swagger',
        'Abrir Scoots': 'Open Scoots',
        'Abrir Weather App': 'Open Weather App',
        'Abrir OnTour': 'Open OnTour',
      };

      return labels[label] ?? label;
    }

    return label;
  }

  getOverview(overview: string | undefined, overviewKey: string): string {
    if (overview && this.i18n.language() === 'es') {
      return overview;
    }

    return this.i18n.t(overviewKey);
  }

  getRepositoryDescription(repository: { id: number; description: string }): string {
    if (this.i18n.language() === 'en') {
      return repositoryDescriptionsEn[repository.id] ?? repository.description;
    }

    return repository.description;
  }

  private resolveUrl(path?: string | null): string | undefined {
    if (!path) {
      return undefined;
    }

    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    return new URL(path, this.document.baseURI).toString();
  }
}
