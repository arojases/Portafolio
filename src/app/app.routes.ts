import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'demo/:repo',
    loadComponent: () =>
      import('./pages/demo/demo-page.component').then((m) => m.DemoPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
