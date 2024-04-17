import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import logo from "./assets/logoUV.png";

import { navBarContext } from "./utils/ContextNavbar";

function Navbar() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(navBarContext);


  const handleLogout = () => {
    cookies.remove("nombre");
    cookies.remove("tipo");
    setIsLogged("logged")
    window.localStorage.removeItem("token");
    navigate("/"); // Redirige al usuario a la página principal
    window.location.reload();
    console.log(isLogged)
  };

  return (
    <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
      <div className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          {isLogged ? 
          <a href="/" className="text-black inline-flex items-center gap-3">
            <img src={logo} alt="UV Logo" className="w-10 h-13" />
            <span className="font-bold font-display">Agenda asesorias</span>
          </a> :

          <a href="/asesorias" className="text-black inline-flex items-center gap-3">
            <img src={logo} alt="UV Logo" className="w-10 h-13" />
            <span className="font-bold font-display">Agenda asesorias</span>
          </a>
          }
        </div>

        {isLogged ? 
          <nav className="flex items-center justify-between flex-wrap  p-6">
          <a
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto"
            href="/#features"
          >
            ¿Que es?
          </a>
          <a
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
            href="/#pricing"
          >
            Conocenos
          </a>

          <a
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
            href="/faq"
          >
            Preguntas frecuentes
          </a>

          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <a
              href="/signup"
              className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline"
            >
              Registro
            </a>
            <a
              href="/login"
              className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
            >
              Iniciar sesión
            </a>
          </div>
        </nav>

        :
        <nav className="flex items-center justify-between flex-wrap  p-6">
        <span className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto">
          Bienvenido/a {cookies.get("nombre")}
        </span>

        <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
          <a
            href="/perfil"
            className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          >
            Perfil
          </a>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-slate-300 rounded-lg"
          >
            Cerrar sesion
          </button>
        </div>
      </nav> 
        }
        
      </div>
    </div>
  );
}

export default Navbar;
