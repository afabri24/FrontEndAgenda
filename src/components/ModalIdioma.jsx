import React, { useState, useEffect, useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { API_URL } from "../utils/Constantes";
import Chip from "@mui/material/Chip";
import { ModalSessionContext } from "../SessionContext";
import ModalNuevo from "../ModalNuevo";

function ModalIdioma({ handleModalIdiomas }) {
  //Apartado idiomas
  const [nuevoIdioma, setNuevoIdioma] = useState("");
  const [idiomas, setIdiomas] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const token = localStorage.getItem("token");
  const [showButton, setShowButton] = useState(false);

  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const todosLosIdiomas = ["Ingles", "Frances", "Aleman", "Italiano","Japones"];

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    obtenerIdiomas();
  }, []);

  function obtenerIdiomas() {
    axios
      .post(
        API_URL + "api/usuarios/obtenerIdiomas/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIdiomas(response.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }

  function handleidiomaNuevo(nombre) {
    agregarNuevoIdioma(nombre);
  }

  function agregarNuevoIdioma(nombre) {
    console.log("Agregando nuevo idioma");
    console.log(nombre);
    axios
      .post(
        API_URL + "api/usuarios/agregarIdioma/",
        {
          idioma: nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        obtenerIdiomas();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }

  function handleDeleteIdioma(id) {
    eliminarIdioma(id);
  }

  const eliminarIdioma = async (id) => {
    console.log("Eliminando idioma");
    console.log(id);
    axios
      .delete(API_URL + "api/usuarios/eliminarIdioma/", {
        data: {
          id_idioma: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        obtenerIdiomas();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 w-2/6 ">
        <h2 className="text-xl font-bold">Idiomas agregados</h2>
        {idiomas && idiomas.length > 0 ? (
          idiomas.map((idioma) => (
            <Chip
              key={idioma.id_idioma}
              label={idioma.idioma}
              onDelete={() => handleDeleteIdioma(idioma.id_idioma)}
              style={{
                margin: "5px",
                backgroundColor: "#f5f5f5",
                color: "#333",
              }}
            />
          ))
        ) : (
          <p>No hay idiomas agregados.</p>
        )}

        <div className="pt-2 flex-col justify-center items-center ">
        <InputLabel id="nuevo-idioma-label">Nuevo idioma</InputLabel>
          <Select
            labelId="nuevo-idioma-label"
            value={nuevoIdioma}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              handleidiomaNuevo(e.target.value);
              setNuevoIdioma("");
            }}
            style={{ width: "50%" }}
          >
            {todosLosIdiomas
              .filter(
                (idioma) => !idiomas.map((i) => i.idioma).includes(idioma)
              )
              .map((idioma) => (
                <MenuItem key={idioma} value={idioma}>
                  {idioma}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className="w-full flex justify-center items-center pt-4">
          <button
            className=" bg-sky-600 hover:bg-sky-700 text-slate-100 py-1 px-2 rounded-md text-lg"
            onClick={handleModalIdiomas}
          >
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
  );
}

export default ModalIdioma;
