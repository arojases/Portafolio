import { Component, inject } from '@angular/core';
import { portfolio } from '../../../core/config/portfolio.config';
import { LanguageService } from '../../../core/services/language.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-cv-download',
  imports: [Icon],
  templateUrl: './cv-download.html',
})
export class CvDownload {
  protected readonly lang = inject(LanguageService);
  protected readonly cv = portfolio.cv;
}
