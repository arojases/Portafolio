import { Component, Input } from '@angular/core';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { GitHubUser } from '../../core/models/github.models';
import { fadeInUp } from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [fadeInUp],
})
export class HeroComponent {
  @Input({ required: true }) user!: GitHubUser;

  protected readonly config = portfolioConfig;
}
