import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import type { ProjectImage } from '../../../core/models/project';
import { LanguageService } from '../../../core/services/language.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-project-image-viewer',
  imports: [Icon],
  templateUrl: './project-image-viewer.html',
  styleUrl: './project-image-viewer.scss',
})
export class ProjectImageViewer {
  protected readonly lang = inject(LanguageService);
  protected readonly image = signal<ProjectImage | null>(null);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(image: ProjectImage): void {
    this.image.set(image);
    this.dialog().nativeElement.showModal();
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;
    if (event.target === dialog) dialog.close();
  }
}
