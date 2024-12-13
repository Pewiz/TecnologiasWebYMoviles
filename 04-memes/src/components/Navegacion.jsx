import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
const Navegacion = () => {
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
      <Link to="/" onClick={() => setPathActual("/")}>
        <img
          src="https://res.cloudinary.com/doq82xcpd/image/upload/v1733983731/Threads__app__logo.svg_q9uc8m.png"
          alt=""
          className="w-10 mt-10"
        />
      </Link>
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
};

export default Navegacion;
