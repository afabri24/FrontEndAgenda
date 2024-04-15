import React, { useState } from "react";
import ModalDetails from "./ModalDetails";
import ModalConBotones from "./ModalConBotones"
import ModalNuevo from "./ModalNuevo";
import axios from 'axios'
import API_URL from "./utils/Constantes.js";

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
  password,
  url,
  reunion_id,
  funcion
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Agregar un estado para saber si se hizo clic en la tarjeta

  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => {setShowModal(false), funcion() };


  const aceptar = () => {
    eliminarAsesoria()
    setModalAbierto(false);
  };
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setIsClicked(true); // Actualizar isClicked a true cuando se hace clic en la tarjeta
  };

  const handleCerrar = () => {
    setIsClicked(false); // Actualizar isClicked a false cuando se cierra la tarjeta
  };

  const eliminarAsesoria = async () => {
    console.log(idAsesoria)
    const token = localStorage.getItem("token");
    if (window.confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      try {
        const response = await axios({
          method: "DELETE",
          url: API_URL + "api/asesorias/eliminar/",
          data: {
            id_asesoria: idAsesoria,
            token: token,
          },
        });
        if (!response.data.error) {
          handlePopup("Confirmacion", response.data.mensaje)
        } else {
          handlePopup("Error", response.data.mensaje)
        }

      } catch (error) {
        console.error("Error al eliminar el horario", error);
      }
    }
  };


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
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Modalidad: {tipo}
          </div>
          <p className="mt-2 text-gray-500">Tema: {tema}</p>
          <p className="mt-2 text-gray-500">Asesor: {asesor}</p>
          <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
          <button className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={abrirModal}>
            Eliminar
          </button>

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
                password={password}
                url={url}
                reunion_id={reunion_id}
                onRequestClose={handleClick}
                handleClose={handleClose}
              />
            </>
          ) : null}
        </div>
      </div>
      <ModalConBotones
        showModal={modalAbierto}
        onClose={handleCerrar}
        onAccept={aceptar}
        title={"Confirmación"}
        message="¿Estás seguro de eliminar la asesoria?"
      />
      <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
    </div>
  );
}

export default Card;
