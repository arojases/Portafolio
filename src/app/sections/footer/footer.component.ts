import { Component, Input } from '@angular/core';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { GitHubUser } from '../../core/models/github.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input({ required: true }) user!: GitHubUser;

  protected readonly config = portfolioConfig;
}
