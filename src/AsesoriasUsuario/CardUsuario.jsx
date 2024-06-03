import React, { useState } from "react";
import ModalDetallesUsuario from "./ModalDetallesUsuario";

function CardActual({
  key,
  idAsesoria,
  tipo,
  tema,
  fecha,
  asesor,
  alumno,
  horaInicio,
  horaFin,
  dia,
  modalidad,
  password,
  url,
  reunion_id,
  curso,
  funcion,
  handleReload,
  estado,
  esCancelada,
  color
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setIsClicked(true); // Actualizar isClicked a true cuando se hace clic en la tarjeta
  };


  const handleClose = () => {
    setIsFlipped(false);
    setIsClicked(false);
  }


  return (
    <div
      className={`mx-4 bg-white rounded-xl shadow-md overflow-hidden lg:w-72 max-w-72 m-3 border-slate-100 border-2 ${
        !isClicked &&
        "hover:transform hover:scale-105 transition-transform duration-200 ease-in-out"
      }`}
      onClick={handleClick}
    >
      <div className="md:flex">
        <div className="p-8">
          <div className="flex flex-row tracking-wide text-lg text-cyan-600 font-semibold">
            {tipo}
            <span
                    style={{
                      display: 'inline-block',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      marginLeft: '20px',
                    }}
                  />
          </div>
          <p className="mt-2 text-gray-900 font-semibold">Tema: </p><p>{tema}</p>
          <p className="mt-2 text-gray-500">Asesor: {asesor}</p>
          <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
          <p className="mt-2 text-gray-500">Modalidad: {modalidad}</p>
          {isFlipped ? (
            <>
              <ModalDetallesUsuario
                tipo={tipo}
                tema={tema}
                asesor={asesor}
                alumno={alumno}
                fecha={fecha}
                horaInicio={horaInicio}
                horaFin={horaFin}
                dia={dia}
                modalidad={modalidad}
                password={password}
                url={url}
                reunion_id={reunion_id}
                onRequestClose={handleClick}
                handleClose={handleClose}
                idAsesoria={idAsesoria}
                curso={curso}
                handleReload={handleReload}
                estado={estado}
                esCancelada={esCancelada}
              />
            </>
          ) : null}
        </div>
      </div>
      
    </div>
  );
}

export default CardActual;
