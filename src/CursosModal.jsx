import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { API_URL } from "./utils/Constantes";
import Chip from "@mui/material/Chip";
import { ModalSessionContext } from "./SessionContext";
import ModalNuevo from "./ModalNuevo";

function CursosModal({ handleModalCursos }) {
  //Apartado cursos
  const [nuevoCurso, setNuevoCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const token = localStorage.getItem("token");
  const [showButton, setShowButton] = useState(false);

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
    obtenerCursos()
  }, []);

  function obtenerCursos() {
    axios
      .post(API_URL + "api/asesores/obtenerCursos/", { token: token })
      .then((response) => {
        console.log(response.data.mensaje);
        setCursos(response.data.mensaje);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
    
  }

  function handleCursoNuevo(nombre) {
    agregarNuevoCurso(nombre)
    handlePopup('Agreado correctamente', 'Se agrego correctamente el nuevo curso')
  }

  function agregarNuevoCurso(nombre) {
    axios
      .post(API_URL + "api/asesores/registrarCurso/", { token: token, nombre: nombre })
      .then((response) => {
        console.log(response.data.mensaje);
        obtenerCursos()
      })
      .catch((error) => {
        handlePopup('Error', 'Hubo un problema al agregar su nuevo curso')
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
      
  }

  function handleDeleteCurso(id) {
    eliminarCurso(id);
  }

  const eliminarCurso = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "DELETE",
        url: API_URL + "api/asesores/eliminarCurso/",
        data: {
          idCurso: id,
          token: token,
        },
      });
      console.log(response.data.mensaje)
      
      if(!response.data.error){
        obtenerCursos()
        handlePopup('Eliminado correctamente', 'Se elimino correctamente el curso')
      }else{
        handlePopup('Error al eliminar', response.data.mensaje)
      }
    } catch (error) {
      
      console.error("Error al eliminar el horario", error);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-md min-w-md">
        {cursos &&
          cursos.map((curso) => (
            <Chip
              key={curso.id_curso}
              label={curso.nombrecurso}
              onDelete={() => handleDeleteCurso(curso.id_curso)}
              style={{
                margin: "5px",
                backgroundColor: "#f5f5f5",
                color: "#333",
              }}
            />
          ))}

          <div className="pt-2 flex justify-center items-center">

        <TextField
          
          label="Nuevo curso"
          placeholder="Ingresa un curso nuevo"
          value={nuevoCurso}
          onClick={(e) => e.stopPropagation()} 
          onChange={(e) => {
            setNuevoCurso(e.target.value);
            setShowButton(e.target.value !== "");
          }}
        />

        {showButton && (
          <button
          className="px-2 bg-cyan-600 hover:bg-cyan-700 text-slate-100 py-1 rounded-md text-lg my-4 mx-2"
            onClick={() => {
              handleCursoNuevo(nuevoCurso)
              setNuevoCurso("");
              setShowButton(false);
            }}
          >
            Guardar
          </button>
        )}
        </div>
        <div className="w-full flex justify-center items-center pt-4">

          <button
            className=" bg-sky-600 hover:bg-sky-700 text-slate-100 py-1 px-2 rounded-md text-lg"
            onClick={handleModalCursos}
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

export default CursosModal;
