import React, { useState, useContext } from "react";
import ModalNuevo from "./ModalNuevo";
import API_URL from "./utils/Constantes.js";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import TextField from '@mui/material/TextField';
import { es_valido_email, es_valido_matricula, es_valido_password } from "./utils/Validadores.js";

function Login() {
  const [credencial, setCredencial] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState(null);

  const cookies = new Cookies();
  const navigate = useNavigate();

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

  //variables para los errores del formulario
  const [errores, setErrores] = useState({
    credencial: '',
    password: ''
  });


  const actualizarTipo = (tipo) => {
    if (es_valido_matricula(tipo)){
      setTipo('usuario')
    } else {
      setTipo('asesor')
    } 
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    limpiarErrores();

    if(validarCampos()){
      enviarDatosAlAPI();
    }
  };

  const validarCampos = () => {
    let valido = true;
    let credencialError = '';
    let passwordError = '';


    if (!es_valido_matricula(credencial)){
      credencialError = 'La matricula que ingreso no es valida, favor de cambiarla. (ejem: S200XXXXX)';
      valido = false;
      if(es_valido_email(credencial)){
        credencialError = ''
        valido = true;
      }
    }

    if (!es_valido_password(password)){
      passwordError = 'La contraseña que ingreso no es valida, favor de cambiarla. (debe tener min 8, max 16 caracteres)';
      valido = false;
    }

    if (password.length === 0) {
      passwordError = 'La contraseña es requerida';
      valido = false;
    }

    if (credencial.length === 0) {
      credencialError = 'La matricula es requerida.';
      valido = false;
    }
 
    setErrores({
      credencial: credencialError,
      password: passwordError
    });

    return valido;
  }

  const limpiarErrores = () => {
    setErrores({});
  }

  const enviarDatosAlAPI = async () => {
    console.log(tipo+credencial+password)
    const response = await fetch(API_URL + "api/autenticacion/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, credencial, password }),
    });

    if (!response.ok) {
      // Si el servidor devuelve un estado de error, muestra un mensaje de error
      setError("Error al conectarse al servidor, intente de nuevo.");
      return;
    }
    const data = await response.json();

    if (data.error) {
      // El api regresa un error
      handlePopup("Error",data.mensaje, true);
    } else {

      console.log(data);
      // El api regresa un mensaje de éxito
      //handlePopup("", data.mensaje, false);

      window.localStorage.setItem("token", data.token);
      if(data.tipo === "usuario"){
        cookies.set('tipo', "usuario", { path: '/' });
        cookies.set('nombre', data.usuario.nombre, { path: '/' });
        cookies.set('token', data.token, { path: '/' })
      }else{
        cookies.set('tipo', "asesor", { path: '/' });
        cookies.set('nombre', data.usuario.nombre, { path: '/' });
        cookies.set('token', data.token, { path: '/' })
      }
      navigate("/asesorias");
      window.location.reload();
    }
  }

  return (
    <div className="flex relative justify-center lg:px-0 items-center lg:py-20 md:px-12 overflow-hidden">
      <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
        <h2 className="text-3xl font-extrabold text-black md:text-4xl lg:text-5xl xl:text-6xl">
          <span className="block">Hola!</span>
          <span className="block">inicia sesion</span>
        </h2>

        <div className="h-8"></div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <TextField id="matricula" 
                  className="w-full py-10 h-12 block"
                  label="Matricula" 
                  name="matricula"
                  variant="outlined" 
                  placeholder="Ingresa tu matricula (ejem: S200XXXXX)"
                  onChange={(e) => {setCredencial(e.target.value); actualizarTipo(e.target.value) }}
                  />
                {errores.credencial && <span
                className="text-red-500 text-xs py-1">
                  {errores.credencial}</span>}
            </div>
            <div className="col-span-full">

              <TextField id="password" 
                  className="w-full py-10 h-12 block"
                  label="Contraseña" 
                  name="password"
                  variant="outlined" 
                  placeholder="Ingresa tu contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  />
                {errores.password && <span
                className="text-red-500 text-xs py-1">
                  {errores.password}</span>}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {error && (
                  <p className="text-red-400">
                    {error}, matricula y/o contraseña incorrectas
                  </p>
                )}
                <a
                  className="font-medium hover:text-accent-500 text-accent-500"
                  href="/forgotPass"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="col-span-full">
              <button
                className="items-center h-12 justify-center rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                type="submit"
              >
                Iniciar sesion
              </button>
            </div>
            <div>
              <p className="font-medium text-sm leading-tight text-black">
                No estas registrado?{" "}
                <a
                  className="text-accent-500 hover:text-accent-400 ml-3"
                  href="/signup"
                >
                  Registrate Ahora
                </a>
              </p>
            </div>
          </div>
        </form>
        <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
      </div>
    </div>
  );
}

export default Login;
