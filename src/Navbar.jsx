import React, { useContext, useEffect, useState } from "react";
import ModalConBotones from "./ModalConBotones";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import logo from "./assets/logoUV.png";
import ModalDecision from "./components/ModalDecision";

function Navbar() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [modalAbierto, setModalAbierto] = React.useState(false);

  const handleCerrar = () => {
    setModalAbierto(false);
  };

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    console.log(token);
  }, []);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const handleLogout = () => {
    cookies.remove("nombre");
    cookies.remove("tipo");
    window.localStorage.removeItem("token");
    navigate("/"); // Redirige al usuario a la página principal
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto lg:px-16 top-0 z-10">
      <div className="relative flex w-full py-5 mx-auto bg-white items-end place-content-between md:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between lg:justify-start p-4">
          {token ? (
            <Link
              to="/asesorias"
              className="text-black inline-flex items-center gap-3"
            >
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
          ) : (
            <Link to="/" className="text-black inline-flex items-center gap-3">
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
          )}
        </div>

        {token ? (
          <nav className="flex place-items-end justify-between flex-row p-2 items-center h-full">
            <span className="px-2 lg:px-6 py-2 md:text-xl  md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto">
              Bienvenido/a {cookies.get("nombre")}
            </span>

            <div className="flex items-center gap-2 list-none lg:ml-auto">
              <Link
                to="/perfil"
                className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
              >
                Perfil
              </Link>
              <button
                onClick={abrirModal}
                className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-slate-300 rounded-lg w-auto"
              >
                Cerrar sesion
              </button>
            </div>
            <ModalDecision
              showModal={modalAbierto}
              onClose={handleCerrar}
              onAccept={handleLogout}
              title={"Confirmación"}
              message="¿Estás seguro de cerrar tu sesion?"
            />
          </nav>
        ) : (
          <nav className="flex place-items-end justify-between flex-row p-6">
            <div className={`${isOpen ? "" : "hidden"} lg:block`}>
              <a
                qonClick={toggleMenu}
                className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto"
                href="/#quees"
              >
                ¿Que es?
              </a>
              <a
                onClick={toggleMenu}
                className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
                href="/#conocenos"
              >
                Conocenos
              </a>

              <Link
                onClick={toggleMenu}
                className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
                to="/faq"
              >
                Preguntas frecuentes
              </Link>

              <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
                <Link
                  onClick={toggleMenu}
                  to="/signup"
                  className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
                >
                  Registro
                </Link>
                <Link
                  onClick={toggleMenu}
                  to="/login"
                  className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
            <button onClick={toggleMenu} className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            
            
          </nav>
        )}
      </div>
    </div>
  );
}

export default Navbar;
