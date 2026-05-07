export interface ProjectDemoEntry {
  overview: string;
  primaryUrl?: string;
  primaryLabel?: string;
  openInNewTab?: boolean;
}

export const projectDemoConfigByRepositoryId: Record<number, ProjectDemoEntry> = {
  1216241405: {
    overview:
      'Demo HTML inspirada en la experiencia real de Latido: acceso, vinculo compartido y mensajes afectivos en una interfaz interactiva.',
    primaryUrl: 'project-demos/Latido/index.html',
    primaryLabel: 'Abrir Latido',
  },
  1204394814: {
    overview:
      'Demo visual de Lovira para portafolio. Recrea el flujo principal de la app Android para parejas, con gestos afectivos, estado en tiempo real y notificaciones push sin requerir emulador externo.',
    primaryUrl: 'project-demos/Lovira/index.html',
    primaryLabel: 'Abrir Lovira',
    openInNewTab: false,
  },
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
      'Demo navegable de PHP Motors creada para portafolio. Recrea el inicio, categorias de vehiculos, detalle, cuenta de usuario y flujo de resenas sin requerir PHP ni base de datos.',
    primaryUrl: 'project-demos/Gestion-de-autos--PHP/index.html',
    primaryLabel: 'Abrir PHP Motors',
    openInNewTab: false,
  },
  1049454014: {
    overview:
      'Este proyecto Django se puede levantar en localhost con SQLite y abrirse como demo real desde la card.',
    primaryUrl: 'http://127.0.0.1:8101/',
    primaryLabel: 'Abrir demo Django',
  },
  607933813: {
    overview:
      'Demo navegable de Blog Project creada para portafolio. Muestra publicaciones, categorias, busqueda, lectura de articulos y una vista de administracion sin depender de GitHub Pages.',
    primaryUrl: 'project-demos/Blog-Project/index.html',
    primaryLabel: 'Abrir Blog',
    openInNewTab: false,
  },
  595949854: {
    overview:
      'Demo navegable para CSE341-Personal. Explica la API de usuarios y tickets, el flujo con Express, MongoDB, validaciones, autenticacion con Google y documentacion Swagger en una vista simple para evaluadores externos.',
    primaryUrl: 'project-demos/CSE341-Personal/index.html',
    primaryLabel: 'Abrir CSE341 demo',
  },
  586097855: {
    overview:
      'API REST de contactos construida con Node.js, Express y MongoDB. La demo estatica muestra endpoints, modelo de datos y acceso al Swagger vivo sin depender de que Render despierte primero.',
    primaryUrl: 'project-demos/Node.js-Swagger-MongoDB/index.html',
    primaryLabel: 'Abrir API demo',
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
  158885932: {
    overview:
      'OnTour es una aplicacion Java Swing de escritorio. La demo web recrea el panel administrativo, listado de usuarios y formulario principal para mostrar el flujo sin ejecutar Java ni Oracle.',
    primaryUrl: 'project-demos/appJava/ontour/index.html',
    primaryLabel: 'Abrir OnTour',
  },
};

export function getProjectDemoEntry(repositoryId: number): ProjectDemoEntry | undefined {
  return projectDemoConfigByRepositoryId[repositoryId];
}
