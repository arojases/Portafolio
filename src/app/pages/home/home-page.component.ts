import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolio } from '../../core/config/portfolio.config';
import { education, experience, independentExperience } from '../../core/data/profile';
import { featuredProjects } from '../../core/data/projects';
import { LanguageService } from '../../core/services/language.service';
import { TechnicalSkills } from '../../sections/technical-skills/technical-skills';
import { Hero } from '../../sections/hero/hero.component';
import { CvDownload } from '../../shared/components/cv-download/cv-download';
import { Icon } from '../../shared/components/icon/icon';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { ProjectImageViewer } from '../../shared/components/project-image-viewer/project-image-viewer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CvDownload,
    Hero,
    Icon,
    ProjectCard,
    ProjectImageViewer,
    ScrollRevealDirective,
    TechnicalSkills,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePage {
  protected readonly lang = inject(LanguageService);
  protected readonly person = portfolio;
  protected readonly aboutCards = [
    { icon: 'code', title: 'aboutDevelopment', detail: 'aboutDevelopmentDetail' },
    { icon: 'education', title: 'aboutEducation', detail: 'aboutEducationDetail' },
    { icon: 'network', title: 'aboutInfrastructure', detail: 'aboutInfrastructureDetail' },
    { icon: 'languages', title: 'languages', detail: 'aboutLanguagesDetail' },
  ] as const;
  protected readonly independent = independentExperience;
  protected readonly experience = experience.map((item) => ({
    ...item,
    project: featuredProjects.find((project) => project.slug === item.project),
  }));
  protected readonly education = education;
  protected readonly projects = featuredProjects;
}
