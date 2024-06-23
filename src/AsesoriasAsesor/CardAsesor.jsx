import React, { useState } from "react";
import ModalDetails from "./ModalDetallesAsesor";

function Card({
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
  link,
  curso,
  estado,
  esCancelada,
  comentario,
  asistio,
  handleReload,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Agregar un estado para saber si se hizo clic en la tarjeta

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setIsClicked(true); // Actualizar isClicked a true cuando se hace clic en la tarjeta
  };

  const handleClose = () => {
    setIsClicked(false); // Actualizar isClicked a false cuando se cierra la tarjeta
  }

  return (
    <div
      className={`mx-4 bg-white rounded-xl shadow-md overflow-hidden md:w-64 m-3 border-blue-500 ${
        !isClicked &&
        "hover:transform hover:scale-105 transition-transform duration-200 ease-in-out"
      }`}
      onClick={handleClick}
    >
      <div className="md:flex">
        <div className="p-8">
        <div className="tracking-wide text-lg text-cyan-600 font-semibold">
            Tipo Asesoria: {tipo}
          </div>
          <p className="mt-2 text-gray-900 font-semibold">Tema: </p><p>{tema}</p>
          <p className="mt-2 text-gray-500">Alumno: {alumno}</p>
          <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
          <p className="mt-2 text-gray-500">Modalidad: {modalidad}</p>
          {isFlipped ? (
            <>
              <ModalDetails
                tipo={tipo}
                tema={tema}
                alumno={alumno}
                fecha={fecha}
                horaInicio={horaInicio}
                horaFin={horaFin}
                dia={dia}
                modalidad={modalidad}
                link={link}
                idAsesoria={idAsesoria}
                onRequestClose={handleClose}
                curso={curso}
                estado={estado}
                esCancelada={esCancelada}
                comentario={comentario}
                asistio={asistio}
                handleReload={handleReload}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
