import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from "./assets/logoUV.png";
import Cookies from 'universal-cookie';



function Logged({handleLogout}) {
  const cookies = new Cookies();


  return (
    <>
    <Link  to="/asesorias" className="text-black inline-flex items-center gap-3">
            <img src={logo} alt="UV Logo" className="w-10 h-13" />
            <span className="font-bold font-display">Agenda asesorias</span>
          </Link>
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
            onClick={(e)=>handleLogout}
            className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-slate-300 rounded-lg"
          >
            Cerrar sesion
          </button>
        </div>
      </nav> 
    </>

  )
}

export default Logged