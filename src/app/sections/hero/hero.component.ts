import { Component, Input, inject } from '@angular/core';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { GitHubUser, PortfolioStats } from '../../core/models/github.models';
import { LanguageService } from '../../core/services/language.service';
import { fadeInUp } from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [fadeInUp],
})
export class HeroComponent {
  @Input({ required: true }) user!: GitHubUser;
  @Input({ required: true }) stats!: PortfolioStats;

  readonly config = portfolioConfig;
  readonly i18n = inject(LanguageService);

  getDisplayName(): string {
    return this.user.name || this.user.login;
  }
}
