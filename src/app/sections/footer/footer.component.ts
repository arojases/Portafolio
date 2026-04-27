import { Component, Input, inject } from '@angular/core';

import { portfolioConfig } from '../../core/config/portfolio.config';
import { GitHubUser } from '../../core/models/github.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input({ required: true }) user!: GitHubUser;

  readonly config = portfolioConfig;
  readonly i18n = inject(LanguageService);
}
