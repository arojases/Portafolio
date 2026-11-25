import { Component, inject, input, output } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import type { Project, ProjectImage } from '../../../core/models/project';
import { ProjectActions } from '../project-actions/project-actions';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-project-card',
  imports: [ProjectActions, Icon],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly imageSelected = output<ProjectImage>();
  protected readonly lang = inject(LanguageService);
}
