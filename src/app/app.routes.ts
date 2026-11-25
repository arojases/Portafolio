import { Routes } from '@angular/router';
import { featuredProjects } from './core/data/projects';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((module) => module.HomePage),
  },
  ...featuredProjects.map((project) => ({
    path: `projects/${project.slug}`,
    data: { project },
    loadComponent: () =>
      import('./pages/project-details/project-details').then((module) => module.ProjectDetails),
  })),
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((module) => module.NotFound),
  },
];
