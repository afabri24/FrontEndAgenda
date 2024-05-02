import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import API_URL from "./utils/Constantes.js";
import ModalNuevo from "./ModalNuevo";
import { Link } from "react-router-dom";
import {
  es_valido_email,
  es_valido_matricula,
  es_valido_password,
} from "./utils/Validadores.js";
import { ModalSessionContext } from "./SessionContext";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PefilUsuario() {
  const token = localStorage.getItem("token");
  const [datosUsuario, setDatosUsuario] = useState(null);
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
          token: localStorage.getItem("token"),
          email: datosUsuario.email,
          password: password,
          matricula: datosUsuario.matricula,
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
    let passwordError = "";

    if (!es_valido_email(datosUsuario["email"])) {
      emailError = "El email que ingreso no es valido, favor de cambiarlo.";
      valido = false;
    }

    if (!es_valido_matricula(datosUsuario["matricula"])) {
      matriculaError =
        "La matricula que ingreso no es valida, favor de cambiarla.";
      valido = false;
    }

    if (!es_valido_password(password)) {
      passwordError =
        "La contraseña que ingreso no es valida, favor de cambiarla. (min 8, max 16 caracteres)";
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
    if (password.length === 0) {
      passwordError = "La contraseña es requerida";
      valido = false;
    }

    setErrores({
      nombre: nombreError,
      matricula: matriculaError,
      email: emailError,
      password: passwordError,
    });

    return valido;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function quitarPassword() {
    
  }

  useEffect(() => {
    axios
      .post(API_URL + `api/usuarios/obtenerDatosUsuario/`, { token: token })
      .then((response) => {
        setDatosUsuario(response.data.mensaje);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4">
      <div className="p-4 mt-4">
        <Link
          className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          to="/asesorias"
        >
          Regresar
        </Link>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold">Usuario</h2>
          <div className="flex flex-col h-full">
            {datosUsuario && (
              <>
                <TextField
                  id="nombre"
                  className="w-full py-10 h-12 block"
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
                  className="w-full py-10 h-12 block"
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
                <div className="m-2"></div>
                <TextField
                id="password"
                className="mt-10"
                label="Nueva contraseña"
                name="password"
                variant="outlined"
                placeholder="Ingresar nueva contraseña"
                value={password}
                onChange={(e) =>
                  setPassword( e.target.value)
                }
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                    className="mt-10"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
                  
                {errores.password && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.password}
                  </span>
                )}
              </>
            )}

            <div>
              <Button onClick={() => enviarDatos()}>Guardar</Button>
            </div>
          </div>
        </div>
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
