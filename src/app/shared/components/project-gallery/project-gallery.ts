import { Component, inject, input } from '@angular/core';
import type { ProjectImage } from '../../../core/models/project';
import { Icon } from '../icon/icon';
import { ProjectImageViewer } from '../project-image-viewer/project-image-viewer';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-project-gallery',
  imports: [Icon, ProjectImageViewer],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.scss',
})
export class ProjectGallery {
  readonly images = input.required<ProjectImage[]>();
  protected readonly lang = inject(LanguageService);
}
