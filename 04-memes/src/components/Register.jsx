import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { registrar } from "../services/memes";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    const [response, error] = await registrar(
      userRef.current.value,
      passwordRef.current.value
    );
    if (error) {
      // setMessage(error);
      console.log(error);
    } else {
      //setMessage("Se registró correctamente");
      console.log("Usuario:", response);
      navigate("/login"); // Redirige a la página de login después del registro
    }
  };

  return (
    <>
      <img
        className="absolute  right-0 w-[98%] object-cover overflow-hidden top-[-56px]"
        src="https://static.cdninstagram.com/rsrc.php/y0/r/THmkXhzz2_a.avif"
        alt=""
      />
      <div className="absolute left-16 right-0 top-0  p-5 h-full ">
        <div className="flex flex-col justify-center items-center h-full gap-8">
          <div className="  h-[600px] w-[500px] rounded-3xl p-14 flex flex-col gap-5 justify-center text-center items-center">
            <h2 className="text-2xl font-bold  mb-9">Registrarse</h2>
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5] "
              type="text"
              placeholder="Usuario"
              ref={userRef}
            />
            <input
              className="rounded-lg p-2 w-72 bg-[#F5F5F5] "
              type="password"
              placeholder="Contraseña"
              ref={passwordRef}
            />
            <button
              className="m-6 bg-black p-5 rounded-full text-white text-xl w-56"
              onClick={handleRegister}
            >
              Registrarse
            </button>
          </div>
          <div className="flex gap-2 ">
            <p>Ya tienes cuenta?</p>
            <Link to="/login">
              <button className=" font-bold ">Iniciar sesion</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
