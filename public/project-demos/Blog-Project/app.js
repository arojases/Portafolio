const posts = [
  {
    title: 'Como organizar un blog tecnico',
    category: 'Desarrollo',
    date: 'Mar 2023',
    readTime: '4 min',
    summary:
      'Estructura inicial para publicar notas, separar categorias y mantener un flujo simple de lectura.',
    body:
      'La demo presenta una pagina de inicio con articulos destacados, categorias y una lectura rapida. En el proyecto real este patron sirve como base para listar contenido y abrir cada publicacion en su propia vista.',
    visual: 'linear-gradient(135deg, #0f766e, #22c55e)',
  },
  {
    title: 'Publicaciones con portada visual',
    category: 'UI',
    date: 'Mar 2023',
    readTime: '3 min',
    summary:
      'Cada entrada usa un bloque visual para diferenciar temas y hacer que la grilla sea facil de escanear.',
    body:
      'Las tarjetas estan pensadas para mostrar titulo, categoria, fecha y extracto. Esto ayuda a evaluar rapidamente la interfaz aunque la demo no escriba en una base de datos.',
    visual: 'linear-gradient(135deg, #d9462f, #f59e0b)',
  },
  {
    title: 'Busqueda y categorias',
    category: 'JavaScript',
    date: 'Abr 2023',
    readTime: '5 min',
    summary:
      'Filtro por texto y tabs de categoria para simular una experiencia de navegacion real.',
    body:
      'El buscador trabaja sobre titulo, categoria y resumen. Es una interaccion simple, pero suficiente para mostrar comportamiento dinamico con JavaScript en una demo de portafolio.',
    visual: 'linear-gradient(135deg, #2563eb, #06b6d4)',
  },
  {
    title: 'Panel de administracion',
    category: 'Admin',
    date: 'Abr 2023',
    readTime: '4 min',
    summary:
      'Vista resumida del flujo de administracion para crear borradores y revisar contenido.',
    body:
      'El panel inferior funciona como representacion visual del area privada: metricas, formulario de borrador y acciones de gestion. No guarda datos, pero comunica el flujo del proyecto.',
    visual: 'linear-gradient(135deg, #7c3aed, #db2777)',
  },
];

const postGrid = document.querySelector('#postGrid');
const readerPanel = document.querySelector('#readerPanel');
const featuredPost = document.querySelector('#featuredPost');
const categoryTabs = document.querySelector('#categoryTabs');
const searchInput = document.querySelector('#searchInput');

let selectedCategory = 'Todos';
let selectedPost = posts[0];

function renderFeatured() {
  featuredPost.innerHTML = `
    <span class="tag">${posts[0].category}</span>
    <h2>${posts[0].title}</h2>
    <p>${posts[0].summary}</p>
    <span class="meta">${posts[0].date} - ${posts[0].readTime}</span>
  `;
}

function renderCategories() {
  const categories = ['Todos', ...new Set(posts.map((post) => post.category))];

  categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button class="${category === selectedCategory ? 'active' : ''}" type="button" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join('');

  categoryTabs.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;
      renderCategories();
      renderPosts();
    });
  });
}

function getFilteredPosts() {
  const query = searchInput.value.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesQuery = [post.title, post.category, post.summary]
      .join(' ')
      .toLowerCase()
      .includes(query);

    return matchesCategory && matchesQuery;
  });
}

function renderPosts() {
  const filteredPosts = getFilteredPosts();

  if (!filteredPosts.length) {
    postGrid.innerHTML = '<article class="post-card"><h3>No hay resultados</h3><p>Prueba con otra busqueda o categoria.</p></article>';
    return;
  }

  postGrid.innerHTML = filteredPosts
    .map(
      (post) => `
        <article class="post-card ${post.title === selectedPost.title ? 'active' : ''}" data-title="${post.title}">
          <div class="post-visual" style="--visual: ${post.visual}"></div>
          <span class="tag">${post.category}</span>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <span class="meta">${post.date} - ${post.readTime}</span>
        </article>
      `,
    )
    .join('');

  postGrid.querySelectorAll('.post-card').forEach((card) => {
    card.addEventListener('click', () => {
      selectedPost = posts.find((post) => post.title === card.dataset.title) ?? selectedPost;
      renderPosts();
      renderReader();
    });
  });
}

function renderReader() {
  readerPanel.innerHTML = `
    <span class="tag">${selectedPost.category}</span>
    <h2>${selectedPost.title}</h2>
    <p>${selectedPost.body}</p>
    <span class="meta">${selectedPost.date} - ${selectedPost.readTime}</span>
  `;
}

searchInput.addEventListener('input', renderPosts);

renderFeatured();
renderCategories();
renderPosts();
renderReader();
