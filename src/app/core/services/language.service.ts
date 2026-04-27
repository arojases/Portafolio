import { Injectable, signal } from '@angular/core';

type Language = 'es' | 'en';

const translations: Record<Language, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.homeAria': 'Ir al inicio',
    'nav.menuAria': 'Abrir menu',
    'nav.languageAria': 'Cambiar idioma a ingles',
    'hero.role': 'Desarrollador Full Stack',
    'hero.headline': 'Portafolio conectado en tiempo real con GitHub.',
    'hero.summary':
      'Diseño y construyo experiencias web modernas, accesibles y mantenibles. Este portafolio se actualiza automaticamente con mis repositorios publicos para mostrar trabajo real y tecnologia utilizada.',
    'hero.avatarAlt': 'Avatar de Ariel Rojas',
    'hero.cardLabel': 'Resumen profesional',
    'hero.remoteWork': 'Trabajo remoto y proyectos web escalables.',
    'hero.followers': 'Seguidores',
    'hero.following': 'Siguiendo',
    'hero.repositories': 'Repositorios',
    'projects.eyebrow': 'Proyectos',
    'projects.title': 'Repositorios publicos renderizados automaticamente',
    'projects.description':
      'Cada tarjeta se construye con datos de la API de GitHub: descripcion, lenguajes, stars, forks y fecha de creacion.',
    'projects.sortNewest': 'Nuevos',
    'projects.languages': 'Lenguajes',
    'projects.all': 'Todas',
    'projects.demoNote':
      'Las demos son una referencia visual y funcional para hacerse una idea del proyecto. No siempre representan al 100% como se ve o se comporta al descargar y ejecutar el proyecto completo.',
    'projects.created': 'Creado',
    'projects.openDemo': 'Abrir demo',
    'projects.emptyTitle': 'No hay proyectos para este filtro',
    'projects.emptyText': 'Prueba con otra tecnologia o vuelve a la vista general.',
    'footer.eyebrow': 'Contacto',
    'footer.title': 'Construyamos una experiencia web clara, rapida y memorable.',
    'footer.message':
      'Disponible para colaborar en productos digitales, interfaces escalables y experiencias frontend de alto impacto.',
    'footer.emailAria': 'Enviar correo',
    'footer.phoneAria': 'Llamar por telefono',
    'footer.site': 'Sitio',
    'home.errorTitle': 'No pude cargar tu portafolio en este momento',
    'home.githubProfile': 'Ver perfil de GitHub',
    'home.retry': 'Reintentar',
    'home.loadingEyebrow': 'Cargando',
    'home.loadingTitle': 'Sincronizando proyectos y lenguajes desde GitHub',
    'home.loadingText':
      'Estoy consultando tu perfil, repositorios y metricas de lenguajes para armar el portafolio en tiempo real.',
    'demo.eyebrow': 'Demo del proyecto',
    'demo.backProjects': 'Volver a proyectos',
    'demo.unpublishedTitle': 'Demo aun no publicada',
    'demo.unpublishedText':
      'Este repositorio aparece en tu portafolio, pero todavia no tiene un HTML real o una URL de demo configurada para abrir directamente desde el boton.',
    'demo.missingTitle': 'Proyecto no encontrado',
    'demo.missingText': 'No pude encontrar una tarjeta asociada a',
    'demo.backHome': 'Volver al inicio',
    'demo.openDemo': 'Abrir demo',
    'demo.publishedOverview': 'Este proyecto tiene una demo principal publicada y puedes abrirla desde aqui.',
    'demo.unpublishedOverview': 'Este proyecto todavia no tiene una demo publica unica conectada al portafolio.',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.homeAria': 'Go to home',
    'nav.menuAria': 'Open menu',
    'nav.languageAria': 'Change language to Spanish',
    'hero.role': 'Full Stack Developer',
    'hero.headline': 'Portfolio connected to GitHub in real time.',
    'hero.summary':
      'I design and build modern, accessible, maintainable web experiences. This portfolio updates automatically with my public repositories to show real work and the technology behind it.',
    'hero.avatarAlt': 'Avatar of Ariel Rojas',
    'hero.cardLabel': 'Professional summary',
    'hero.remoteWork': 'Remote work and scalable web projects.',
    'hero.followers': 'Followers',
    'hero.following': 'Following',
    'hero.repositories': 'Repositories',
    'projects.eyebrow': 'Projects',
    'projects.title': 'Public repositories rendered automatically',
    'projects.description':
      'Each card is built with GitHub API data: description, languages, stars, forks, and creation date.',
    'projects.sortNewest': 'Newest',
    'projects.languages': 'Languages',
    'projects.all': 'All',
    'projects.demoNote':
      'The demos are a visual and functional reference to understand each project. They may not always match exactly how the complete project looks or behaves when downloaded and run.',
    'projects.created': 'Created',
    'projects.openDemo': 'Open demo',
    'projects.emptyTitle': 'No projects for this filter',
    'projects.emptyText': 'Try another technology or return to the full view.',
    'footer.eyebrow': 'Contact',
    'footer.title': 'Let us build a clear, fast, memorable web experience.',
    'footer.message':
      'Available to collaborate on digital products, scalable interfaces, and high-impact frontend experiences.',
    'footer.emailAria': 'Send email',
    'footer.phoneAria': 'Call phone',
    'footer.site': 'Website',
    'home.errorTitle': 'I could not load your portfolio right now',
    'home.githubProfile': 'View GitHub profile',
    'home.retry': 'Retry',
    'home.loadingEyebrow': 'Loading',
    'home.loadingTitle': 'Syncing projects and languages from GitHub',
    'home.loadingText':
      'I am fetching your profile, repositories, and language metrics to build the portfolio in real time.',
    'demo.eyebrow': 'Project demo',
    'demo.backProjects': 'Back to projects',
    'demo.unpublishedTitle': 'Demo not published yet',
    'demo.unpublishedText':
      'This repository appears in your portfolio, but it does not yet have a real HTML page or demo URL configured to open directly from the button.',
    'demo.missingTitle': 'Project not found',
    'demo.missingText': 'I could not find a card associated with',
    'demo.backHome': 'Back home',
    'demo.openDemo': 'Open demo',
    'demo.publishedOverview': 'This project has a main published demo and you can open it from here.',
    'demo.unpublishedOverview': 'This project does not yet have a single public demo connected to the portfolio.',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>(this.readLanguage());

  t(key: string): string {
    return translations[this.language()][key] ?? translations.es[key] ?? key;
  }

  toggleLanguage(): void {
    const nextLanguage: Language = this.language() === 'es' ? 'en' : 'es';

    this.language.set(nextLanguage);
    localStorage.setItem('portfolio-language', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  private readLanguage(): Language {
    const storedLanguage = localStorage.getItem('portfolio-language');

    if (storedLanguage === 'en' || storedLanguage === 'es') {
      document.documentElement.lang = storedLanguage;
      return storedLanguage;
    }

    document.documentElement.lang = 'es';
    return 'es';
  }
}
