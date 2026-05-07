const examples = {
  'GET /contacts': {
    title: 'Listar contactos',
    description: 'Devuelve todos los contactos guardados en MongoDB.',
    payload: `[
  {
    "firstName": "Pedro",
    "lastName": "Herrera",
    "email": "pedro@example.com",
    "favoriteColor": "blue",
    "birthday": "10/20/1990"
  }
]`,
  },
  'GET /contacts/{id}': {
    title: 'Obtener contacto',
    description: 'Busca un contacto por su ObjectId de MongoDB.',
    payload: `{
  "firstName": "Pedro",
  "lastName": "Herrera",
  "email": "pedro@example.com",
  "favoriteColor": "blue",
  "birthday": "10/20/1990"
}`,
  },
  'POST /contacts': {
    title: 'Crear contacto',
    description: 'Crea un registro nuevo usando un cuerpo JSON.',
    payload: `{
  "firstName": "Pedro",
  "lastName": "Herrera",
  "email": "pedro@example.com",
  "favoriteColor": "blue",
  "birthday": "10/20/1990"
}`,
  },
  'PUT /contacts/{id}': {
    title: 'Actualizar contacto',
    description: 'Actualiza un contacto existente por id.',
    payload: `{
  "firstName": "Pedro",
  "lastName": "Herrera",
  "email": "pedro@example.com",
  "favoriteColor": "red",
  "birthday": "10/20/1990"
}`,
  },
  'DELETE /contacts/{id}': {
    title: 'Eliminar contacto',
    description: 'Elimina un contacto existente por id y responde sin contenido.',
    payload: `HTTP 204 No Content`,
  },
};

const endpointButtons = document.querySelectorAll('.endpoint');
const title = document.querySelector('#endpointTitle');
const methodBadge = document.querySelector('#methodBadge');
const pathText = document.querySelector('#pathText');
const description = document.querySelector('#description');
const payload = document.querySelector('#payload');

endpointButtons.forEach((button) => {
  button.addEventListener('click', () => {
    endpointButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const method = button.dataset.method;
    const path = button.dataset.path;
    const key = `${method} ${path}`;
    const detail = examples[key];

    title.textContent = detail.title;
    methodBadge.textContent = method;
    methodBadge.className = `method ${method.toLowerCase()}`;
    pathText.textContent = path;
    description.textContent = detail.description;
    payload.textContent = detail.payload;
  });
});
