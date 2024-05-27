import React, { useState, useEffect, useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // obteneridiomas()
  }, []);

  function obteneridiomas() {
    // axios
    //   .post(API_URL + "api/usuario/obteneridiomas/", { token: token })
    //   .then((response) => {
    //     console.log(response.data.mensaje);
    //     setIdiomas(response.data.mensaje);
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 401) {
    //       setShowModalSession(true);
    //     }
    //   });
  }

  function handleidiomaNuevo(nombre) {
    agregarNuevoIdioma(nombre);
    handlePopup(
      "Agregado correctamente",
      "Se agrego correctamente el nuevo idioma"
    );
  }

  function agregarNuevoIdioma(nombre) {
    console.log("Agregando nuevo idioma");
    console.log(nombre);
    // axios
    //   .post(API_URL + "api/asesores/registraridioma/", { token: token, nombre: nombre })
    //   .then((response) => {
    //     console.log(response.data.mensaje);
    //     obteneridiomas()
    //   })
    //   .catch((error) => {
    //     handlePopup('Error', 'Hubo un problema al agregar su nuevo idioma')
    //     if (error.response.status === 401) {
    //       setShowModalSession(true);
    //     }
    //   });
  }

  function handleDeleteIdioma(id) {
    eliminarIdioma(id);
  }

  const eliminarIdioma = async (id) => {
    console.log("Eliminando idioma");
    console.log(id);
    // const token = localStorage.getItem("token");
    // try {
    //   const response = await axios({
    //     method: "DELETE",
    //     url: API_URL + "api/asesores/eliminaridioma/",
    //     data: {
    //       ididioma: id,
    //       token: token,
    //     },
    //   });
    //   console.log(response.data.mensaje)

    //   if(!response.data.error){
    //     obteneridiomas()
    //     handlePopup('Eliminado correctamente', 'Se elimino correctamente el idioma')
    //   }else{
    //     handlePopup('Error al eliminar', response.data.mensaje)
    //   }
    // } catch (error) {

    //   console.error("Error al eliminar el horario", error);
    // }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-md min-w-md">
        {idiomas &&
          idiomas.map((idioma) => (
            <Chip
              key={idioma.id_idioma}
              label={idioma.nombreIdioma}
              onDelete={() => handleDeleteIdioma(idioma.id_idioma)}
              style={{
                margin: "5px",
                backgroundColor: "#f5f5f5",
                color: "#333",
              }}
            />
          ))}

        <div className="pt-2 flex justify-center items-center">
          <Select
            label="Nuevo idioma"
            value={nuevoIdioma}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              setNuevoIdioma(e.target.value);
              setShowButton(e.target.value !== "");
            }}
          >
            <MenuItem value={"Ingles"}>Ingles</MenuItem>
            <MenuItem value={"Frances"}>Frances</MenuItem>
            <MenuItem value={"Aleman"}>Aleman</MenuItem>
            <MenuItem value={"Italiano"}>Italiano</MenuItem>
            
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
