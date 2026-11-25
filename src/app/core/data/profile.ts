import type { Localized } from '../models/project';

const text = (en: string, es: string): Localized => ({ en, es });

export const independentExperience = {
  title: text('Independent Software Developer', 'Desarrollador de Software Independiente'),
  subtitle: text(
    'Personal Projects · Continuous Development',
    'Proyectos personales · Desarrollo continuo',
  ),
  description: text(
    'I actively develop software applications through personal projects, focusing on C#, .NET, ASP.NET Core and full-stack development. My projects allow me to apply software engineering principles, design application architectures and build practical, maintainable solutions.',
    'Desarrollo aplicaciones de software de manera continua mediante proyectos personales, con especial enfoque en C#, .NET, ASP.NET Core y desarrollo Full Stack. Mis proyectos me permiten aplicar principios de ingeniería de software, diseñar arquitecturas de aplicaciones y construir soluciones prácticas y mantenibles.',
  ),
  areas: [
    text('Full Stack Development', 'Desarrollo Full Stack'),
    text('Software Architecture', 'Arquitectura de software'),
    text('REST API Development', 'Desarrollo de APIs REST'),
    text('Database Management', 'Gestión de bases de datos'),
    text('Authentication and Authorization', 'Autenticación y autorización'),
    text('Software Testing', 'Pruebas de software'),
    text('Version Control and CI/CD', 'Control de versiones y CI/CD'),
    text('Game Development', 'Desarrollo de videojuegos'),
  ],
};

const tps = 'Terminal Pacífico Sur Valparaíso S.A. (TPS)';

export const experience = [
  {
    title: text('IT Support and Operational Continuity', 'Soporte TI y continuidad operativa'),
    company: tps,
    period: text('December 2024 – Present', 'Diciembre de 2024 – Actualidad'),
    responsibilities: [
      text(
        'Developed an incident management prototype with Python, Flask and SQLite to record and track cases, attach PDFs, filter reports and review change history.',
        'Desarrollé un prototipo de gestión de incidentes con Python, Flask y SQLite para registrar y dar seguimiento a casos, adjuntar PDF, filtrar informes y consultar el historial de cambios.',
      ),
      text(
        'Diagnose and resolve technology issues in an enterprise environment, supporting IT infrastructure and operational continuity.',
        'Diagnostico y resuelvo problemas tecnológicos en un entorno empresarial, con foco en el soporte de infraestructura TI y la continuidad operativa.',
      ),
    ],
    project: 'it-incident-manager',
  },
  {
    title: text('Web Application QA Intern', 'Practicante de QA de aplicaciones web'),
    company: tps,
    period: text('May 2019 – August 2019', 'Mayo de 2019 – Agosto de 2019'),
    responsibilities: [
      text(
        'Worked with the development team and ran manual and automated tests to verify website behavior before release.',
        'Colaboré con el equipo de desarrollo y ejecuté pruebas manuales y automatizadas para verificar el funcionamiento del sitio web antes de su publicación.',
      ),
      text(
        'Documented defects, verified fixes and ran regression tests.',
        'Registré defectos, validé correcciones y ejecuté pruebas de regresión.',
      ),
    ],
  },
];

const byu = 'Brigham Young University–Idaho';

export const education = [
  {
    degree: text(
      'Bachelor of Science in Software Development',
      'Licenciatura en Desarrollo de Software',
    ),
    institution: byu,
    period: text('2023–Present', '2023–Actualidad'),
    status: text('In Progress', 'En curso'),
  },
  {
    degree: text(
      'Associate of Applied Science in Applied Technology',
      'Grado asociado en Tecnología Aplicada',
    ),
    institution: byu,
    period: text('2020–2023', '2020–2023'),
    status: text('Completed', 'Finalizado'),
  },
  {
    degree: text('Computer Engineering', 'Ingeniería en Informática'),
    institution: 'Duoc UC',
    period: text('2019', '2019'),
    status: text('Completed', 'Finalizada'),
  },
];

interface Skill {
  label: Localized;
  logo?: string;
  light?: boolean;
  glyph?: string;
}

interface SkillGroup {
  id: string;
  title: Localized;
  icon: string;
  emphasis?: 'core' | 'secondary';
  items: Skill[];
}

const brand = (name: string, logo: string, light = false): Skill => ({
  label: text(name, name),
  logo: `icons/skills/${logo}.svg`,
  light,
});

const practice = (en: string, es: string, glyph: string): Skill => ({
  label: text(en, es),
  glyph,
});

export const skillGroups: SkillGroup[] = [
  {
    id: 'dotnet',
    title: text('Primary Stack', 'Stack principal'),
    icon: 'code',
    emphasis: 'core',
    items: [
      brand('C#', 'csharp'),
      brand('.NET', 'dot-net'),
      brand('ASP.NET Core', 'dotnetcore'),
      brand('Entity Framework Core', 'entityframeworkcore'),
      practice('REST APIs', 'APIs REST', 'code'),
    ],
  },
  {
    id: 'frontend',
    title: text('Frontend Development', 'Desarrollo frontend'),
    icon: 'code',
    items: [
      brand('Angular', 'angular'),
      brand('Blazor', 'blazor'),
      brand('TypeScript', 'typescript'),
    ],
  },
  {
    id: 'databases',
    title: text('Databases', 'Bases de datos'),
    icon: 'database',
    items: [
      brand('PostgreSQL', 'postgresql'),
      brand('SQL Server', 'microsoftsqlserver'),
      brand('SQLite', 'sqlite'),
    ],
  },
  {
    id: 'additional-development',
    title: text('Additional Development', 'Desarrollo adicional'),
    icon: 'server',
    items: [
      brand('Python', 'python'),
      brand('Flask', 'flask', true),
      brand('Django', 'django', true),
    ],
  },
  {
    id: 'tools',
    title: text('Development Tools', 'Herramientas de desarrollo'),
    icon: 'tool',
    items: [
      brand('Git / GitHub', 'git'),
      brand('Docker', 'docker'),
      brand('GitHub Actions', 'githubactions'),
    ],
  },
  {
    id: 'complementary',
    title: text('Complementary Skills', 'Habilidades complementarias'),
    icon: 'network',
    emphasis: 'secondary',
    items: [
      practice('Software Testing', 'Pruebas de software', 'check'),
      brand('Unity', 'unity', true),
      practice('IT Infrastructure', 'Infraestructura TI', 'network'),
    ],
  },
];
