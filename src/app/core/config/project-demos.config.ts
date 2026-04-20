export interface DemoVariant {
  label: string;
  description: string;
  url?: string;
}

export interface ProjectDemoEntry {
  overview: string;
  variants?: DemoVariant[];
}

export const projectDemoConfig: Record<string, ProjectDemoEntry> = {
  'Gestion-de-autos---PHP': {
    overview:
      'Este proyecto no tiene una sola demo principal. Reune varias pantallas y flujos HTML/PHP, por eso necesita una pagina intermedia antes de abrir una vista concreta.',
    variants: [],
  },
};
