const diaSemana = (fecha) =>
  ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][
    new Date(fecha).getUTCDay()
  ];

const dia = (fecha) => new Date(fecha).getUTCDate();

const mes = (fecha) =>
  [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ][new Date(fecha).getUTCMonth()];

const hora = (fecha) => new Date(fecha).getUTCHours();

const minuto = (fecha) => new Date(fecha).getUTCMinutes();

export const fechaPersonalizada = (fecha) => {
  return `${diaSemana(fecha)} ${dia(fecha)} ${mes(fecha)} ${hora(fecha)}:${
    minuto(fecha) >= 0 && minuto(fecha) <= 9 ? "0" : ""
  }${minuto(fecha)}`;
};
