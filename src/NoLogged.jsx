import React from 'react'
import logo from "./assets/logoUV.png";
import { Link } from 'react-router-dom';

function NoLogged() {
  return (
    <>
        <Link to="/" className="text-black inline-flex items-center gap-3">
            <img src={logo} alt="UV Logo" className="w-10 h-13" />
            <span className="font-bold font-display">Agenda asesorias</span>
          </Link>
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
    </>
  )
}

export default NoLogged