import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import logo from "./assets/logoUV.png";

function Navbar() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    console.log(token)
  },  []);

  const handleLogout = () => {
    cookies.remove("nombre");
    cookies.remove("tipo");
    window.localStorage.removeItem("token");
    navigate("/"); // Redirige al usuario a la página principal
    window.location.reload();
  };

  return (
    <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16 sticky top-0 z-10">
      <div className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          {token ? 
            <Link to="/asesorias" className="text-black inline-flex items-center gap-3">
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
           :
            <Link to="/" className="text-black inline-flex items-center gap-3">
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
          }
        </div>

        {token ? 
          <nav className="flex items-center justify-between flex-wrap  p-6">
          <span className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto">
            Bienvenido/a {cookies.get("nombre")}
          </span>
  
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <Link
              to="/perfil"
              className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-slate-300 rounded-lg"
            >
              Cerrar sesion
            </button>
          </div>
        </nav>
        :
        <nav className="flex items-center justify-between flex-wrap  p-6">
          <Link
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto"
            to="/#features"
          >
          ¿Que es?
          </Link>
          <Link
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
            to="/#pricing"
          >
            Conocenos
          </Link>

          <Link
            className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
            to="/faq"
          >
            Preguntas frecuentes
          </Link>

          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <Link
              to="/signup"
              className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline"
            >
              Registro
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
            >
              Iniciar sesión
            </Link>
          </div>
        </nav>
        }
        
      </div>
    </div>
  );
}

export default Navbar;
