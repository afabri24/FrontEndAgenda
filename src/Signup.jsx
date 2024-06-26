import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import {API_URL} from "./utils/Constantes";
import TextField from "@mui/material/TextField";
import {
  es_valido_email,
  es_valido_matricula,
  es_valido_password,
} from "./utils/Validadores.js";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from 'react-router-dom';

function Signup() {
  //aqui estan para mostrar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  //aqui estan las variables que se usan en el formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  // El estado del checkbox
  const [isChecked, setIsChecked] = useState(false);

  //las variables que se usan en el modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Exito");

  const [confirmPassword, setConfirmPassword] = useState("");

  //funcion que se encarga de mostrar el modal
  const handlePopup = (message, error) => {
    setModalMessage(message);
    setModalTitle(error ? "Error" : "Exito");
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  // Maneja el cambio en el checkbox
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  //variables para los errores del formulario
  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    matricula: "",
    password: "",
    checkbox: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    limpiarErrores();

    if (validarCampos()) {
      enviarDatosAlAPI();
    }
  };

  const validarCampos = () => {
    let valido = true;
    let nombreError = "";
    let matriculaError = "";
    let emailError = "";
    let passwordError = "";
    let checkboxError = "";

    if (!es_valido_email(email)) {
      emailError = "El email que ingreso no es valido, favor de cambiarlo.";
      valido = false;
    }

    if (!es_valido_matricula(matricula)) {
      matriculaError =
        "La matricula que ingreso no es valida, favor de cambiarla.";
      valido = false;
    }

    if (!es_valido_password(password)) {
      passwordError =
        "La contraseña que ingreso no es valida, favor de cambiarla. (min 8, max 16 caracteres)";
      valido = false;
    }
    if (password !== confirmPassword) {
      passwordError = "Las contraseñas no coinciden";
      valido = false;
    }

    if (nombre.length === 0) {
      nombreError = "El nombre es requerido";
      valido = false;
    }
    if (email.length === 0) {
      emailError = "El email es requerido";
      valido = false;
    }
    if (matricula.length === 0) {
      matriculaError = "La matricula es requerida";
      valido = false;
    }
    if (password.length === 0) {
      passwordError = "La contraseña es requerida";
      valido = false;
    }

    if (isChecked == false) {
      checkboxError =
        "Es obligatorio estar de acuerdo con los terminos y condiciones";
      valido = false;
    }

    setErrores({
      nombre: nombreError,
      matricula: matriculaError,
      email: emailError,
      password: passwordError,
      checkbox: checkboxError,
    });

    return valido;
  };

  const limpiarErrores = () => {
    setErrores({});
  };

  //funcion que se encarga de enviar los datos del formulario al servidor
  const enviarDatosAlAPI = async () => {
    const response = await fetch(API_URL + "api/usuarios/registrar/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        email,
        matricula,
        password: password,
      }),
    });

    if (!response.ok) {
      // Si el servidor devuelve un estado de error, muestra un mensaje de error
      setError("Error en la base de datos, intente de nuevo.");
      return;
    }

    const data = await response.json();

    if (data.error) {
      // Server returned error
      handlePopup(data.mensaje || data.message, true); // Use either 'mensaje' or 'message' based on your response
    } else {
      // Successful response
      handlePopup(data.mensaje || data.message, false); // Use either 'mensaje' or 'message' based on your response
      window.location.href = "/Login";
    }
  };

  return (
    <div className="flex relative justify-center px-0 items-center md:px-12 overflow-hidden">
      <div className="w-full h-full px-4 lg:py-10 md:flex-none md:px-28 py-10 sm:justify-center xl:py-10">
        <div className="w-full max-w-md md:px-0 md:w-96 mx-auto sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="font-display text-center text-3xl font-extrabold text-black md:text-4xl lg:text-5xl xl:text-6xl p-y-5">
                Registro
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="col-span-full py-5">
                <TextField
                  id="nombre"
                  className="w-full py-10 h-12 block"
                  label="Nombre completo"
                  variant="outlined"
                  placeholder="Ingresa tu nombre completo"
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errores.nombre && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.nombre}
                  </span>
                )}
              </div>

              <div className="col-span-full">
                <TextField
                  id="matricula"
                  className="w-full py-10 h-12 block"
                  label="Matricula"
                  variant="outlined"
                  placeholder="Ingresa tu matricula (ejem: S200XXXXX)"
                  onChange={(e) => setMatricula(e.target.value)}
                />
                {errores.matricula && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.matricula}
                  </span>
                )}
              </div>
              <div className="py-5">
              <TextField
                id="email"
                className="w-full py-10 h-12 block"
                label="Correo electronico"
                variant="outlined"
                placeholder="Ingresa tu correo electronico"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errores.email && (
                <span className="text-red-500 text-xs py-1">
                  {errores.email}
                </span>
              )}
              </div>

              <TextField
                id="password"
                className="w-full py-10 h-12 block"
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa una contraseña nueva"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
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
              <TextField
                id="confirmPassword"
                className="w-full py-10 h-12 block"
                label="Confirmar contraseña"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma tu contraseña"
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              <div className="flex">
                <div className="flex items-start py-2">
                  <input
                    className="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={isChecked} // Establece el estado del checkbox
                    onChange={handleCheckboxChange} // Maneja el cambio en el checkbox
                  />
                  <label className="font-medium text-xs block leading-tight ml-2 text-gray-500">
                    Creando una cuenta con nosotros significa que aceptas
                    nuestros{" "}
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/terms"
                    >
                      Terminos de servicio,
                    </a>
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/privacy"
                    >
                      Aviso de privacidad
                    </a>
                    , y las notificaciones{" "}
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/notifications"
                    >
                      por correo.
                    </a>
                  </label>
                </div>
              </div>
              {errores.checkbox && (
                    <span className="text-red-500 text-xs pb-3">
                      {errores.checkbox}
                    </span>
                  )}
              <div className="col-span-full">
                <button
                  className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                  type="submit"
                >
                  Crear una cuenta 
                </button>
              </div>
              <div className="space-y-4">
                <p className="font-medium text-sm leading-tight text-black">
                  Ya te registraste?{" "}
                  <Link
                    className="text-accent-500 hover:text-accent-400 ml-3"
                    to="/login"
                  >
                    Inicia sesion
                  </Link>
                </p>
              </div>
            </div>
          </form>

          <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalTitle={modalTitle}
            modalMessage={modalMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
