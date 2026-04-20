export interface ProjectDemoEntry {
  overview: string;
  primaryUrl?: string;
  primaryLabel?: string;
}

export const projectDemoConfig: Record<string, ProjectDemoEntry> = {
  'Gestion-de-autos---PHP': {
    overview:
      'Este proyecto todavia no tiene una demo web conectada al portafolio. Cuando agreguemos un HTML real dentro de public/project-demos, el boton abrira esa vista directamente.',
  },
};
