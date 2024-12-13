import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Meme from "./components/Meme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Navegacion from "./components/Navegacion";
import Login from "./components/Login";
import Register from "./components/Register";
import Usuario from "./components/Usuario";
import SubirMeme from "./components/SubirMeme";

function App() {
  const [data, setData] = useState([]);
  const urlBase = "https://memes-api.grye.org";
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    const url = `${urlBase}/memes/?sort_by=${sortBy}&page=1&limit=10`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error al obtener memes: ", err));
  }, [sortBy]);

  const actualizarLike = async (token, memeId) => {
    try {
      if (!token) {
        return [null, "Debes iniciar sesión para dar like a un meme."];
      }

      const url = `${urlBase}/memes/${memeId}`;

      const respuesta = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: true }),
      });

      if (!respuesta.ok) {
        return [null, "Error al dar like"];
      }

      // Hacer un nuevo fetch de los datos de los memes
      const urlMemes = `${urlBase}/memes/?sort_by=${sortBy}&page=1&limit=10`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      const responseMemes = await fetch(urlMemes, options);
      const newData = await responseMemes.json();

      return [newData, null]; // Devolver los datos actualizados
    } catch (error) {
      return [null, error.message || "Error al dar like"];
    }
  };

  function SortSelector({ setSortBy }) {
    return (
      <div className="flex flex-col justify-center gap-4 ml-10  mt-8 h-20 fixed">
        <button className="p-2 " onClick={() => setSortBy("top")}>
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            style={{ color: "#000000" }}
          />
        </button>
        <button className="p-2 " onClick={() => setSortBy("new")}>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            size="xl"
            style={{ color: "#000000" }}
          />
        </button>
      </div>
    );
  }

  function Memes({ data, actualizarLike }) {
    return (
      <div className="absolute top-0 p-5 bg-gray-50 left-16 right-0 ">
        <div>
          <Meme data={data} actualizarLike={actualizarLike} />
          <div className="absolute right-48 z-20 top-20">
            <SortSelector setSortBy={setSortBy} />
          </div>
        </div>
      </div>
    );
  }

  const handleUpdateMemes = (newData) => {
    setData(newData); // Actualiza los memes en el estado
  };

  return (
    <AuthProvider>
      <Router>
        <Navegacion />
        <Routes>
          <Route
            path="/"
            element={<Memes data={data} actualizarLike={actualizarLike} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<Usuario />} />
          <Route
            path="/upload"
            element={<SubirMeme onMemesUpdated={handleUpdateMemes} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
