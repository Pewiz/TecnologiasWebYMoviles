import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { autenticar } from "../services/memes";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef("");
  const passwordRef = useRef("");
  //const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const [response, error] = await autenticar(
      userRef.current.value,
      passwordRef.current.value
    );
    if (error) {
      //setMessage(error);
      console.log(error);
    } else {
      //setMessage("Inicio sesión correctamente");
      login(response.access_token); // Actualizar el token de autenticación
      navigate("/user");
      console.log(response.access_token);
    }
  };

  return (
    <>
      <img
        className="absolute  right-0 w-[98%] object-cover overflow-hidden top-[-56px] "
        src="https://static.cdninstagram.com/rsrc.php/y0/r/THmkXhzz2_a.avif"
        alt=""
      />
      <div className="absolute left-16 right-0 top-0 p-5 h-full ">
        <div className="flex flex-col justify-center items-center h-full gap-8">
          <div className="  h-[600px] w-[500px] rounded-3xl p-14 flex flex-col gap-5 justify-center text-center items-center">
            <h2 className="text-2xl font-bold  mb-9">Iniciar Sesión</h2>
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5] "
              type="text"
              placeholder="Usuario"
              ref={userRef}
            />
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5]"
              type="password"
              placeholder="Contraseña"
              ref={passwordRef}
            />
            <button
              className="m-6 bg-black p-5 rounded-full text-white text-xl w-56"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="flex gap-2 ">
            <p>Nuevo?</p>
            <Link to="/register">
              <button className=" font-bold ">Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
