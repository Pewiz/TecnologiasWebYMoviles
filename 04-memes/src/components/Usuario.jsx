import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Usuario = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useContext(AuthContext);

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
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="rounded-full w-60 h-60 object-cover mb-5 shadow-xl "
          src="https://res.cloudinary.com/doq82xcpd/image/upload/v1727659206/samples/animals/three-dogs.jpg"
          alt=""
        />
        <h2>Bienvenido, {user}</h2>
        <button className="font-bold" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  ) : null;
};

export default Usuario;
