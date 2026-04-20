export interface ProjectDemoEntry {
  overview: string;
  primaryUrl?: string;
  primaryLabel?: string;
}

export const projectDemoConfigByRepositoryId: Record<number, ProjectDemoEntry> = {
  898691876: {
    overview:
      'Este repositorio contiene decenas de mini proyectos independientes. La card abre una galeria local para elegir una demo real del conjunto.',
    primaryUrl: 'project-demos/50-projects/index.html',
    primaryLabel: 'Abrir galeria',
  },
  295965224: {
    overview:
      'Este repositorio incluye una pagina HTML estatica que ya fue copiada al portafolio para abrirse como demo real.',
    primaryUrl: 'project-demos/BYU-testing/indexExample.html',
    primaryLabel: 'Abrir demo',
  },
  574794761: {
    overview:
      'El proyecto necesita PHP para correr en localhost. Te deje el arranque preparado, pero en esta maquina todavia no existe php.exe, por eso la card sigue usando el fallback.',
  },
  1049454014: {
    overview:
      'Este proyecto Django se puede levantar en localhost con SQLite y abrirse como demo real desde la card.',
    primaryUrl: 'http://127.0.0.1:8101/',
    primaryLabel: 'Abrir demo Django',
  },
  296005232: {
    overview:
      'La demo principal publicada para este repositorio es el proyecto final Scoots, servido localmente desde el portafolio.',
    primaryUrl: 'project-demos/WDD230/final/index.html',
    primaryLabel: 'Abrir Scoots',
  },
  484629855: {
    overview:
      'La card abre el proyecto final Weather App con sus archivos HTML, CSS y JS reales copiados desde GitHub.',
    primaryUrl: 'project-demos/WDD330/finalProject/index.html',
    primaryLabel: 'Abrir Weather App',
  },
};

export function getProjectDemoEntry(repositoryId: number): ProjectDemoEntry | undefined {
  return projectDemoConfigByRepositoryId[repositoryId];
}
