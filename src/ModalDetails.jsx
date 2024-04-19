import React from "react";
import ModalConBotones from "./ModalConBotones";
import ModalNuevo from "./ModalNuevo";
import axios from "axios";
import API_URL from "./utils/Constantes";

function ModalDetails({
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
  onRequestClose,
  password,
  url,
  reunion_id,
  curso,
  handleReload,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");

  const aceptar = () => {
    eliminarAsesoria();
    setModalAbierto(false);
  };

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const handleCerrar = () => {
    setModalAbierto(false);
  };

  const eliminarAsesoria = async () => {
    console.log(idAsesoria);
    const token = localStorage.getItem("token");
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
        handleReload();
      } else {
        handlePopup("Error", response.data.mensaje);
      }
    } catch (error) {
      console.error("Error al eliminar el horario", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      onClick={onRequestClose}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-lg min-w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Modalidad: {tipo}
        </div>
        <p className="mt-2 text-gray-500">Tema: {tema}</p>
        <p className="mt-2 text-gray-500">Asesor: {asesor}</p>
        <p className="mt-2 text-gray-500">Fecha: {fecha}</p>
        <div className="border-2 text-center rounded-xl">
          <p className="mt-2 text-gray-500 p-0">Inicio: {horaInicio}</p>
          <p className="mt-2 text-gray-500">Fin: {horaFin}</p>
        </div>
        <p className="mt-2 text-gray-500">Dia: {dia}</p>
        <p className="mt-2 text-gray-500">Curso: {curso}</p>
        {password ? (
          <>
            <div className="text-center">
              <p className="text-lg">Datos para acceder a la reunion virtual</p>
            </div>
            <div className="text-left">
              <p>Contrasena: {password}</p>
              <p>URL:</p>
              <a href={url} className="text-blue-500">
                {url}
              </a>
              <p>ID de la reunion: {reunion_id}</p>
            </div>
          </>
        ) : (
          <></>
        )}
        <a href={link} className="text-blue-500">
          {link}
        </a>
        <button
          className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={abrirModal}
        >
          Cancelar
        </button>
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

export default ModalDetails;
