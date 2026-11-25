import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { portfolio } from '../../core/config/portfolio.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class Footer {
  protected readonly lang = inject(LanguageService);
  protected readonly person = portfolio;
  protected readonly year = new Date().getFullYear();
}
