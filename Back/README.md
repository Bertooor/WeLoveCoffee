# We love coffee

- Lugar de debate y aprendizaje para los amantes del café, imprescindible estar logeado para poder formar parte.

## Rutas

- GET /usuarios/:id => Información usuario(Admin o mismo usuario).
- GET /usuarios/validar/:codigoRegistro => Confirmar usuario activado.
- POST /usuarios => Registro de usuario(El usuario con id: 1, será el administrador).
- POST /usuarios/login => Login usuario.
- POST /usuarios/recuperaContrasena => Proporciona un código al usuario a través del correo, con el que puede cambiar la contraseña de acceso.
- POST /usuarios/nuevaContrasena => Permite cambiar de contraseña a través de un código.
- PUT /usuarios/:id => Edita usuario(Admin o mismo usuario).
- DELETE /usuarios/imagen/:id => Borra imagen avatar(Admin o mismo usuario).
- DELETE /usuarios/:id => Borra usuario(Admin o mismo usuario).

- GET / => Lista todos los temas a tratar.
- POST / => Permite crear un tema(solo admin).
- DELETE / => Borra un tema y todos sus comentarios(solo admin).

- GET /comentario/:comentario_id => Información sobre un comentario.
- GET /:tema_id/comentario => Lista de comentarios sobre un tema.
- POST /:tema_id/comentario => Crea un comentario en un tema(con 1 imagen opcional).
- DELETE /comentario/:comentario_id => Borra un comentario(usuario que lo creó / admin).

## Importante

- npm i => Para instalar las dependencias necesarias.
- Tener una base de datos creada con anterioridad para poder crear las tablas.
- El admin también tiene que estar logueado para acceder.
- Colocar el middleware de autorizacionUsuario antes de esAdmin para mayor seguridad.
