import { Component, Input } from '@angular/core';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { GitHubUser, PortfolioStats } from '../../core/models/github.models';
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
  @Input() source: 'live' | 'cache' = 'live';

  protected readonly config = portfolioConfig;
}
