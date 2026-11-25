import { Component, inject, input } from '@angular/core';
import type { ArchitectureStage } from '../../../core/models/project';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-architecture-diagram',
  templateUrl: './architecture-diagram.html',
  styleUrl: './architecture-diagram.scss',
})
export class ArchitectureDiagram {
  readonly systems = input(false);
  readonly showFlow = input(false);
  readonly stages = input.required<ArchitectureStage[]>();
  protected readonly lang = inject(LanguageService);
}
