import { Component, input } from '@angular/core';

const paths: Record<string, string> = {
  zoom: 'M16.5 16.5 21 21M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM8 11h6m-3-3v6',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8v-1c0-3 4-5 8-5s8 2 8 5v1',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4m-4 4v2',
  history: 'M4 12a8 8 0 1 1 2 5m-2-5V6m0 6h6m2-5v5l3 2',
  languages: 'M4 5h11M9 3v2m4 0c-1 5-4 8-9 10m2-7c1 3 3 5 6 7m2 6 4-10 4 10m-6.5-4h5',
  network: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-2-14-4 16',
  server: 'M4 4h16v7H4zM4 13h16v7H4zM8 7.5h.01M8 16.5h.01',
  database:
    'M4 6c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3Zm0 0v12c0 2 3.6 3 8 3s8-1 8-3V6M4 12c0 2 3.6 3 8 3s8-1 8-3',
  check: 'M9 5H5v16h14V5h-4M9 3h6v4H9zM8 14l3 3 5-6',
  tool: 'M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4z',
  linkedin: 'M4 9v11M4 4v.01M9 20V9m0 4a4 4 0 0 1 8 0v7',
  email: 'M3 5h18v14H3zM3 6l9 7 9-7',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'm5 5 14 14M19 5 5 19',
  education: 'm2 9 10-5 10 5-10 5-10-5zm4 2v6c3 3 9 3 12 0v-6m4-2v7',
};

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  host: { 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input.required<string>();
  protected readonly paths = paths;
}
