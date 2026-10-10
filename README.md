# Portafolio Angular + GitHub API

Portafolio personal moderno construido con Angular 21, TypeScript, SCSS y RxJS. El sitio consume la API publica de GitHub en tiempo real para obtener repositorios, lenguajes usados y metricas del perfil.

## Demo

[Ver portafolio](https://arojases.github.io/Portafolio/)

## Stack

- Angular 21 con standalone components y routing
- TypeScript
- Angular HttpClient
- RxJS (`forkJoin`, `mergeMap`, `shareReplay`, `catchError`)
- SCSS moderno con soporte dark/light mode
- Angular animations

## Como ejecutar

1. Instala dependencias:

```bash
npm install
```

2. Inicia el entorno local:

```bash
npm start
```

3. Abre `http://localhost:4300`.

## Actualizar las demos de 50 Projects

La galeria conserva una copia local de las demos para que funcionen dentro del portafolio. Para
sincronizarla con el repositorio original, ejecuta:

```bash
npm run sync:50-projects
```

El despliegue de GitHub Pages también ejecuta esta sincronización automáticamente antes de cada
compilación, incluyendo el despliegue programado cada seis horas.

## Integracion con GitHub API

El servicio `src/app/core/services/portfolio-data.service.ts` consulta:

- `GET /users/arojases` para datos del perfil
- `GET /users/arojases/repos` para repositorios publicos
- `GET /repos/:owner/:repo/languages` para calcular lenguajes por proyecto y globales

### Estrategia usada

- `shareReplay(1)` evita repetir llamadas HTTP innecesarias.
- `mergeMap(..., 5)` limita la concurrencia al pedir lenguajes por repositorio.
- `catchError` intenta recuperar datos desde `localStorage` si la API falla.
- El portafolio muestra si los datos vienen en vivo (`live`) o desde cache (`cache`).

## Estructura principal

```text
src/
  app/
    core/
      config/
      models/
      services/
    pages/
      home/
    sections/
      about/
      footer/
      hero/
      navbar/
      projects/
    shared/
      animations/
```

## Personalizacion rapida

- Usuario de GitHub: edita `src/app/core/config/portfolio.config.ts`
- Textos CTA y resumen: edita `src/app/core/config/portfolio.config.ts`
- Colores/tema: edita `src/styles.scss`

## Despliegue sugerido

### Vercel

1. Importa el repositorio.
2. Build command: `npm run build`
3. Output directory: `dist/portfolio-app`

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist/portfolio-app`

### GitHub Pages

1. Ejecuta `ng build --base-href /NOMBRE_DEL_REPO/`
2. Publica el contenido generado dentro de `dist/portfolio-app`

## Notas

- La API publica de GitHub tiene limites de rate limit para peticiones no autenticadas.
- No se expone ningun token sensible.
- Si quieres agregar formulario de contacto real, conviene conectarlo a Formspree, Resend o un backend propio.

## Reportar problemas y colaborar

Abre un issue con los pasos para reproducir el problema, el resultado esperado y el resultado obtenido. Incluye navegador o versión del entorno cuando sea relevante y evita publicar datos personales o credenciales. Para proponer una mejora, explica el caso de uso y el alcance antes de enviar un pull request.
