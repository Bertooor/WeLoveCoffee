# We love coffee

- Espacio para amantes del café, donde compartir conocimientos sobre el tema en cuestión.

## Características

- El admin será el único que creará los temas a tratar. Además tendrá control absoluto para crear y eliminar contenido.
- Los usuarios no logueados unicamente podrán ver los temas a tratar. Para ver o crear contenido deberán estar logueados.
- Imágenes, una por comentario y una para el avatar. Aunque se podrán crear usuarios y comentarios sin imagen.

## Rutas

- GET /usuarios/:id => Información usuario(Admin o mismo usuario).
- GET /usuarios/validar/:codigoRegistro => Confirmar usuario activado.
- POST /usuarios => Registro de usuario(El usuario con id: 1, será el administrador).
- POST /usuarios/login => Login usuario.
- POST /usuarios/recuperaContrasena => Proporciona un código al usuario a través del correo, con el que puede cambiar la contraseña de acceso.
- POST /usuarios/nuevaContrasena => Permite cambiar de contraseña a través de un código.
- PUT /usuarios/:id => Edita usuario(Admin o mismo usuario).
- DELETE /usuarios/:id => Borra usuario(Admin o mismo usuario).

- GET / => Lista todos los temas a tratar.
- POST / => Permite crear un tema(solo admin).
- DELETE / => Borra un tema y todos sus comentarios(solo admin).

- GET /comentario/:comentario_id => Información sobre un comentario.
- GET /:tema_id/comentario => Lista de comentarios sobre un tema.
- POST /:tema_id/comentario => Crea un comentario en un tema(con 1 imagen opcional).
- DELETE /comentario/:comentario_id => Borra un comentario(usuario que lo creó / admin).
- GET /comentario/:comentario_id/votos => Cantidad de votos de un comentario.
- POST /comentario/:comentario_id/megusta => Emite votos positivos a los comentarios.
- POST /comentario/:comentario_id/nomegusta => Emite votos negativos a los comentarios.

## Base de datos

1. Ejecutar `npm install` desde el directorio 'Back' para instalar las dependencias necesarias.
2. Crear una base de datos en el equipo o servidor.
3. Ejecutar`node /BaseDatos/iniciarBD.js`desde el directorio 'Back' para crear las tablas automáticamente.
4. Crear archivo '.env' con las variables de entorno marcadas en el archivo '.env.example' del repositorio.
5. Arranca la base de datos con `ǹode server.js` o con `npm run dev`.
6. El admin también tiene que estar logueado para acceder.

## Frontend

1. Ejecutar `npm install` desde el directorio 'front' para instalar las dependencias necesarias.
2. Crear archivo '.env' con las variables de entorno marcadas en el archivo '.env.example' del repositorio.
3. Arranca la aplicación con `npm start`.
4. Si quieres subir la aplicacíón a un servidor que no sea local debes crear la carpeta 'build' con `npm run build`, que nos creará un directorio con toda la aplicación compilada.
