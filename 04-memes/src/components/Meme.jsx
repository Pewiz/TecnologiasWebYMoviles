/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Meme = ({ data, actualizarLike }) => {
  const { token } = useContext(AuthContext);
  const [memes, setMemes] = useState(data);

  const handleLike = async (id) => {
    const [newData, error] = await actualizarLike(token, id);
    if (error) {
      console.error(error);
      console.log("no pasa");
    } else {
      console.log(newData);
      // Actualizar el estado con los nuevos datos
      setMemes(newData);
    }
  };

  if (!memes || memes.length === 0) {
    return <p>No hay memes disponibles</p>;
  }

  const mapeoMeme = memes.map((element) => (
    <article className="flex justify-center mb-5" key={element.id}>
      <div className="bg-white flex-col flex p-5  w-[500px] gap-2 border shadow-sm border-b-0 rounded-3xl">
        <h3 className="font-bold">{element.user}</h3>
        <h1 className="italic text-sm w-[450px]">{element.title}</h1>
        <p className="text-sm w-[450px] ">{element.description}</p>
        <div className="flex justify-center ">
          <img className="w-96 rounded-xl" src={element.img_url} alt="" />
        </div>
        <div className="flex gap-1">
          <button onClick={() => handleLike(element._id)}>
            <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} />
          </button>
          <h5>{element.likes}</h5>
        </div>
      </div>
    </article>
  ));

  return (
    <>
      <div className="fixed left-16 bg-gray-50 w-[95%] z-10 top-0 text-center h-16 mb-10">
        <h1 className=" text-lg leading-loose ">Home</h1>
      </div>
      <div className="mt-16">{mapeoMeme}</div>
    </>
  );
};

export default Meme;
