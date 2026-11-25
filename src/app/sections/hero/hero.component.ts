import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolio } from '../../core/config/portfolio.config';
import { LanguageService } from '../../core/services/language.service';
import { CvDownload } from '../../shared/components/cv-download/cv-download';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, CvDownload, Icon],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class Hero {
  protected readonly person = portfolio;
  protected readonly lang = inject(LanguageService);
}
