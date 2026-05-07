const vehicles = [
  {
    id: 1,
    make: 'Jeep',
    model: 'Wrangler',
    category: 'SUV',
    price: 28045,
    stock: 4,
    color: 'Orange',
    image: 'images/vehicles/wrangler.jpg',
    thumb: 'images/vehicles/wrangler-tn.jpg',
    description: 'Compacto, potente y preparado para ciudad o rutas fuera del camino.'
  },
  {
    id: 2,
    make: 'Ford',
    model: 'Model T',
    category: 'Classic',
    price: 30000,
    stock: 2,
    color: 'Black',
    image: 'images/vehicles/ford-modelt.jpg',
    thumb: 'images/vehicles/ford-modelt-tn.jpg',
    description: 'Un clasico historico, sencillo y reconocible al instante.'
  },
  {
    id: 3,
    make: 'Lamborghini',
    model: 'Adventador',
    category: 'Sports',
    price: 417650,
    stock: 1,
    color: 'Blue',
    image: 'images/vehicles/lambo-Adve.jpg',
    thumb: 'images/vehicles/lambo-Adve-tn.jpg',
    description: 'Deportivo V12 para mostrar la vista de detalle con precio, stock y color.'
  },
  {
    id: 4,
    make: 'Monster',
    model: 'Truck',
    category: 'Trucks',
    price: 150000,
    stock: 3,
    color: 'Purple',
    image: 'images/vehicles/monster.jpg',
    thumb: 'images/vehicles/monster-tn.jpg',
    description: 'Una maquina enorme para la categoria de camiones.'
  },
  {
    id: 5,
    make: 'Mechanic',
    model: 'Special',
    category: 'Used',
    price: 100,
    stock: 1,
    color: 'Rust',
    image: 'images/vehicles/ms.jpg',
    thumb: 'images/vehicles/ms-tn.jpg',
    description: 'Vehiculo usado para representar inventario economico o por reparar.'
  },
  {
    id: 10,
    make: 'Chevy',
    model: 'Camaro',
    category: 'Sports',
    price: 25000,
    stock: 10,
    color: 'Silver',
    image: 'images/vehicles/camaro.jpg',
    thumb: 'images/vehicles/camaro-tn.jpg',
    description: 'Un deportivo accesible que funciona muy bien como ejemplo visual.'
  },
  {
    id: 11,
    make: 'Cadillac',
    model: 'Escalade',
    category: 'SUV',
    price: 75195,
    stock: 4,
    color: 'Black',
    image: 'images/vehicles/escalade.jpg',
    thumb: 'images/vehicles/escalade-tn.jpg',
    description: 'SUV de lujo con presencia fuerte para el catalogo.'
  },
  {
    id: 13,
    make: 'Aerocar International',
    model: 'Aerocar',
    category: 'Classic',
    price: 1000000,
    stock: 1,
    color: 'Red',
    image: 'images/vehicles/aerocar.jpg',
    thumb: 'images/vehicles/aerocar-tn.jpg',
    description: 'Auto clasico convertible en avion, ideal para una pagina de detalle llamativa.'
  }
];

const reviews = [
  'So fast its almost like travelling in time. (4/5)',
  'Coolest ride on the road. (4/5)',
  'The admin inventory flow is useful for demonstrating CRUD with PHP and MySQL.'
];

const app = document.querySelector('#app');
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

function render() {
  const hash = window.location.hash || '#home';
  const [route, value] = hash.replace('#', '').split('/');

  setActive(route, value);
  nav.classList.remove('open');

  if (route === 'category') {
    renderCategory(decodeURIComponent(value || 'SUV'));
  } else if (route === 'vehicle') {
    renderVehicle(Number(value));
  } else if (route === 'account') {
    renderAccount();
  } else if (route === 'admin') {
    renderAdmin();
  } else {
    renderHome();
  }

  app.focus({ preventScroll: true });
}

