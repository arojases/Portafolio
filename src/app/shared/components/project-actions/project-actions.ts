import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project } from '../../../core/models/project';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-project-actions',
  imports: [RouterLink],
  templateUrl: './project-actions.html',
})
export class ProjectActions {
  readonly project = input.required<Project>();
  readonly showDetails = input(false);
  protected readonly lang = inject(LanguageService);
}
