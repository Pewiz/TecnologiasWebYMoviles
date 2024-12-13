import { useRef, useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { subirMeme } from "../services/memes";

const SubirMeme = ({ onMemesUpdated }) => {
  const [message, setMessage] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const tituloRef = useRef("");
  const descripcionRef = useRef("");
  const imagenRef = useRef("");

  const handleUpload = async () => {
    const [response, error] = await subirMeme(
      token,
      tituloRef.current.value,
      descripcionRef.current.value,
      imagenRef.current.files[0]
    );

    if (error) {
      setMessage(error);
    } else {
      setMessage("Meme subido correctamente");
      if (onMemesUpdated) {
        onMemesUpdated(response); // Actualiza los memes en el estado principal
      }
      navigate("/");
    }
  };

  return (
    <>
      <img
        className=" w-full object-cover h-full absolute z-[-1]"
        src="https://res.cloudinary.com/doq82xcpd/image/upload/v1734030711/ll6i7sq0pc8neetax59s.png"
        alt=""
      />
      <div className="absolute left-16 right-0 top-0  p-5 h-full ">
        <div className="flex flex-col justify-center items-center h-full gap-8">
          <div className="  h-[600px] w-[500px] rounded-3xl p-14 flex flex-col gap-5 justify-center text-center items-center">
            <h2 className="text-2xl font-bold  mb-9">Subir Meme</h2>
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5] "
              type="text"
              placeholder="Titulo"
              ref={tituloRef}
            />
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5] "
              type="text"
              placeholder="Descripción"
              ref={descripcionRef}
            />
            <input type="file" ref={imagenRef} />
            <button
              className="m-6 bg-black p-5 rounded-full text-white text-xl w-56"
              onClick={handleUpload}
            >
              Subir
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubirMeme;
