import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./utils/Constantes";

function Modal({ showModal, onClose, onAccept, title, message, handleReload,idAsesoria, handlePopup}) {
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = () => {
    eliminarAsesoria(); // Aquí puedes manejar la razón de la cancelación
    onAccept();
  };

  const handleButtonClick = (event, callback) => {
    event.stopPropagation();
    callback();
  };

  const eliminarAsesoria = async () => {
    const token = localStorage.getItem("token");
    const comentario = cancelReason;


    if (comentario == "" ){
      handlePopup("Error", "Por favor ingrese una razón de cancelación");
      return;
    }
    try {
      const response = await axios({
        method: "DELETE",
        url: API_URL + "api/asesorias/cancelarAsUsuario/",
        data: {
          id_asesoria: idAsesoria,
          comentario: comentario,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.data.error) {
        handleReload();
      } else {
        handleReload();
        handlePopup("Error", response.data.mensaje);
      }
    } catch (error) {
      console.error("Error al cancelar la asesoria", error);
    }
  };

  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                  <input
                    type="text"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mt-2 w-full p-2 border border-gray-300 rounded"
                    placeholder="Razón de la cancelación"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={(event) => handleButtonClick(event, onClose)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={(event) => handleButtonClick(event, handleCancel)}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
