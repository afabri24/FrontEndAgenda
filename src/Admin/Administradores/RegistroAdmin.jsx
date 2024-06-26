import React, { useState, useCallback, useEffect, useContext } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "./../../utils/Constantes";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import imgDefault from "../../assets/addImage.png";
import { es_valido_email } from "../../utils/Validadores";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ModalNuevo from "../../ModalNuevo";
import { dataContext } from "../ContextoAdmin";

function RegistroAdmin({irTabla}) {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const token = localStorage.getItem("token")
  const { admin, setAdmin } =useContext(dataContext);

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

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    limpiarErrores()
    if(validarCampos()){
    

      try {
        const response = await axios.post(API_URL+"api/admin/registrarAdmin/", form, {
          headers: {
              'Authorization': `Bearer ${token}`,
            }
      });

        if(response.data.error)
          handlePopup("Error", response.data.mensaje, true);
        else 
        limpiarFormulario(); 
          handlePopup("Exito", "El administrador fue registrado correctamente", true);
      } catch (error) {
        handlePopup("Error", error , true);
      }
    }
  };

  function validarCampos() {
    
    let valido = true;
    let nombreError = '';
    let passwordError = '';
    let emailError = '';

    if(form.nombre.length === 0){
      nombreError = '*Campo requerido'
      valido = false
    }

    if(form.email.length === 0){
      emailError = '*Campo requerido'
      valido = false
    }


    if (form.password.length === 0) {
      passwordError = "*La contraseña es requerida";
      valido = false;
    } else if (form.password.length < 8 ) {
      passwordError = "*La contraseña debe tener mínimo 8 caracteres";
      valido = false;
    } else if (form.password.length > 16 ) {
      passwordError = "*La contraseña debe tener máximo 16 caracteres";
      valido = false;
    }

    if (!es_valido_email(form.email)) {
      emailError = '*El correo electronico no es valido'
      valido = false
    }


    setErrores({
      nombre: nombreError,
      email: emailError,
      password: passwordError,
    });
    return valido;
  }

  function limpiarErrores() {
    errores.nombre =  "";
    errores.email = "";
    errores.password = "";
  }

  function limpiarFormulario() {
    setForm({
      nombre: "",
      email: "",
      password: "",
    });
  }
  return (
    <div>
           <Button variant="contained" onClick={() => {setAdmin(""), irTabla() }}> Regresar</Button>

    <div className="flex justify-center items-center min-h-screen">

      <div
        className="w-1/2 p-4 border-2 border-gray-300 rounded-md">
        <h1 className="text-center mb-4">Registro Administrador</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            margin="normal"
            fullWidth
            value={form.nombre}
            onChange={handleChange}
          />
          {errores.nombre && (
              <span className="text-red-500 text-xs py-1">
                { errores.nombre }
              </span>
            )}
          <TextField
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          {errores.email && (
              <span className="text-red-500 text-xs py-1">
                { errores.email }
              </span>
            )}
          <TextField
            name="password"
            label="Contraseña"
            margin="normal"
            fullWidth
            value={form.password}
            onChange={handleChange}
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
          {errores.password && (
              <span className="text-red-500 text-xs py-1">
                { errores.password  }
              </span>
            )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </form>
      </div>
      <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
    </div>
    </div>
  )
}

export default RegistroAdmin
