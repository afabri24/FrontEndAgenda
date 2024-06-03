import React, { useState, useContext } from "react";
import ModalNuevo from "../ModalNuevo";
import {API_URL} from "../utils/Constantes";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import TextField from "@mui/material/TextField";
import {
  es_valido_email,
  es_valido_password,
} from "../utils/Validadores.js";


import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("  ");

  const navigate = useNavigate();
  const cookies = new Cookies();

  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("")

    if (validarCampos()) {
      autenticacion();
    }
  };

  const autenticacion = async () => {
    try {
        const response = await axios({
          method: "post",
          url: API_URL + "api/autenticacion/admin/",
          headers: { "Content-Type": "application/json" },
          data: {
            email: email,
            password: password,
          },
        });
    
        //console.log(response.data);
    
        if (response.data.error) {
          // El api regresa un error
          handlePopup("Error", response.data.mensaje, true);
        } else {
          localStorage.setItem("token", response.data.token);
          cookies.set("tipo", "admin", { path: "/" });
          cookies.set("nombre", response.data.usuario.nombre, { path: "/" });
          navigate("/dashboard");
          window.location.reload();
      
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(error.response);
          // El servidor regresó un error de Bad Request
        handlePopup("Error", "Matricula o Contraseña incorrecta", true);
        } else {
          // Otro tipo de error ocurrió
          console.error(error);
        }
      }
    
  }

    const validarCampos = () => {
        let valido = true;
    
        if (!es_valido_password(password)) {
          setError("Error en los campos ingresados")
        }
    
        if (password.length === 0) {
            setError("*La contraseña es requerida");
            valido = false;
        } else if (password.length < 8 ) {
            setError("La contraseña debe tener mínimo 8 caracteres");
            valido = false;
        } else if (password.length > 16 ) {
            setError("La contraseña debe tener máximo 16 caracteres");
            valido = false;
        }
    
        if (email.length === 0) {
            setError("El correo electronico es requerida.");
            valido = false;
        }

        return valido;
      };


  return (
    <div className='flex w-full relative justify-center items-center flex-col space-y-5'>
        <h2 className="text-2xl font-extrabold text-black md:text-3xl lg:text-4xl xl:text-5xl">
        <span className="block">Administador</span>
        </h2>
      <h2 className="text-xl font-extrabold text-black md:text-2xl lg:text-3xl xl:text-4xl">
          <span className="block">Iniciar sesion</span>
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="w-full h-full space-y-7 px-5">
                <div>
                    <TextField
                        id="email"
                        className="w-full h-12 block"
                        label="Correo electronico"
                        name="email"
                        variant="outlined"
                        placeholder="Ingresa el correo electronico"
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                    />
                    </div>
                    <div>
                    <TextField
                        id="password"
                        className="w-full h-12 block"
                        label="Contraseña"
                        name="password"
                        variant="outlined"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
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
                    {error && (
                        <span className="text-red-500 text-xs py-5 mt-5">
                        {error}
                        </span>
                    )}
                    </div>
                    <div className="col-span-full">
                <button
                    className="items-center h-12 justify-center rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                    type="submit">
                    Iniciar sesion
                </button>
                
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
  )
}

export default LoginAdmin
