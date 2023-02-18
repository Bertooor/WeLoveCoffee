# We love coffee

- Lugar de debate y aprendizaje para los amantes del café, imprescindible estar logeado para poder formar parte.

## Rutas

- GET /usuarios/:id => Información usuario.
- POST /usuarios => Registro de usuario(El usuario con id: 1, será el administrador).
- POST /usuarios/login => Login usuario.

- GET / => Lista todos los temas a tratar.
- POST / => Permite crear un tema(admin).

- GET /comentario/:comentario_id => Información sobre un comentario.
- GET /:tema_id/comentario => Lista de comentarios sobre un tema.
- POST /:tema_id/comentario => Crea un comentario en un tema(con 1 imagen opcional).
- DELETE /comentario/:comentario_id => Borra un comentario(usuario que lo creó / admin).

## Importante

- npm i => Para instalar las dependencias necesarias.
- Tener una base de datos creada con anterioridad para poder crear las tablas.
- El admin también tiene que estar logueado para acceder.
- Colocar el middleware de autorizacionUsuario antes de esAdmin para mayor seguridad.
