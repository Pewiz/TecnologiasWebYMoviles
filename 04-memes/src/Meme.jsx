/* eslint-disable react/prop-types */
const Meme = ({ data }) => {
  if (!data) {
    return <p>No hay memes disponibles</p>;
  }

  return data.map((element) => {
    return (
      <article key={element.id}>
        <div className="bg-slate-500 mb-14 text-white flex-col gap-5 flex items-center p-5">
          <h1>{element.title}</h1>
          <p>{element.descripcion}</p>
          <img className="w-96" src={element.img_url} alt="" />
          <p>👍{element.likes}</p>
          <p>Subido por: {element.user}</p>
        </div>
      </article>
    );
  });
};
export default Meme;
