import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import type { Project } from '../../core/models/project';
import { LanguageService } from '../../core/services/language.service';
import { ArchitectureDiagram } from '../../shared/components/architecture-diagram/architecture-diagram';
import { Icon } from '../../shared/components/icon/icon';
import { ProjectActions } from '../../shared/components/project-actions/project-actions';
import { ProjectGallery } from '../../shared/components/project-gallery/project-gallery';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';

@Component({
  selector: 'app-project-details',
  imports: [RouterLink, Icon, ArchitectureDiagram, ProjectActions, ProjectGallery, SectionHeading],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  protected readonly lang = inject(LanguageService);
  protected readonly project = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['project'] as Project)),
    { requireSync: true },
  );
  protected readonly caseStudy = ['problem', 'solution', 'contributions'] as const;
  protected readonly engineeringNotes = ['testing', 'challenges', 'credits'] as const;
}
