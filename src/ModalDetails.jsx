import React from "react";

function ModalDetails({ tipo, tema, fecha, asesor, alumno, horaInicio, horaFin, dia, modalidad, link, onRequestClose, password, url, reunion_id }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" onClick={onRequestClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-lg min-w-80" onClick={(e) => e.stopPropagation()}>
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Modalidad: {tipo}</div>
        <p className="mt-2 text-gray-500">Tema: {tema}</p>
        <p className="mt-2 text-gray-500">Asesor: {asesor}</p>
        <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
        <div className="border-2 text-center rounded-xl">
          <p className="mt-2 text-gray-500 p-0">Inicio: {horaInicio}</p>
        </div>
        
        <p className='mt-2 text-gray-500'>Fin: {horaFin}</p>
        <p className='mt-2 text-gray-500'>Dia: {dia}</p>
        {password ? (
          <>
          <div className="text-center">
            <p className="text-lg">Datos para acceder a la reunion virtual</p>
          </div>
            <div className="text-left">
              <p >Contrasena: {password}</p>
              <p >URL:</p>
              <a href={url} className="text-blue-500">{url}</a>
              <p >ID de la reunion: {reunion_id}</p>
            </div>
          </>
        ): <></>}
        <a href={link} className="text-blue-500" >{link}</a>
      </div>
    </div>
  );
}

export default ModalDetails;