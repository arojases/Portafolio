import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { GitHubUser, LanguageUsage, PortfolioStats } from '../../core/models/github.models';
import { fadeInUp, staggerReveal } from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-about',
  imports: [CommonModule, DatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeInUp, staggerReveal],
})
export class AboutComponent {
  @Input({ required: true }) user!: GitHubUser;
  @Input({ required: true }) languageSummary: LanguageUsage[] = [];
  @Input({ required: true }) stats!: PortfolioStats;
  @Input() source: 'live' | 'cache' = 'live';
  @Input() cachedAt?: string;
}
