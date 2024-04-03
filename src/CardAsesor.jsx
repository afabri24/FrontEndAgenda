import React, { useState } from 'react';
import ModalDetails from './ModalDetails';


function Card({ key, tipo, tema, fecha, asesor, alumno, horaInicio, horaFin, dia, modalidad,link }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`mx-4 bg-white rounded-xl shadow-md overflow-hidden md:w-64 m-3 border-blue-500`}
      onClick={handleClick}
    >
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Modalidad: {tipo}</div>
          <p className="mt-2 text-gray-500">Tema: {tema}</p>
          <p className="mt-2 text-gray-500">Asesor: {asesor}</p>
          <p className='mt-2 text-gray-500'>{alumno}</p>
          <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
          {isFlipped ? (
            <>
              <ModalDetails
                tipo={tipo}
                tema={tema}
                asesor={asesor}
                alumno={alumno}
                fecha={fecha}
                horaInicio={horaInicio}
                horaFin={horaFin}
                dia={dia}
                modalidad={modalidad}
                link={link}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;