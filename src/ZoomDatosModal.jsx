import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ModalNuevo from "./ModalNuevo";
import { ModalSessionContext } from "./SessionContext";
import TextField from "@mui/material/TextField";
import axios from "axios";
import API_URL from "./utils/Constantes.js";

function ZoomDatosModal({ handleModalZoom }) {

const [datosZoom, setDatosZoom] = useState('')
const token = localStorage.getItem("token");

const [errores, setErrores] = useState({
    url: "",
    password: "",
    id_reunion: "",
  });

const { setShowModalSession } =
    useContext(ModalSessionContext);

    //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    axios
      .post(API_URL + `api/asesores/obtenerDatosReunion/`, { token: token })
      .then((response) => {
        console.log(response.data);
        setDatosZoom(response.data.mensaje);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-md min-w-md">
        
      <h2 className="text-xl font-bold">Mis Datos</h2>
          <div className="flex flex-col h-full">
            {datosZoom && (
              <>
                <TextField
                  id="url"
                  className="w-full py-10 h-12 block"
                  label="URL"
                  name="url"
                  variant="outlined"
                  placeholder="Ingresa el URL de tu reunion"
                  margin="normal"
                  value={datosZoom.url}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosZoom, url: e.target.value })
                  }
                />
                {errores.url && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.url}
                  </span>
                )}
                <TextField
                  id="passowrd"
                  className="w-full py-10 h-12 block"
                  label="Password"
                  name="password"
                  variant="outlined"
                  placeholder="Ingresa la contraseña de la ruinion"
                  margin="normal"
                  value={datosZoom.password}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosZoom, password: e.target.value })
                  }
                />
                {errores.password && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.password}
                  </span>
                )}
                <TextField
                  id="id_reunion"
                  className="w-full py-10 h-12 block"
                  label="ID reunion"
                  name="id_reunion"
                  variant="outlined"
                  margin="normal"
                  placeholder="Ingresa el ID de la reunion"
                  value={datosZoom.id_reunion}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosZoom, id_reunion: e.target.value })
                  }
                 
                />
                {errores.id_reunion && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.id_reunion}
                  </span>
                )}


                <button 
                className="w-64 my-4 mx-10 p-2 bg-blue-500 text-lg hover:bg-blue-700 text-white rounded-lg"
                variant="contained" 
                onClick={() => enviarDatos()}>
                  Guardar mis datos
                  </button>
              </>
            )}
          </div>
          <div className="w-full flex justify-center items-center pt-4">

            <button className=" bg-sky-600 hover:bg-sky-700 text-slate-100 py-1 px-2 rounded-md text-lg">
                Guardar Datos
            </button>

            <button
                className=" bg-sky-600 hover:bg-sky-700 text-slate-100 py-1 px-2 rounded-md text-lg"
                onClick={handleModalZoom} >
                Cerrar
            </button>
            <ModalNuevo
            showModal={showModal}
            handleClose={handleClose}
            modalTittle={modalTittle}
            modalMessage={modalMessage}
            />
            </div>
        </div> 
      </div>
  )
}

export default ZoomDatosModal