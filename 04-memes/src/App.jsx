import { useState, useEffect, useRef, useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Meme from "./Meme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState([]);
  const userRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useState("");
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
      const urlMemes = `${urlBase}/memes/?sort_by=new&page=1&limit=10`;
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

  const subirMeme = async (token, titulo, descripcion, imagen) => {
    try {
      if (!token) {
        return [null, "Debes iniciar sesión para subir un meme."];
      }

      const url = `${urlBase}/memes/?title=${encodeURIComponent(
        titulo
      )}&description=${encodeURIComponent(descripcion)}`;

      const dataFormulario = new FormData();
      dataFormulario.append("file", imagen);

      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: dataFormulario,
      });

      if (!respuesta.ok) {
        return [null, "Error al subir meme"];
      }
      const urlMemes = `${urlBase}/memes/?sort_by=new&page=1&limit=10`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      const responseMemes = await fetch(urlMemes, options);
      const newData = await responseMemes.json();

      return [newData, null]; // Devolver los datos actualizados
    } catch (error) {
      return [null, error.message || "Error al subir meme"];
    }
  };

  function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
      const [response, error] = await autenticar(
        userRef.current.value,
        passwordRef.current.value
      );
      if (error) {
        setMessage(error);
      } else {
        setMessage("Inicio sesión correctamente");
        login(response.access_token); // Actualizar el token de autenticación
        navigate("/user");
        console.log(response.access_token);
      }
    };

    return (
      <div className="absolute left-16 right-0 top-0 p-5 bg-slate-50 h-screen">
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" ref={userRef} />
        <input type="password" placeholder="Contraseña" ref={passwordRef} />
        <button className="m-6" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
        {message && <p>{message}</p>}
      </div>
    );
  }

  function Register() {
    const navigate = useNavigate();

    const handleRegister = async () => {
      const [response, error] = await registrar(
        userRef.current.value,
        passwordRef.current.value
      );
      if (error) {
        setMessage(error);
      } else {
        setMessage("Se registró correctamente");
        console.log("Usuario:", response);
        navigate("/login"); // Redirige a la página de login después del registro
      }
    };

    return (
      <div className="absolute left-16 right-0 top-0 p-5 bg-slate-50 h-screen">
        <h2>Registrar</h2>
        <input type="text" placeholder="Usuario" ref={userRef} />
        <input type="password" placeholder="Contraseña" ref={passwordRef} />
        <button className="m-6" onClick={handleRegister}>
          Registrar
        </button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  function Usuario() {
    const { token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);

    const handleLogout = () => {
      logout();
      navigate("/login");
    };

    return token ? (
      <div className="absolute left-16 right-0 top-0 p-5 bg-slate-50 h-screen">
        <h2>Bienvenido, {user}</h2>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    ) : null;
  }

  function SubirMeme({ onMemesUpdated }) {
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
        console.log(response);
        if (onMemesUpdated) {
          onMemesUpdated(response); // Actualiza los memes en el estado principal
        }
        navigate("/");
      }
    };

    return (
      <div className="absolute left-16 right-0 top-0 p-5 bg-slate-50 h-screen">
        <h2>Subir Meme</h2>
        <input type="text" placeholder="Título" ref={tituloRef} />
        <input type="text" placeholder="Descripción" ref={descripcionRef} />
        <input type="file" ref={imagenRef} />
        <button className="m-6" onClick={handleUpload}>
          Subir Meme
        </button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  function Memes({ data, actualizarLike }) {
    return (
      <div className="absolute top-0 p-5 bg-gray-50 left-16 right-0 ">
        <Meme data={data} actualizarLike={actualizarLike} />
      </div>
    );
  }

  const handleUpdateMemes = (newData) => {
    setData(newData); // Actualiza los memes en el estado
  };

  function Navegacion() {
    const [pathActual, setPathActual] = useState(window.location.pathname);

    useEffect(() => {
      const handlePopState = () => {
        setPathActual(window.location.pathname);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    return (
      <div className="flex flex-col items-center fixed w-16 bg-gray-50">
        <img
          src="https://res.cloudinary.com/doq82xcpd/image/upload/v1733983731/Threads__app__logo.svg_q9uc8m.png"
          alt=""
          className="w-10 mt-10"
        />
        <div className="flex flex-col justify-center h-screen gap-10 items-center  ">
          <Link to="/" onClick={() => setPathActual("/")}>
            <FontAwesomeIcon
              icon={faHouse}
              size="xl"
              style={{ color: pathActual === "/" ? "#000000" : "#bababa" }}
            />
          </Link>
          <Link to="/upload" onClick={() => setPathActual("/upload")}>
            <FontAwesomeIcon
              icon={faPlus}
              size="xl"
              style={{
                color: pathActual === "/upload" ? "#000000" : "#bababa",
              }}
            />
          </Link>
          <Link to="/user" onClick={() => setPathActual("/user")}>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              style={{ color: pathActual === "/user" ? "#000000" : "#bababa" }}
            />
          </Link>
        </div>
      </div>
    );
  }
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
