import { Component, inject } from '@angular/core';
import { skillGroups } from '../../core/data/profile';
import { LanguageService } from '../../core/services/language.service';
import { Icon } from '../../shared/components/icon/icon';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-technical-skills',
  imports: [Icon, ScrollRevealDirective],
  templateUrl: './technical-skills.html',
  styleUrl: './technical-skills.scss',
})
export class TechnicalSkills {
  protected readonly lang = inject(LanguageService);
  protected readonly groups = skillGroups;
}
