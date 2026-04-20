import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectCardData } from '../../core/models/github.models';
import { fadeInUp, staggerReveal } from '../../shared/animations/fade.animation';

type SortMode = 'created' | 'name';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeInUp, staggerReveal],
})
export class ProjectsComponent {
  @Input({ required: true }) set repositories(value: ProjectCardData[]) {
    this._repositories.set(value);
  }

  protected readonly selectedLanguage = signal('all');
  protected readonly sortMode = signal<SortMode>('created');

  private readonly _repositories = signal<ProjectCardData[]>([]);

  protected readonly technologies = computed(() => {
    const values = new Set<string>();

    this._repositories().forEach((repository) => {
      repository.languages.forEach((language) => values.add(language.name));
    });

    return ['all', ...Array.from(values).sort((left, right) => left.localeCompare(right))];
  });

  protected readonly filteredRepositories = computed(() => {
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

  protected selectLanguage(language: string): void {
    this.selectedLanguage.set(language);
  }

  protected setSortMode(mode: SortMode): void {
    this.sortMode.set(mode);
  }
}
