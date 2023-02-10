# We love coffee

- Lugar de debate y aprendizaje para los amantes del café, imprescindible estar logeado para poder formar parte.

## Rutas

- GET /usuario/:id => Información usuario.
- POST /usuario => Registro de usuario(El usuario con id: 1, será el administrador).

- POST /login => Login usuario.

- GET / => Lista todos los temas a tratar.
- POST / => Permite crear un tema(admin)

- POST /:idTema/comentario => Crea un comentario en un tema(con 1 imagen opcional).
- DELETE /:idTema/comentario => Borra un comentario(usuario que lo creó / admin)

## Importante

- npm i => Para instalar las dependencias necesarias.
- Tener una base de datos creada con anterioridad para poder crear las tablas.
