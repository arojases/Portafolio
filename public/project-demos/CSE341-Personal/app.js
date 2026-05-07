const examples = {
  'GET /users': {
    title: 'Listar usuarios',
    description: 'Devuelve todos los usuarios guardados en MongoDB.',
    method: 'GET',
    path: '/users',
    payload: `{
  "data": [
    {
      "_id": "65f1a4b70001",
      "firstName": "Ariel",
      "lastName": "Rojas",
      "email": "ariel@example.com",
      "birthday": "10/20/1990",
      "phone": "351876",
      "address": "205 N 500 W"
    }
  ]
}`,
  },
  'POST /users': {
    title: 'Crear usuario',
    description: 'Valida el cuerpo JSON y crea un nuevo usuario.',
    method: 'POST',
    path: '/users',
    payload: `{
  "firstName": "Ariel",
  "lastName": "Rojas",
  "email": "ariel@example.com",
  "birthday": "10/20/1990",
  "password": "admin",
  "phone": "351876",
  "address": "205 N 500 W"
}`,
  },
  'PUT /users/:id': {
    title: 'Actualizar usuario',
    description: 'Busca un usuario por id y actualiza sus datos.',
    method: 'PUT',
    path: '/users/:id',
    payload: `{
  "firstName": "Ariel",
  "lastName": "Rojas",
  "email": "new-email@example.com",
  "birthday": "10/20/1990",
  "password": "updated",
  "phone": "351876",
  "address": "205 N 500 W"
}`,
  },
  'DELETE /users/:id': {
    title: 'Eliminar usuario',
    description: 'Elimina un usuario existente por su ObjectId.',
    method: 'DELETE',
    path: '/users/:id',
    payload: `{
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}`,
  },
  'GET /tickets': {
    title: 'Listar tickets',
    description: 'Devuelve todos los tickets de viaje registrados.',
    method: 'GET',
    path: '/tickets',
    payload: `{
  "data": [
    {
      "_id": "65f1a4b70002",
      "origin": "Santiago",
      "destination": "Tokyo",
      "departure": "2026-06-12T00:00:00.000Z",
      "return": "2026-06-28T00:00:00.000Z"
    }
  ]
}`,
  },
  'GET /tickets/:id': {
    title: 'Ver detalle de ticket',
    description: 'Busca un ticket especifico por su id.',
    method: 'GET',
    path: '/tickets/:id',
    payload: `{
  "data": {
    "_id": "65f1a4b70002",
    "origin": "Santiago",
    "destination": "Tokyo",
    "departure": "2026-06-12T00:00:00.000Z",
    "return": "2026-06-28T00:00:00.000Z"
  }
}`,
  },
  'POST /tickets': {
    title: 'Crear ticket',
    description: 'Crea un ticket validando origen, destino, salida y regreso.',
    method: 'POST',
    path: '/tickets',
    payload: `{
  "origin": "Santiago",
  "destination": "Tokyo",
  "departure": "2026-06-12",
  "return": "2026-06-28"
}`,
  },
  'PUT /tickets/:id': {
    title: 'Actualizar ticket',
    description: 'Actualiza los datos de un ticket y devuelve la version nueva.',
    method: 'PUT',
    path: '/tickets/:id',
    payload: `{
  "_id": "65f1a4b70002",
  "origin": "Lima",
  "destination": "Madrid",
  "departure": "2026-08-21T00:00:00.000Z",
  "return": "2026-09-02T00:00:00.000Z"
}`,
  },
  'DELETE /tickets/:id': {
    title: 'Eliminar ticket',
    description: 'Elimina un ticket existente por su ObjectId.',
    method: 'DELETE',
    path: '/tickets/:id',
    payload: `{
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}`,
  },
};

const endpointButtons = document.querySelectorAll('.endpoint');
const title = document.querySelector('#endpointTitle');
const methodBadge = document.querySelector('#methodBadge');
const pathText = document.querySelector('#pathText');
const description = document.querySelector('#endpointDescription');
const payload = document.querySelector('#payload');

function renderEndpoint(key) {
  const detail = examples[key];

  if (!detail) {
    return;
  }

  title.textContent = detail.title;
  description.textContent = detail.description;
  methodBadge.textContent = detail.method;
  methodBadge.className = `method ${detail.method.toLowerCase()}`;
  pathText.textContent = detail.path;
  payload.textContent = detail.payload;
}

endpointButtons.forEach((button) => {
  button.addEventListener('click', () => {
    endpointButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderEndpoint(button.dataset.key);
  });
});

renderEndpoint('GET /users');
