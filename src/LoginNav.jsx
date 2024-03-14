import React from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import logo from "./assets/logoUV.png";

function LoginNav() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token");
    window.localStorage.removeItem("token");
    navigate("/"); // Redirige al usuario a la página principal
    window.location.reload();
  };

  return (
    <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
      <div className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <a href="/" className="text-black inline-flex items-center gap-3">
            <img src={logo} alt="UV Logo" className="w-10 h-13" />
            <span className="font-bold font-display">Agenda asesorias</span>
          </a>
        </div>
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
      </div>
    </div>
  );
}

export default LoginNav;
