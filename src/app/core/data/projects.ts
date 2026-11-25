import type { ArchitectureStage, Localized, Project, ProjectImage } from '../models/project';

const text = (en: string, es: string): Localized => ({ en, es });
const stage = (title: Localized, detail: Localized): ArchitectureStage => ({ title, detail });
const image = (
  folder: string,
  filename: string,
  alt: Localized,
  position?: string,
): ProjectImage => ({
  src: `images/projects/${folder}/${filename}`,
  alt,
  position,
});
const github = 'https://github.com/arojases';
const incidentSource = `${github}/Gestion-de-Incidentes`;
const ashveilSource = `${github}/AshveilRelics-Showcase`;
const ashveilGallery = [
  ['Menu.jpg', 'Main menu', 'Menú principal'],
  ['Village.jpg', 'Village', 'Aldea'],
  ['Village_Update.jpg', 'Village dialogue in v1.1', 'Diálogos de la aldea en v1.1'],
  ['Dungeon_Entrance.jpg', 'Underground entrance', 'Entrada subterránea'],
  ['Dungeon_1.jpg', 'Skeleton encounter', 'Encuentro con esqueletos'],
  ['Dungeon_2.jpg', 'Orc ambush', 'Emboscada de orcos'],
  ['Boss_Fight.jpg', 'Final boss encounter', 'Combate contra el jefe final'],
  ['End_game.jpg', 'Story ending', 'Final de la historia'],
];

