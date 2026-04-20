export interface ProjectDemoEntry {
  overview: string;
  primaryUrl?: string;
  primaryLabel?: string;
}

export const projectDemoConfig: Record<string, ProjectDemoEntry> = {
  '50-Projects-in-50-Days---HTML-CSS-and-JavaScript': {
    overview:
      'Este repositorio contiene decenas de mini proyectos independientes. La card abre una galeria local para elegir una demo real del conjunto.',
    primaryUrl: '/project-demos/50-projects/index.html',
    primaryLabel: 'Abrir galeria',
  },
  'BYU-testing': {
    overview:
      'Este repositorio incluye una pagina HTML estatica que ya fue copiada al portafolio para abrirse como demo real.',
    primaryUrl: '/project-demos/BYU-testing/indexExample.html',
    primaryLabel: 'Abrir demo',
  },
  'Gestion-de-autos--PHP': {
    overview:
      'Este proyecto todavia no tiene una demo web conectada al portafolio. Cuando agreguemos un HTML real dentro de public/project-demos, el boton abrira esa vista directamente.',
  },
  'Gestion-de-contactos--django---bootstrap---sqlite-': {
    overview:
      'Este proyecto usa plantillas de Django. Tiene HTML en el repositorio, pero no se puede volver funcional solo copiando archivos estaticos sin levantar el backend.',
  },
  'WDD230': {
    overview:
      'La demo principal publicada para este repositorio es el proyecto final Scoots, servido localmente desde el portafolio.',
    primaryUrl: '/project-demos/WDD230/final/index.html',
    primaryLabel: 'Abrir Scoots',
  },
  'WDD330': {
    overview:
      'La card abre el proyecto final Weather App con sus archivos HTML, CSS y JS reales copiados desde GitHub.',
    primaryUrl: '/project-demos/WDD330/finalProject/index.html',
    primaryLabel: 'Abrir Weather App',
  },
};
