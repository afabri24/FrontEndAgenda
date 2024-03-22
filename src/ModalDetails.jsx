import React from "react";

function ModalDetails({ tipo, tema, fecha, asesor, alumno, horaInicio, horaFin, dia, modalidad, link }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{tipo}</div>
        <p className="mt-2 text-gray-500">{tema}</p>
        <p className="mt-2 text-gray-500">{asesor}</p>
        <p className='mt-2 text-gray-500'>{alumno}</p>
        <p className="mt-2 text-gray-500">{fecha}</p>
        <p className='mt-2 text-gray-500'>{horaInicio}</p>
        <p className='mt-2 text-gray-500'>{horaFin}</p>
        <p className='mt-2 text-gray-500'>{dia}</p>
        <p className='mt-2 text-gray-500'>{modalidad}</p>
        <a href={link} className="text-blue-500" >{link}</a>
      </div>
    </div>
  );
}

export default ModalDetails;