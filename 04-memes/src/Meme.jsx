/* eslint-disable react/prop-types */
const Meme = ({ data }) => {
  if (!data) {
    return <p>No hay memes disponibles</p>;
  }

  return data.map((element) => {
    return (
      <article className="flex justify-center" key={element.id}>
        <div className="bg-white flex-col flex p-5 w-96 gap-2 border border-3">
          <h1>{element.title}</h1>
          <p>{element.descripcion}</p>
          <img className="w-80 rounded-xl" src={element.img_url} alt="" />
          <p>👍{element.likes}</p>
          <p>Subido por: {element.user}</p>
        </div>
      </article>
    );
  });
};
export default Meme;
