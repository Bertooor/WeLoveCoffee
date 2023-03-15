const fs = require("fs/promises");
const path = require("path");
const cryptoRandomString = require("crypto-random-string");
const sgCorreo = require("@sendgrid/mail");

sgCorreo.setApiKey(process.env.SENDGRID_API_KEY);

const generaError = (mensaje, estado) => {
  const error = new Error(mensaje);
  error.httpStatus = estado;
  throw error;
};

const crearRuta = async (ruta) => {
  try {
    await fs.access(ruta);
  } catch {
    await fs.mkdir(ruta);
  }
};

const borrarImagen = async (imagen) => {
  const rutaImagen = path.join(__dirname, "/archivos", imagen);

  await fs.unlink(rutaImagen);
};

const generarCodigo = (numString) => {
  return cryptoRandomString(numString);
};

async function enviarCorreo({ to, subject, body }) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_CORREO,
      subject,
      text: body,
      html: `
        <div>
        <h1>${subject}</h1>
        <p>${body}</p>
        </div>
      `,
    };

    await sgCorreo.send(msg);
  } catch (error) {
    throw new Error("Error enviando correo");
  }
}

module.exports = {
  generaError,
  crearRuta,
  borrarImagen,
  generarCodigo,
  enviarCorreo,
};
