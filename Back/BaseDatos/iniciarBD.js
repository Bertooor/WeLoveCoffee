require("dotenv").config();

const { crearConexion } = require("./conexionBD");

async function main() {
  let conexion;

  try {
    conexion = await crearConexion();

    console.log("Borrando las tablas existentes...");

    await conexion.query(`
        DROP TABLE IF EXISTS comentarios
    `);
    await conexion.query(`
        DROP TABLE IF EXISTS temas
    `);
    await conexion.query(`
        DROP TABLE IF EXISTS usuarios
    `);

    console.log("Creando tablas...");

    await conexion.query(`
        CREATE TABLE usuarios (
            id INT PRIMARY KEY AUTO_INCREMENT,
            avatar VARCHAR(100) UNIQUE NOT NULL,
            correo VARCHAR(100) UNIQUE NOT NULL,
            contrasena VARCHAR(512) NOT NULL,
            rol ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            codigoRegistro VARCHAR(100),
            usuarioActivo BOOLEAN DEFAULT false,
            codigoRecuperacion VARCHAR(100),
            borrado BOOLEAN DEFAULT false
        )
    `);

    await conexion.query(`
        CREATE TABLE temas (
            id INT PRIMARY KEY AUTO_INCREMENT,
            tema VARCHAR(100) UNIQUE NOT NULL,
            imagen VARCHAR(150)
        )
    `);

    await conexion.query(`
        CREATE TABLE comentarios (
            id INT PRIMARY KEY AUTO_INCREMENT,
            usuario_id INT NOT NULL,
            tema_id INT NOT NULL,
            texto VARCHAR(1000) NOT NULL,
            imagen VARCHAR(150),
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (tema_id) REFERENCES temas(id)
        )
    `);

    console.log("Creo usuario admin...");

    await conexion.query(`
      INSERT INTO usuarios (fecha_creacion, correo, contrasena, avatar, usuarioActivo, rol)
      VALUES(
        CURRENT_TIMESTAMP,
        '${process.env.CORREO_ADMIN}',
        SHA2('${process.env.ADMIN_PASSWORD}', 512),
        '${process.env.AVATAR_ADMIN}',
        true,
        'admin'
      )
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (conexion) conexion.release();
    process.exit();
  }
}

main();
