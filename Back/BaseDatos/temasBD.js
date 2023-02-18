const { crearConexion } = require("./conexionBD");

const nuevoTemaBD = async (tema, imagen) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [nuevoTema] = await conexion.query(
      `
            INSERT INTO temas (tema, imagen)
            VALUES(?, ?)
        `,
      [tema, imagen]
    );

    return nuevoTema.insertId;
  } finally {
    if (conexion) conexion.release();
  }
};

const listaTemasBD = async () => {
  let conexion;

  try {
    conexion = await crearConexion();

    const [listaTemas] = await conexion.query(`
            SELECT *
            FROM temas
            ORDER BY fecha_creacion DESC
            
        `);

    return listaTemas;
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { nuevoTemaBD, listaTemasBD };
