import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Meme from "./Meme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

function App() {
  const [data, setData] = useState([]);
  const userRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useState(""); // Para mensajes de éxito o error
  const urlBase = "https://memes-api.grye.org";

  useEffect(() => {
    const url = `${urlBase}/memes/?sort_by=new&page=1&limit=10`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error: " + err));
  }, []);

  const autenticar = async (usuario, contraceña) => {
    try {
      const respuesta = await fetch(`${urlBase}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: new URLSearchParams({
          username: usuario,
          password: contraceña,
        }).toString(),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  const registrar = async (usuario, contraceña) => {
    try {
      const respuesta = await fetch(`${urlBase}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: new URLSearchParams({
          username: usuario,
          password: contraceña,
        }).toString(),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        return [null, "Error al registrar usuario"];
      }

      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  const handleLogin = async () => {
    const [response, error] = await autenticar(
      userRef.current.value,
      passwordRef.current.value
    );
    if (error) {
      setMessage(error);
    } else {
      setMessage("Inicio secion correctamente");
      console.log("Token:", response.access_token);
    }
  };

  const handleRegister = async () => {
    const [response, error] = await registrar(
      userRef.current.value,
      passwordRef.current.value
    );
    if (error) {
      setMessage(error);
    } else {
      setMessage("Se registro correctamente");
      console.log("Usuario:", response);
    }
  };

  function Home() {
    return (
      <div className="absolute left-32 right-0 top-0 p-5 bg-slate-50 h-screen">
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" ref={userRef} />
        <input type="password" placeholder="Contraseña" ref={passwordRef} />
        <button className="m-6" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <button onClick={handleRegister}>Registrar</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  function Memes() {
    return (
      <div className="absolute  top-0 p-5 bg-gray-50 left-32 right-0">
      <Meme data={data}  />
      </div>
    )
  }

  return (
    <Router>
      <img src="./assets/Threads-Logo" alt="" />
      <div className="flex flex-col bg-white w-32 justify-center h-screen gap-10 items-center fixed ">
        <Link to="/">Home</Link>
        <Link to="/memes">Memes</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memes" element={<Memes />} />
      </Routes>
    </Router>
  );
}

export default App;
