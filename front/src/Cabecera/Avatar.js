function Avatar({ imagen }) {
  return (
    <>
      {!imagen ? (
        <img
          className="avatarComentario"
          src="/avatar-removebg-preview.png"
          alt="imagen avatar por defecto"
        />
      ) : (
        <img
          className="avatarComentario"
          src={`${process.env.REACT_APP_API}/archivos/${imagen}`}
          alt="imagen usuario"
        />
      )}
    </>
  );
}

export default Avatar;
