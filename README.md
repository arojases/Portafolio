# Developer Portfolio

Personal software development portfolio built with Angular 21 and TypeScript, showcasing my professional background, technical skills, and selected software projects.

My primary focus is Full Stack Development with C#, .NET, and ASP.NET Core.

## Live Website

[Visit Portfolio](https://arojases.github.io/Portafolio/)

## Features

- Modern and responsive interface.
- English and Spanish language support.
- Professional experience and education.
- Technical skills organized by category.
- Selected projects with detailed case studies.
- Software architecture diagrams.
- Real application screenshots and interactive galleries.
- Interactive project demos.
- Downloadable résumés in English and Spanish.
- Accessible navigation and keyboard support.
- Automated deployment through GitHub Actions.

## Featured Projects

| Project | Technologies | Repository |
| --- | --- | --- |
| CashBoard Family | C#, ASP.NET Core, Angular, PostgreSQL | [Repository](https://github.com/arojases/CashBoard-Family) |
| IT Incident Manager | Python, Flask, SQLite | [Repository](https://github.com/arojases/Gestion-de-Incidentes) |
| Ashveil Relics | C#, Unity 6 | [Technical Showcase](https://github.com/arojases/AshveilRelics-Showcase) |
| Developer Portfolio | Angular 21, TypeScript, SCSS | [Repository](https://github.com/arojases/Portafolio) |

Each case study includes implementation details, architecture, screenshots, and links to documentation, demos, or downloads where available.

## Technology Stack

- Angular 21
- TypeScript
- SCSS
- Angular Standalone Components
- Angular Router
- GitHub Actions
- GitHub Pages

## Project Structure

```text
src/
  app/
    core/
    pages/
    sections/
    shared/
  styles.scss
public/
scripts/
.github/
  workflows/
```

The application uses centralized typed content, reusable components, and bilingual translations. Project information is maintained locally.

## Getting Started

Clone the repository and install dependencies from the lockfile. CI uses Node.js 22.

```bash
git clone https://github.com/arojases/Portafolio.git
cd Portafolio
npm ci
npm start
```

Open [localhost:4300](http://localhost:4300/) in your browser.

## Production Build

```bash
npm run build
```

Build for GitHub Pages under `/Portafolio/`.

```bash
npm run build:pages
```

## Testing and Quality

Run the automated tests with `npm test`. To include deployment checks, build for Pages first and then run the suite with `CHECK_PAGES=1`.

```bash
npm run build:pages
CHECK_PAGES=1 npm test
```

The latest Pages validation passed **9 automated tests** covering the project catalog, bilingual content, links, local assets, résumé PDFs, the static demo entry point, and direct project routes. Browser checks covered navigation, language persistence, downloads, demo interaction, responsive layouts, and keyboard accessibility.

### Lighthouse Results

Lighthouse 13.6.0 audited the production home page served locally with its mobile preset.

| Category | Score |
| --- | ---: |
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Cumulative Layout Shift (CLS) was 0. Results may vary by environment and build.

## Deployment

GitHub Actions deploys the portfolio to GitHub Pages on pushes to `main` or when triggered manually.

## Author

Ariel Rojas

Full Stack Developer | C# | .NET | ASP.NET Core

- [Portfolio](https://arojases.github.io/Portafolio/)
- [GitHub](https://github.com/arojases)
- [LinkedIn](https://www.linkedin.com/in/arielrojasescudero/)

## Feedback

Suggestions and bug reports are welcome through [GitHub Issues](https://github.com/arojases/Portafolio/issues).
