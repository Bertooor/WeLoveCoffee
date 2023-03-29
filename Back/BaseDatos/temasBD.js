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

const borrarTemaBD = async (tema_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    await conexion.query(
      `
      DELETE
      FROM temas
      WHERE id = ?
    `,
      [tema_id]
    );
  } finally {
    if (conexion) conexion.release();
  }
};

const temaBD = async (tema_id) => {
  let conexion;

  try {
    conexion = await crearConexion();

    const tema = await conexion.query(
      `
      SELECT *
      FROM temas
      WHERE id = ?
    `,
      [tema_id]
    );

    return tema;
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  nuevoTemaBD,
  listaTemasBD,
  borrarTemaBD,
  temaBD,
};