export const projects: Project[] = [
  {
    id: 'cashboard-family',
    slug: 'cashboard-family',
    cardTechnologies: ['C#', 'ASP.NET Core', 'Angular', 'Entity Framework Core', 'PostgreSQL'],
    order: 1,
    visible: true,
    title: 'CashBoard Family',
    category: text('Full Stack Development', 'Desarrollo full stack'),
    status: text('Local MVP', 'MVP local'),
    description: text(
      'A family finance dashboard for tracking income, spending, budgets, savings goals and debt.',
      'Panel de finanzas familiares para administrar ingresos, gastos, presupuestos, metas de ahorro y deudas.',
    ),
    overview: text(
      'A personal full stack project for managing household finances in CLP, with a responsive dashboard and access controls for family accounts.',
      'Proyecto personal full stack de finanzas familiares en CLP, con panel adaptable y control de acceso para cuentas familiares.',
    ),
    problem: text(
      'Households need a single place to track spending and understand its impact on budgets, savings and debt.',
      'Las familias necesitan un lugar para registrar gastos y entender su efecto sobre presupuestos, ahorro y deudas.',
    ),
    solution: text(
      'An Angular client consumes a REST API that scopes records to the family and checks user roles before changes.',
      'Un cliente Angular consume una API REST que acota los registros a cada familia y verifica el rol antes de aplicar cambios.',
    ),
    contributions: text(
      'Built the dashboard and finance workflows, integrated JWT authentication between client and API, and configured persistence for local and containerized development.',
      'Desarrollé el panel y los flujos financieros, integré autenticación JWT entre cliente y API y configuré la persistencia en local y en contenedores.',
    ),
    features: [
      text(
        'Financial dashboard and transaction filters',
        'Panel financiero y filtros de movimientos',
      ),
      text(
        'Budgets, savings goals and debt tracking',
        'Presupuestos, metas de ahorro y seguimiento de deudas',
      ),
      text('Admin and read-only Family roles', 'Roles Admin y Family de solo lectura'),
      text(
        'User administration and family plan settings',
        'Administración de usuarios y configuración del plan familiar',
      ),
    ],
    technologies: [
      'C#',
      'ASP.NET Core 10',
      'Entity Framework Core',
      'PostgreSQL',
      'Angular 20',
      'TypeScript',
      'SQLite',
      'JWT',
      'Docker',
    ],
    highlightedTechnologies: ['C#', 'ASP.NET Core 10'],
    coverImage: image(
      'cashboard-family',
      'cashboard.jpg',
      text(
        'CashBoard dashboard with financial totals, recent transactions and budgets',
        'Panel de CashBoard con totales, movimientos recientes y presupuestos',
      ),
    ),
    architecture: [
      stage(
        text('Angular Client', 'Cliente Angular'),
        text(
          'Standalone UI, signals, HttpClient and a JWT interceptor',
          'Interfaz standalone, signals, HttpClient e interceptor JWT',
        ),
      ),
      stage(
        text('ASP.NET Core REST API', 'API REST de ASP.NET Core'),
        text(
          'Minimal API with JWT validation and server-side permission checks',
          'Minimal API con validación JWT y comprobación de permisos en el servidor',
        ),
      ),
      stage(
        text('Entity Framework Core', 'Entity Framework Core'),
        text(
          'AppDbContext maps entities and persists records using the configured provider',
          'AppDbContext mapea las entidades y guarda los registros mediante el proveedor configurado',
        ),
      ),
      stage(
        text('Database', 'Base de datos'),
        text(
          'SQLite for local development. PostgreSQL is the alternative configured through Docker Compose.',
          'SQLite para desarrollo local. PostgreSQL es la alternativa configurada mediante Docker Compose.',
        ),
      ),
    ],
    architectureFlow: true,
    quality: {
      measures: [
        text('Swagger documents the REST endpoints.', 'Swagger documenta los endpoints REST.'),
        text(
          'JWT authenticates requests to protected endpoints.',
          'JWT autentica las solicitudes a los endpoints protegidos.',
        ),
        text(
          'Authorization distinguishes the Admin and Family roles.',
          'La autorización distingue los roles Admin y Family.',
        ),
        text(
          'The API enforces write permissions on the server.',
          'La API valida los permisos de escritura en el servidor.',
        ),
        text(
          'FamilyId scopes records to the authenticated family.',
          'FamilyId limita los registros a la familia autenticada.',
        ),
        text(
          'The Angular client and ASP.NET Core API are separate applications.',
          'El cliente Angular y la API ASP.NET Core son aplicaciones separadas.',
        ),
      ],
      pending: text(
        'Automated tests for family isolation and write permissions are listed as future work.',
        'Las pruebas automatizadas de aislamiento familiar y permisos de escritura están previstas como trabajo pendiente.',
      ),
    },
    decisions: [
      text(
        'Separate the Angular frontend and REST API so the UI consumes a defined HTTP contract.',
        'Separar el frontend Angular de la API REST para que la interfaz consuma un contrato HTTP definido.',
      ),
      text(
        'Use JWT bearer authentication for protected API requests.',
        'Usar autenticación JWT Bearer para las solicitudes protegidas a la API.',
      ),
      text(
        'Allow Admin to manage records. Family has read-only access.',
        'Permitir a Admin gestionar registros. Family tiene acceso de solo lectura.',
      ),
      text(
        'Filter family-owned records using FamilyId from the authenticated token.',
        'Filtrar los registros familiares con el FamilyId del token autenticado.',
      ),
      text(
        'Use SQLite as the default provider for local development.',
        'Usar SQLite como proveedor predeterminado para el desarrollo local.',
      ),
      text(
        'Configure PostgreSQL as the alternative provider in Docker Compose.',
        'Configurar PostgreSQL como proveedor alternativo mediante Docker Compose.',
      ),
    ],
    sourceButton: true,
    demoUrl: 'demos/cashboard-family/index.html',
    demoNote: text(
      'Original frontend demo with fictitious data. The current full-stack application runs locally.',
      'Demo original del frontend con datos ficticios. La aplicación full stack actual se ejecuta en local.',
    ),
    githubUrl: `${github}/CashBoard-Family`,
  },
  {
    id: 'it-incident-manager',
    slug: 'it-incident-manager',
    cardTechnologies: ['Python', 'Flask', 'SQLite', 'JavaScript'],
    order: 2,
    visible: true,
    title: 'IT Incident Manager',
    category: text('Real-world Business Solution', 'Solución para operaciones TI'),
    status: text('Public interactive demo', 'Demo interactiva pública'),
    description: text(
      'An incident reporting and follow-up tool developed around an IT support workflow.',
      'Herramienta de registro y seguimiento de incidentes creada a partir de un flujo real de soporte TI.',
    ),
    overview: text(
      'The full Flask application manages incident reports and their documents. A separate edition is used in the original workplace. The public browser demo uses fictional records and simulates search, status changes and summary updates.',
      'La aplicación Flask administra informes de incidentes y sus documentos. En el entorno laboral original se utiliza una edición independiente. La demo pública usa registros ficticios y simula búsquedas, cambios de estado y actualizaciones del resumen.',
    ),
    problem: text(
      'When reports and supporting documents are dispersed, it is hard for the support team to find cases or reconstruct their history.',
      'Cuando los informes y documentos están dispersos, al equipo de soporte le cuesta encontrar casos y reconstruir su historial.',
    ),
    solution: text(
      'A Spanish-language workspace centralizes reports, PDFs, status filters and audit history, with access for administrators, editors and readers.',
      'Una interfaz en español centraliza informes, PDF, filtros por estado e historial de auditoría, con acceso para administradores, editores y lectores.',
    ),
    contributions: text(
      'Built the reporting and lookup workflows, structured the data, implemented the interface and permission checks, and prepared a public edition with fictional records.',
      'Desarrollé los flujos de registro y consulta, organicé los datos, implementé la interfaz y el control de permisos y preparé una edición pública con registros ficticios.',
    ),
    features: [
      text('Incident registration and tracking', 'Registro y seguimiento de incidentes'),
      text('PDF document management', 'Gestión de documentos PDF'),
      text('Search and status filtering', 'Búsqueda y filtros por estado'),
      text('Reporting and statistics', 'Informes y estadísticas'),
      text('Authentication and role-based access', 'Autenticación y acceso basado en roles'),
      text('Change history and audit tracking', 'Historial de cambios y seguimiento de auditoría'),
    ],
    technologies: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    coverImage: image(
      'it-incident-manager',
      'preview.png',
      text(
        'Incident statistics in the Flask application using fictional data',
        'Estadísticas de incidentes de la aplicación Flask con datos ficticios',
      ),
    ),
    architecture: [
      stage(
        text('Browser interface', 'Interfaz web'),
        text(
          'Report forms, filters, charts and PDF access',
          'Formularios, filtros, gráficos y acceso a PDF',
        ),
      ),
      stage(
        text('Flask application', 'Aplicación Flask'),
        text(
          'Authenticated routes, role checks and change history',
          'Rutas autenticadas, control de roles e historial de cambios',
        ),
      ),
      stage(
        text('SQLite and documents', 'SQLite y documentos'),
        text(
          'Structured reports, audit records and associated PDFs',
          'Informes estructurados, registros de auditoría y PDF asociados',
        ),
      ),
    ],
    qualityCards: [
      {
        icon: 'person',
        title: text('Authentication', 'Autenticación'),
        detail: text(
          'Protected routes require a session. Sign-in uses CSRF protection and requires the initial password to be changed.',
          'Las rutas protegidas requieren una sesión. El inicio de sesión usa protección CSRF y obliga a cambiar la contraseña inicial.',
        ),
      },
      {
        icon: 'lock',
        title: text('Role-based Access', 'Acceso basado en roles'),
        detail: text(
          'The server applies distinct permissions for administrators, editors and readers. Editors can manage reports. Readers have read-only access.',
          'El servidor aplica permisos distintos para administradores, editores y lectores. Los editores pueden gestionar informes. Los lectores tienen acceso de solo lectura.',
        ),
      },
      {
        icon: 'check',
        title: text('Automated Security Testing', 'Pruebas automatizadas de seguridad'),
        detail: text(
          'The suite checks sign-in redirects, CSRF, required initial password changes, editor and reader permissions, PDF access restrictions, no-store and nosniff headers, startup without a secret, and audit entries after report changes.',
          'La suite comprueba la redirección al inicio de sesión, CSRF, el cambio obligatorio de contraseña inicial, los permisos de editor y lector, las restricciones de acceso a PDF, las cabeceras no-store y nosniff, el arranque sin secreto y la auditoría de cambios en informes.',
        ),
        automated: true,
      },
      {
        icon: 'history',
        title: text('Audit History', 'Historial de auditoría'),
        detail: text(
          'Report creation, updates and deletion are recorded. Administrators can review the change history.',
          'El sistema registra la creación, edición y eliminación de informes. Los administradores pueden consultar el historial de cambios.',
        ),
      },
    ],
    prioritizeDetailDemo: true,
    githubUrl: incidentSource,
    demoUrl: 'https://arojases.github.io/Gestion-de-Incidentes/',
    links: [
      {
        label: text('Setup and testing guide', 'Guía de instalación y pruebas'),
        url: `${incidentSource}/blob/master/docs/INSTALACION.md`,
      },
      {
        label: text('Automated security checks', 'Pruebas automatizadas de seguridad'),
        url: `${incidentSource}/blob/master/tests/test_security.py`,
      },
      {
        label: text('Static demo source', 'Código de la demo estática'),
        url: `${incidentSource}/blob/master/docs/index.html`,
      },
    ],
  },
  {
    id: 'ashveil-relics',
    slug: 'ashveil-relics',
    cardImage: {
      ...image(
        'ashveil-relics',
        'Menu.jpg',
        text('Ashveil Relics main menu', 'Menú principal de Ashveil Relics'),
        'center',
      ),
      fit: 'contain',
    },
    cardTechnologies: ['C#', 'Unity 6'],
    order: 3,
    visible: true,
    title: 'Ashveil Relics',
    category: text('Game Development', 'Desarrollo de videojuegos'),
    status: text('Windows demo v1.1', 'Demo v1.1 para Windows'),
    description: text(
      'A playable top-down action RPG prototype with melee combat, dungeon exploration and a two-phase final boss.',
      'Prototipo jugable de RPG de acción cenital con combate cuerpo a cuerpo, exploración y un jefe final de dos fases.',
    ),
    overview: text(
      'A playable 2D dark fantasy action RPG developed with C# and Unity 6, featuring melee combat, enemy AI, quest progression, dungeon exploration and a two-phase boss battle.',
      'RPG de acción 2D de fantasía oscura desarrollado con C# y Unity 6, con combate cuerpo a cuerpo, inteligencia artificial de enemigos, sistema de misiones, exploración de mazmorras y un jefe final de dos fases.',
    ),
    caseStudyLabels: {
      problem: text('Development Challenge', 'Desafío de desarrollo'),
      solution: text('Implementation', 'Implementación'),
      contributions: text('My Contribution', 'Mi contribución'),
    },
    problem: text(
      'The prototype explores how combat, quest progression and scene transitions can support a short, complete adventure.',
      'El prototipo explora cómo el combate, las misiones y las transiciones pueden sostener una aventura breve y completa.',
    ),
    solution: text(
      'A village quest leads to dungeon encounters, an orc ambush and a boss battle, followed by a return to the village and an epilogue.',
      'Una misión en la aldea conduce a encuentros en la mazmorra, una emboscada de orcos y una batalla final, seguida del regreso y un epílogo.',
    ),
    contributions: text(
      'Developed the gameplay prototype, combat and progression systems, and prepared the Windows build and public code samples. Codex and other generative AI tools assisted with implementation and debugging.',
      'Desarrollé el prototipo jugable, los sistemas de combate y progresión, y preparé la versión de Windows y las muestras públicas de código. Codex y otras herramientas generativas apoyaron la implementación y depuración.',
    ),
    features: [
      text(
        'Eight-direction movement, melee combat and invulnerable dodge window',
        'Movimiento en ocho direcciones, combate cuerpo a cuerpo y evasión con invulnerabilidad temporal',
      ),
      text(
        'Enemy AI and a two-phase boss with readable attack warnings',
        'IA de enemigos y jefe de dos fases con avisos de ataque',
      ),
      text(
        'Quest journal, NPC dialogue, dungeon exploration and scene transitions',
        'Diario de misiones, diálogos con NPC, exploración y transiciones',
      ),
      text(
        'Scene-based music, sound effects, defeat, retry and victory screens',
        'Música por escena, efectos sonoros y pantallas de derrota, reintento y victoria',
      ),
    ],
    technologies: ['C#', 'Unity 6', 'TextMeshPro'],
    coverImage: image(
      'ashveil-relics',
      'AshveilRelics-portada.jpg',
      text('Official Ashveil Relics cover', 'Portada oficial de Ashveil Relics'),
    ),
    screenshots: ashveilGallery.map(([filename, en, es]) =>
      image('ashveil-relics', filename, text(en, es)),
    ),
    architectureSystems: true,
    architecture: [
      stage(
        text('Player System', 'Sistema del jugador'),
        text(
          'Directional movement, timed melee attacks and health. The dodge works with movement, combat and collision checks.',
          'Movimiento direccional, ataques cuerpo a cuerpo y salud. La evasión se coordina con el movimiento, el combate y la detección de colisiones.',
        ),
      ),
      stage(
        text('Enemy AI', 'IA de enemigos'),
        text(
          'Enemies detect, pursue and attack the player. The final boss changes phase based on its health.',
          'Los enemigos detectan, persiguen y atacan al jugador. El jefe final cambia de fase según su salud.',
        ),
      ),
      stage(
        text('Quest System', 'Sistema de misiones'),
        text(
          'NPC dialogue and the quest journal guide progression. The dungeon door listens for quest-state changes.',
          'Los diálogos con NPC y el diario guían la progresión. La puerta de la mazmorra responde a cambios de estado de la misión.',
        ),
      ),
      stage(
        text('Scene Management', 'Gestión de escenas'),
        text(
          'The entrance portal checks the interaction area, quest state and door before allowing travel.',
          'El portal de entrada comprueba la zona de interacción, el estado de la misión y la puerta antes de permitir el viaje.',
        ),
      ),
      stage(
        text('Presentation', 'Presentación'),
        text(
          'HUD, menus, dialogue panels and result screens. A persistent audio manager handles music by scene and sound effects.',
          'HUD, menús, paneles de diálogo y pantallas de resultado. Un gestor de audio persistente reproduce música por escena y efectos sonoros.',
        ),
      ),
    ],
    decisions: [
      text(
        'Give enemies distinct behaviors for detection, pursuit and attack. The boss uses explicit states for pursuit, attacks, reactions, phase changes and death.',
        'Dar a los enemigos comportamientos diferenciados de detección, persecución y ataque. El jefe usa estados explícitos para perseguir, atacar, reaccionar, cambiar de fase y morir.',
      ),
      text(
        'Trigger the boss’s second phase when health drops below half, unlocking a third attack.',
        'Activar la segunda fase del jefe cuando su salud baja de la mitad y habilitar un tercer ataque.',
      ),
      text(
        'Subscribe the dungeon door to quest-journal changes to update its animation and blocking collider.',
        'Suscribir la puerta de la mazmorra a los cambios del diario de misiones para actualizar su animación y el collider de bloqueo.',
      ),
      text(
        'Gate portal travel on the configured quest, door and interaction area conditions.',
        'Condicionar el viaje por el portal a la misión, la puerta y la zona de interacción configuradas.',
      ),
      text(
        'Use a directional Rigidbody2D cast to limit the dodge to available space and grant brief invulnerability.',
        'Usar una comprobación direccional con Rigidbody2D para limitar la evasión al espacio disponible y otorgar invulnerabilidad breve.',
      ),
    ],
    codeSamples: [
      {
        file: 'PlayerDodge.cs',
        detail: text(
          'Coordinates directional dodges with combat, checks available space and grants temporary invulnerability.',
          'Coordina la evasión direccional con el combate, verifica el espacio disponible y otorga invulnerabilidad temporal.',
        ),
        url: `${ashveilSource}/blob/main/src/PlayerDodge.cs`,
      },
      {
        file: 'SkeletonBrain.cs',
        detail: text(
          'Handles target detection, pursuit, attack timing and damage reactions.',
          'Gestiona la detección del objetivo, la persecución, los tiempos de ataque y las reacciones al daño.',
        ),
        url: `${ashveilSource}/blob/main/src/SkeletonBrain.cs`,
      },
      {
        file: 'LuciferBoss.cs',
        detail: text(
          'Controls the boss state machine, telegraphed attacks and health-based phase transition.',
          'Controla la máquina de estados del jefe, los avisos de ataque y la transición de fase según su salud.',
        ),
        url: `${ashveilSource}/blob/main/src/LuciferBoss.cs`,
      },
      {
        file: 'DungeonEntranceDoor.cs',
        detail: text(
          'Listens for quest changes and updates the door animation and blocking collider.',
          'Escucha cambios de misión y actualiza la animación de la puerta y el collider de bloqueo.',
        ),
        url: `${ashveilSource}/blob/main/src/DungeonEntranceDoor.cs?plain=1`,
      },
      {
        file: 'ScenePortal.cs',
        detail: text(
          'Defines the target scene and checks quest, door and interaction-area conditions for travel.',
          'Define la escena de destino y comprueba la misión, la puerta y la zona de interacción para permitir el viaje.',
        ),
        url: `${ashveilSource}/blob/main/src/ScenePortal.cs`,
      },
    ],
    technicalNote: text(
      'The public showcase contains documentation, screenshots and selected C# examples. These examples do not form a standalone, compilable Unity project. The full Unity project is private.',
      'El repositorio público reúne documentación, capturas y ejemplos seleccionados de C#. Los ejemplos no forman un proyecto Unity compilable por sí solos. El proyecto completo de Unity es privado.',
    ),
    controls: [
      { action: text('Move', 'Moverse'), keys: text('WASD / Arrow keys', 'WASD / Flechas') },
      {
        action: text('Attack', 'Atacar'),
        keys: text('J / Left mouse button', 'J / Botón izquierdo del mouse'),
      },
      { action: text('Dodge', 'Esquivar'), keys: text('Space', 'Espacio') },
      { action: text('Interact', 'Interactuar'), keys: text('E', 'E') },
    ],
    installation: [
      text(
        'Download the Windows x64 ZIP from itch.io.',
        'Descarga el ZIP para Windows x64 desde itch.io.',
      ),
      text('Extract every file into one folder.', 'Extrae todos los archivos en una carpeta.'),
      text(
        'Run AshveilRelics.exe alongside its data files and DLLs. The build runs without the Unity Editor.',
        'Ejecuta AshveilRelics.exe junto a sus archivos de datos y DLL. La versión se ejecuta sin el Editor de Unity.',
      ),
      text(
        'Speak to the main villager to start the quest.',
        'Habla con el aldeano principal para iniciar la misión.',
      ),
    ],
    credits: text(
      'Art by Anokolisa (Pixel Crawler) and Foozle (Lucifer Skeleton Ancient). Sound effects by Kenney. Music by Ruhinre, RandomMind, yd, request and Juhani Junkala / SubspaceAudio.',
      'Arte de Anokolisa (Pixel Crawler) y Foozle (Lucifer Skeleton Ancient). Efectos sonoros de Kenney. Música de Ruhinre, RandomMind, yd, request y Juhani Junkala / SubspaceAudio.',
    ),
    githubUrl: ashveilSource,
    documentationUrl: ashveilSource,
    downloadUrl: 'https://arojases.itch.io/ashveil-relics',
    prioritizeDetailDownload: true,
    links: [
      {
        label: text('Architecture notes', 'Notas de arquitectura'),
        url: `${ashveilSource}/blob/main/docs/ARCHITECTURE.md`,
      },
      {
        label: text('Demo v1.1 changelog', 'Cambios de la demo v1.1'),
        url: `${ashveilSource}/blob/main/CHANGELOG.md`,
      },
      {
        label: text('Original asset credits and licenses', 'Créditos y licencias originales'),
        url: `${ashveilSource}/blob/main/docs/ASSET_CREDITS.md`,
      },
    ],
  },
  {
    id: 'developer-portfolio',
    slug: 'developer-portfolio',
    cardTechnologies: ['Angular', 'TypeScript', 'SCSS', 'GitHub Actions'],
    order: 4,
    visible: true,
    title: 'Developer Portfolio',
    category: text('Frontend Development', 'Desarrollo frontend'),
    status: text('GitHub Pages site', 'Sitio en GitHub Pages'),
    coverImage: {
      ...image(
        'developer-portfolio',
        'hero-desktop.webp',
        text(
          'Desktop hero with portrait, navigation and CV actions',
          'Hero de escritorio con retrato, navegación y botones de CV',
        ),
        'center',
      ),
      fit: 'contain',
    },
    screenshots: [
      image(
        'developer-portfolio',
        'hero-mobile.webp',
        text('Mobile hero with compact navigation', 'Hero móvil con navegación compacta'),
      ),
    ],
    description: text(
      'A bilingual engineering portfolio with typed case studies, reusable components and static hosting.',
      'Portafolio bilingüe de ingeniería con casos de estudio tipados, componentes reutilizables y alojamiento estático.',
    ),
    overview: text(
      'A personal Angular 21 site that presents software projects through screenshots, architecture diagrams and links to technical evidence.',
      'Sitio personal en Angular 21 que presenta proyectos mediante capturas, diagramas de arquitectura y enlaces a evidencia técnica.',
    ),
    problem: text(
      'Recruiters and technical leads need enough context to understand what each project does and evaluate the implementation.',
      'Reclutadores y líderes técnicos necesitan contexto para entender cada proyecto y evaluar su implementación.',
    ),
    solution: text(
      'A typed catalog feeds reusable cards and individual case studies. The interface supports English and Spanish and adapts from mobile to desktop.',
      'Un catálogo tipado alimenta tarjetas reutilizables y casos de estudio individuales. La interfaz admite inglés y español y se adapta de celular a escritorio.',
    ),
    contributions: text(
      'Designed the site, organized the case studies and built an Angular application with static deep links and a GitHub Actions deployment workflow.',
      'Diseñé el sitio, organicé los casos de estudio y construí una aplicación Angular con rutas directas estáticas y despliegue mediante GitHub Actions.',
    ),
    features: [
      text(
        'Angular 21 with reusable standalone components and centralized, typed project and profile data.',
        'Angular 21 con componentes standalone reutilizables y datos tipados y centralizados del perfil y los proyectos.',
      ),
      text(
        'Persistent English and Spanish language selection, including language-specific CV downloads.',
        'Selección persistente de inglés o español con descarga del CV correspondiente.',
      ),
      text(
        'Responsive layouts, keyboard navigation and a native image dialog that restores focus.',
        'Diseño adaptable, navegación por teclado y visor nativo de imágenes que devuelve el foco.',
      ),
      text(
        'Individual case studies and an interactive CashBoard demo served as static files.',
        'Casos de estudio individuales y demo interactiva de CashBoard servida como archivos estáticos.',
      ),
      text(
        'Direct project URLs on GitHub Pages and automated validation and deployment with GitHub Actions.',
        'Rutas directas en GitHub Pages y validación y despliegue automatizados con GitHub Actions.',
      ),
    ],
    technologies: ['Angular 21', 'TypeScript', 'SCSS', 'GitHub Actions', 'GitHub Pages'],
    architectureFlow: true,
    architecture: [
      stage(
        text('Typed Content', 'Contenido tipado'),
        text(
          'Professional profile, featured projects and local EN/ES dictionaries.',
          'Perfil profesional, proyectos destacados y diccionarios EN/ES locales.',
        ),
      ),
      stage(
        text('Angular Application', 'Aplicación Angular'),
        text(
          'Standalone components, router, shared services and signal-based state.',
          'Componentes standalone, router, servicios compartidos y estado con signals.',
        ),
      ),
      stage(
        text('Automated Validation', 'Validación automatizada'),
        text(
          'Build the production bundle, generate static route entries and test the output.',
          'Compilar para producción, generar entradas de rutas estáticas y probar la salida.',
        ),
      ),
      stage(
        text('GitHub Actions', 'GitHub Actions'),
        text(
          'Run the validation pipeline and publish the Pages artifact on main or manual dispatch.',
          'Ejecutar la validación y publicar el artefacto de Pages desde main o mediante ejecución manual.',
        ),
      ),
      stage(
        text('GitHub Pages', 'GitHub Pages'),
        text(
          'Serve static assets, project entry pages and a 404 fallback.',
          'Servir recursos estáticos, entradas de proyectos y una página 404.',
        ),
      ),
    ],
    decisions: [
      text(
        'Replace runtime GitHub API requests with a manually curated catalog of four projects.',
        'Sustituir las peticiones a la API de GitHub en ejecución por un catálogo de cuatro proyectos seleccionados manualmente.',
      ),
      text(
        'Keep professional content and project data in typed modules and reuse one case-study template.',
        'Centralizar los datos profesionales y de proyectos en módulos tipados y reutilizar una plantilla de caso de estudio.',
      ),
      text(
        'Remove repository caches, synchronization scripts and unused dependencies.',
        'Eliminar la caché de repositorios, los scripts de sincronización y las dependencias en desuso.',
      ),
      text(
        'Serve optimized local imagery, fonts and icons. Keep the historical CashBoard demo isolated as static files.',
        'Servir imágenes optimizadas, fuentes e iconos locales. Mantener aislada la demo histórica de CashBoard como archivos estáticos.',
      ),
      text(
        'Generate per-project HTML entry points under /Portafolio/ so direct links and reloads work on static hosting.',
        'Generar entradas HTML por proyecto bajo /Portafolio/ para que los enlaces directos y las recargas funcionen en alojamiento estático.',
      ),
      text(
        'Centralize EN/ES copy and persist the selected locale for interface text and CV downloads.',
        'Centralizar los textos EN/ES y guardar el idioma elegido para la interfaz y la descarga de CV.',
      ),
    ],
    sourceButton: true,
    qualityCards: [
      {
        icon: 'check',
        automated: true,
        title: text('Repository test suite', 'Suite de pruebas del repositorio'),
        detail: text(
          '9 tests passed on the final Pages build. They cover catalog integrity, bilingual content, HTTPS links, local images and logos, both CV PDFs, the static demo and direct project routes with metadata and a 404 fallback.',
          '9 pruebas aprobadas en la compilación final de Pages. Verifican el catálogo, el contenido bilingüe, los enlaces HTTPS, las imágenes e iconos locales, ambos PDF, la demo estática, las rutas directas con metadatos y la página 404.',
        ),
      },
      {
        icon: 'code',
        manual: true,
        title: text('Browser validation', 'Validación en navegador'),
        detail: text(
          'Keyboard navigation, Escape and focus return in the image viewer, EN/ES switching and persistence, CV downloads, direct links and responsive layouts were checked in Edge.',
          'En Edge se comprobaron la navegación por teclado, Escape y la devolución del foco en el visor, el cambio y la persistencia de EN/ES, las descargas de CV, los enlaces directos y el diseño adaptable.',
        ),
      },
    ],
    githubUrl: `${github}/Portafolio`,
    links: [
      { label: text('README', 'README'), url: `${github}/Portafolio/blob/main/README.md` },
      {
        label: text('Project model', 'Modelo de proyectos'),
        url: `${github}/Portafolio/blob/main/src/app/core/models/project.ts`,
      },
      {
        label: text('Project data', 'Datos de proyectos'),
        url: `${github}/Portafolio/blob/main/src/app/core/data/projects.ts`,
      },
      {
        label: text('Reusable components', 'Componentes reutilizables'),
        url: `${github}/Portafolio/tree/main/src/app/shared/components`,
      },
      {
        label: text('Automated tests', 'Pruebas automatizadas'),
        url: `${github}/Portafolio/blob/main/scripts/portfolio.test.mjs`,
      },
      {
        label: text('GitHub Actions workflow', 'Workflow de GitHub Actions'),
        url: `${github}/Portafolio/blob/main/.github/workflows/pages.yml`,
      },
      {
        label: text('Portfolio website', 'Sitio del portafolio'),
        url: 'https://arojases.github.io/Portafolio/',
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((project) => project.visible)
  .sort((a, b) => a.order - b.order);
