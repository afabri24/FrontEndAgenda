import React from 'react'
import Asesores from './Asesores'
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Asesores />
      <Link
        to="/registroAsesor"
        className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg"
      >
        Agregar Asesor +
      </Link>
    </div>
  )
}

export default Dashboard