function setActive(route, value) {
  document.querySelectorAll('.nav a').forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${route}/${value}` || href === `#${route}`);
  });
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <h1>Welcome to PHP Motors!</h1>
        <p><strong>DMC DeLorean</strong><br>3 Cup holders<br>Superman doors<br>Fuzzy dice!</p>
        <a class="button" href="#category/Sports">Own Today</a>
      </div>
      <img class="hero-image" src="images/delorean.jpg" alt="DMC DeLorean">
    </section>
    <section class="home-grid" aria-label="Contenido destacado">
      <div class="panel">
        <h2>DeLorean Upgrades</h2>
        <div class="upgrade-grid">
          ${upgrade('images/upgrades/flux-cap.png', 'Flux Capacitor')}
          ${upgrade('images/upgrades/flame.jpg', 'Flame Decals')}
          ${upgrade('images/upgrades/bumper_sticker.jpg', 'Bumper Stickers')}
          ${upgrade('images/upgrades/hub-cap.jpg', 'Hub Caps')}
        </div>
      </div>
      <div class="panel">
        <h2>DMC DeLorean Reviews</h2>
        <ul>${reviews.map((review) => `<li>${review}</li>`).join('')}</ul>
      </div>
    </section>
  `;
}

function upgrade(src, label) {
  return `
    <a class="upgrade" href="#category/Sports">
      <span class="upgrade-image"><img src="${src}" alt="${label}"></span>
      <span>${label}</span>
    </a>
  `;
}

function renderCategory(category) {
  const list = vehicles.filter((vehicle) => vehicle.category === category);
  app.innerHTML = `
    <h1 class="page-title">${category} Vehicles</h1>
    <p class="notice">Vista estatica del catalogo original. Las tarjetas permiten navegar al detalle de cada vehiculo.</p>
    <ul class="vehicle-grid">
      ${list.map(vehicleCard).join('')}
    </ul>
  `;
}

function vehicleCard(vehicle) {
  return `
    <li class="vehicle-card">
      <a href="#vehicle/${vehicle.id}"><img src="${vehicle.thumb}" alt="${vehicle.make} ${vehicle.model}"></a>
      <div class="vehicle-card-body">
        <h2><a href="#vehicle/${vehicle.id}">${vehicle.make} ${vehicle.model}</a></h2>
        <p class="price">${money(vehicle.price)}</p>
        <a class="card-link" href="#vehicle/${vehicle.id}">View Details</a>
      </div>
    </li>
  `;
}

function renderVehicle(id) {
  const vehicle = vehicles.find((item) => item.id === id) || vehicles[0];
  app.innerHTML = `
    <section class="detail">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
      <div>
        <h1 class="page-title">${vehicle.make} ${vehicle.model}</h1>
        <p class="price">${money(vehicle.price)}</p>
        <p>${vehicle.description}</p>
        <div class="meta">
          <span><strong>Classification:</strong> ${vehicle.category}</span>
          <span><strong>Color:</strong> ${vehicle.color}</span>
          <span><strong>Quantity in Stock:</strong> ${vehicle.stock}</span>
        </div>
        <h2>Customer Reviews</h2>
        <p class="notice">Para el demo de portafolio, esta zona simula la experiencia sin guardar informacion.</p>
        <form class="form-grid">
          <label for="review">Add your own review</label>
          <textarea id="review" placeholder="This is a visual demo."></textarea>
          <button type="button">Add Review</button>
        </form>
      </div>
    </section>
  `;
}

function renderAccount() {
  app.innerHTML = `
    <h1 class="page-title">Sign in</h1>
    <p class="notice">Pantalla navegable para mostrar el flujo de login. No requiere cuenta real.</p>
    <form class="form-grid">
      <label for="mail">Email</label>
      <input id="mail" type="email" value="demo.admin@phpmotors.test">
      <label for="pass">Password</label>
      <input id="pass" type="password" value="Portfolio1!">
      <a class="button" href="#admin">Login</a>
    </form>
    <p><a href="#account">Create a New Account</a></p>
  `;
}

function renderAdmin() {
  app.innerHTML = `
    <h1 class="page-title">Demo Admin</h1>
    <div class="admin-layout">
      <aside>
        <h2>Account</h2>
        <ul>
          <li>First Name: Demo</li>
          <li>Last Name: Admin</li>
          <li>Email: demo.admin@phpmotors.test</li>
        </ul>
        <p><a href="#account">Update account information</a></p>
      </aside>
      <section>
        <h2>Vehicle Management</h2>
        <p class="notice">Esta tabla replica la vista de administracion para que el visitante pueda navegar por el proyecto sin backend.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Vehicle Name</th><th>Action</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${vehicles.slice(0, 6).map((vehicle) => `
                <tr>
                  <td>${vehicle.make} ${vehicle.model}</td>
                  <td><a href="#vehicle/${vehicle.id}">Modify</a></td>
                  <td><a href="#vehicle/${vehicle.id}">Delete</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}
