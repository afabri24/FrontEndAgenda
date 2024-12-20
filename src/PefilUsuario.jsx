import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ModalIdioma from "./components/ModalIdioma.jsx";
import axios from "axios";
import { API_URL } from "./utils/Constantes";
import ModalNuevo from "./ModalNuevo";
import { Link } from "react-router-dom";
import {
  es_valido_email,
  es_valido_matricula,
} from "./utils/Validadores.js";
import MoonLoader from "react-spinners/MoonLoader";

import { ModalSessionContext } from "./SessionContext";


function PefilUsuario() {
  const token = localStorage.getItem("token");
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [loading, setLoading] = useState(true)

  const [isOpen, setIsOpen] = useState(false);
  //variables para los errores del formulario
  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    matricula: "",
    password: "",
  });

  const [password, setPassword] = useState("");

  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const { showModalSession, setShowModalSession } =
    useContext(ModalSessionContext);

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  function enviarDatos() {
    if (validarDatos()) {
      axios
        .put(API_URL + `api/usuarios/actualizar/`, {
          nombre: datosUsuario.nombre,
          email: datosUsuario.email,
          matricula: datosUsuario.matricula,
        },{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.error) {
            handlePopup("Se actualizo correctamente", response.data.error);
            console.log("error");
          } else {
            handlePopup("Se actualizo correctamente", response.data.mensaje);
            setPassword("")
            console.log("mostrar modal");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la peticion:", error);
        });
    }
  }

  function validarDatos() {
    let valido = true;
    let nombreError = "";
    let matriculaError = "";
    let emailError = "";

    if (!es_valido_email(datosUsuario["email"])) {
      emailError = "El email que ingreso no es valido, favor de cambiarlo.";
      valido = false;
    }

    if (!es_valido_matricula(datosUsuario["matricula"])) {
      matriculaError =
        "La matricula que ingreso no es valida, favor de cambiarla.";
      valido = false;
    }

    if (datosUsuario["nombre"].length === 0) {
      nombreError = "El nombre es requerido";
      valido = false;
    }
    if (datosUsuario["email"].length === 0) {
      emailError = "El email es requerido";
      valido = false;
    }
    if (datosUsuario["matricula"].length === 0) {
      matriculaError = "La matricula es requerida";
      valido = false;
    }

    setErrores({
      nombre: nombreError,
      matricula: matriculaError,
      email: emailError
    });

    return valido;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleModalIdiomas = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .post(API_URL + `api/usuarios/obtenerDatosUsuario/`, { },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        setDatosUsuario(response.data.mensaje);
        setLoading(false)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }, []);

  return (
    <div className="container mx-auto grid gap-4">
      <div className="p-4 mt-4">
        <Link
          className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          to="/asesorias"
        >
          Regresar
        </Link>
        
          
          {loading ? 
            <div className="flex w-full align-middle h-xxxl justify-center">
          <MoonLoader
            color={"#2E86C1"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> 
          </div> :<>
          <div className="bg-white p-4 flex flex-col justify-center items-center">
          <div>
            <InputLabel className="mx-4" id="demo-simple-select-label">
                      Mis Idiomas
                    </InputLabel>
              <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg" onClick={() => setIsOpen(true)}>Mis idiomas</button>
              {isOpen && (
                <ModalIdioma
                  handleModalIdiomas={handleModalIdiomas}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          <div className="flex flex-col h-full">
            {datosUsuario && (
              <>
                <TextField
                  id="nombre"
                  className="sm:w-full h-12"
                  label="Nombre completo"
                  name="nombre"
                  variant="outlined"
                  placeholder="Ingresa tu nombre completo"
                  margin="normal"
                  value={datosUsuario.nombre}
                  onChange={(e) =>
                    setDatosUsuario({ ...datosUsuario, nombre: e.target.value })
                  }
                />
                {errores.nombre && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.nombre}
                  </span>
                )}
                <TextField
                  id="email"
                  className="sm:w-full py-10 h-12 block"
                  label="Correo electronico"
                  name="matricula"
                  variant="outlined"
                  placeholder="Ingresa tu correo electronico"
                  margin="normal"
                  value={datosUsuario.email}
                  onChange={(e) =>
                    setDatosUsuario({ ...datosUsuario, email: e.target.value })
                  }
                />
                {errores.email && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.email}
                  </span>
                )}
                
              </>
            )}

            <div>
            <button 
                className="w-64 my-4 mx-10 p-2 bg-blue-500 text-lg hover:bg-blue-700 text-white rounded-lg"
                variant="contained" 
                onClick={() => enviarDatos()}>
                  Guardar mis datos
                  </button>
            </div>
            
          </div>
        </div>
        </>}
      </div>
      <ModalNuevo
        showModal={showModal}
        handleClose={handleClose}
        modalTittle={modalTittle}
        modalMessage={modalMessage}
      />
    </div>
  );
}

export default PefilUsuario;
