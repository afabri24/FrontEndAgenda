import React from "react";
import ModalConBotones from "../ModalConBotones";
import ModalNuevo from "../ModalNuevo";
import axios from "axios";
import { API_URL } from "../utils/Constantes";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function ModalDetails({
  idAsesoria,
  tipo,
  tema,
  fecha,
  alumno,
  horaInicio,
  horaFin,
  dia,
  modalidad,
  link,
  onRequestClose,
  curso,
  handleReload,
  estado,
  esCancelada,
  comentario,
  asistio,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [modalTittle, setModalTittle] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");
  const [asistencia, setAsistencia] = React.useState(asistio);

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

  const onChangeRadioButtons = (event) => {
    console.log(asistencia)
    console.log(asistio)
    console.log(event.target.value);
    if (event.target.value === "asistio") {
      marcarAsistencia(1);
    } else {
      marcarAsistencia(2);
    }
  }

  const marcarAsistencia = async (asistio) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "PUT",
        url: API_URL + "api/asesorias/marcarAsistencia/",
        data: {
          id_asesoria: idAsesoria,
          asistio: asistio,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data.error) {
        console.log(response.data);
      } else {
        handlePopup("Error", response.data.mensaje);
      }
    } catch (error) {
      console.error("Error al marcar la asistencia", error);
    }
  };


  const eliminarAsesoria = async () => {
    console.log(idAsesoria);
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "DELETE",
        url: API_URL + "api/asesorias/cancelarAsAsesor/",
        data: {
          id_asesoria: idAsesoria,
        },
        headers: {
          Authorization: `Bearer ${token}`,
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
        <div className="tracking-wide text-xl text-cyan-600 font-semibold w-auto">
          Tipo de asesoria: {tipo}
        </div>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Tema: </a>
        <a className="mt-2 text-gray-600">{tema}</a>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Alumno: </a>
        <a className="mt-2 text-gray-600">{alumno}</a>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Fecha: </a>
        <a className="mt-2 text-gray-600">{fecha}</a>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Modalidad: </a>
        <a className="mt-2 text-gray-600">{modalidad}</a>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Dia: </a>
        <a className="mt-2 text-gray-600">{dia}</a>
        <p className="m-1"></p>
        <a className="mt-2 font-medium text-gray-800">Curso: </a>
        <a className="mt-2 text-gray-600">{curso}</a>
        <div className="border-2 my-1 text-center rounded-xl">
          <a className="mt-2 font-medium text-gray-800">Horario: </a>
          <a className="mt-2 text-gray-600">
            {horaInicio} a {horaFin}
          </a>
        </div>
        <a href={link} className="text-blue-500">
          {link}
        </a>
        <FormControl component="fieldset">
          <FormLabel component="legend">Asistencia</FormLabel>
          <RadioGroup
            aria-label="asistencia"
            defaultValue={asistencia}
            name="radio-buttons-group"
            onChange={onChangeRadioButtons}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Asistió"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="No Asistió"
            />
          </RadioGroup>
        </FormControl>

        <div className="w-full flex justify-center items-center">
          {estado === "actual" && esCancelada === 0 && (
            <button
              className="w-24 mt-1 center rounded-md border border-transparent shadow-sm px-1 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
              onClick={abrirModal}
            >
              Cancelar
            </button>
          )}
          {esCancelada === 1 && (
            <div>
              <p className="text-red-500 text-xl">Asesoria Cancelada</p>
              <p className="text-red-500 text-xl">{comentario}</p>
            </div>
          )}
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

export default ModalDetails;
