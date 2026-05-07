import { DOCUMENT } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, Input, computed, inject, signal } from '@angular/core';

import { getProjectDemoEntry } from '../../core/config/project-demos.config';
import { ProjectCardData } from '../../core/models/github.models';
import { LanguageService } from '../../core/services/language.service';
import { fadeInUp, staggerReveal } from '../../shared/animations/fade.animation';

type SortMode = 'created' | 'name';

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
  selector: 'app-projects',
  imports: [DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeInUp, staggerReveal],
})
export class ProjectsComponent {
  private readonly document = inject(DOCUMENT);
  readonly i18n = inject(LanguageService);

  @Input({ required: true }) set repositories(value: ProjectCardData[]) {
    this._repositories.set(value);
  }

  readonly selectedLanguage = signal('all');
  readonly sortMode = signal<SortMode>('created');
  readonly filtersOpen = signal(false);

  private readonly _repositories = signal<ProjectCardData[]>([]);

  readonly technologies = computed(() => {
    const values = new Set<string>();

    this._repositories().forEach((repository) => {
      repository.languages.forEach((language) => values.add(language.name));
    });

    return ['all', ...Array.from(values).sort((left, right) => left.localeCompare(right))];
  });

  readonly filteredRepositories = computed(() => {
    const selectedLanguage = this.selectedLanguage();
    const sortMode = this.sortMode();

    return [...this._repositories()]
      .filter((repository) =>
        selectedLanguage === 'all'
          ? true
          : repository.languages.some((language) => language.name === selectedLanguage),
      )
      .sort((left, right) => {
        if (sortMode === 'name') {
          return left.name.localeCompare(right.name);
        }

        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      });
  });

  getDemoHref(repository: ProjectCardData): string {
    const demoEntry = getProjectDemoEntry(repository.id);

    if (demoEntry?.primaryUrl) {
      return this.resolveUrl(demoEntry.primaryUrl);
    }

    if (repository.demoUrl) {
      return repository.demoUrl;
    }

    return this.resolveUrl(`demo/${encodeURIComponent(repository.name)}`);
  }

  shouldOpenDemoInNewTab(repository: ProjectCardData): boolean {
    const demoEntry = getProjectDemoEntry(repository.id);

    if (demoEntry?.openInNewTab !== undefined) {
      return demoEntry.openInNewTab;
    }

    return this.getDemoHref(repository).includes('/project-demos/') || !!repository.demoUrl;
  }

  getRepositoryDescription(repository: ProjectCardData): string {
    if (this.i18n.language() === 'en') {
      return repositoryDescriptionsEn[repository.id] ?? repository.description;
    }

    return repository.description;
  }

  private resolveUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    return new URL(path, this.document.baseURI).toString();
  }

  selectLanguage(language: string): void {
    this.selectedLanguage.set(language);
    this.filtersOpen.set(false);
  }

  setSortMode(mode: SortMode): void {
    this.sortMode.set(mode);
  }

  toggleFilters(): void {
    this.filtersOpen.update((isOpen) => !isOpen);
  }
}
