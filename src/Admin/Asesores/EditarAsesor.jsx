import React, { useContext, useState, useCallback, useEffect } from 'react'
import { dataContext } from '../ContextoAdmin'
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

function EditarAsesor({irTabla}) {
    const token = localStorage.getItem('token');
    const { setAsesor, asesor } = useContext(dataContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();


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

  useEffect(() =>{
    console.log(asesor)
  }, [])


  const [errores, setErrores] = useState({
    nombre: "",
    idioma: "",
    email: "",
    password: "",
    fotoBase64: "",
  });

  const handleChange = (e) => {
    setAsesor({
      ...asesor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setAsesor((prevForm) => ({
          ...prevForm,
          fotoBase64: reader.result,
        }));
      };
      reader.readAsDataURL(droppedFile);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAsesor((prevForm) => ({
          ...prevForm,
          fotoBase64: reader.result,
        }));
      };
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        reader.readAsDataURL(file);
      } else {
        alert('Solo se permiten archivos PNG, JPG y JPEG');
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    limpiarErrores()
    if(validarCampos()){
    

      try {
        const response = await axios.patch(API_URL+"api/admin/actualizarAsesor/", asesor,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

        if(response.data.error)
          handlePopup("Error", "response.data.mensaje", true);
        else 
        limpiarFormulario(); 
          handlePopup("Exito", response.data.mensaje, true);
      } catch (error) {
        handlePopup("Error", "error" , true);
      }
    }
  };

  function validarCampos() {
    
    let valido = true;
    let nombreError = '';
    let idiomaError = '';
    let passwordError = '';
    let emailError = '';
    let fotoBase64Error = '';

    if(asesor.nombre.length === 0){
      nombreError = '*Campo requerido'
      valido = false
    }

    if(asesor.idioma.length === 0){
      idiomaError = '*Campo requerido'
      valido = false
    }

    if(asesor.email.length === 0){
      emailError = '*Campo requerido'
      valido = false
    }

    if(asesor.fotoBase64 === null || asesor.fotoBase64.length === 0){
      fotoBase64Error = '*Es necesario elegir una foto de perfil'
      valido = false
    }

    if (!es_valido_email(asesor.email)) {
      emailError = '*El correo electronico no es valido'
      valido = false
    }


    setErrores({
      nombre: nombreError,
      email: emailError,
      password: passwordError,
      fotoBase64: fotoBase64Error,
      idioma: idiomaError,
    });
    return valido;
  }

  function limpiarErrores() {
    errores.nombre =  "";
    errores.idioma = "";
    errores.email = "";
    errores.password = "";
    errores.fotoBase64 = "";
  }

  function limpiarFormulario() {
    setForm({
      nombre: "",
      email: "",
      password: "",
      fotoBase64: "",
      idioma: "",
    });
  }
  return (

    <div>
      
      <Button variant="contained" onClick={() => {setAsesor(""), irTabla() }}> Regresar</Button>

    <div className="flex justify-center items-center min-h-screen">

      <div
        className="w-1/2 p-4 border-2 border-gray-300 rounded-md"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1 className="text-center mb-4">Editar Asesor</h1>
        <form onSubmit={handleSubmit}>

          <TextField
            name="nombre"
            label="Nombre"
            margin="normal"
            fullWidth
            value={asesor.nombre}
            onChange={handleChange}
          />
          {errores.nombre && (
              <span className="text-red-500 text-xs py-1">
                { errores.nombre }
              </span>
            )}
          <InputLabel id="demo-simple-select-label">Idiomas</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  name="idioma"
                  onChange={handleChange}
                  value={asesor.idioma}
                  margin="normal"
                >
                  <MenuItem value={"ingles"}>Ingles</MenuItem>
                  <MenuItem value={"frances"}>Frances</MenuItem>
                  <MenuItem value={"aleman"}>Aleman</MenuItem>
                  <MenuItem value={"japones"}>Japones</MenuItem>
                </Select>
                {errores.idioma && (
              <span className="text-red-500 text-xs py-1">
                { errores.idioma }
              </span>
            )}
          <TextField
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            value={asesor.email}
            onChange={handleChange}
          />
          {errores.email && (
              <span className="text-red-500 text-xs py-1">
                { errores.email }
              </span>
            )}
          {/* <TextField
            name="password"
            label="Contraseña"
            margin="normal"
            fullWidth
            value={asesor.password}
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
            )} */}
          <p className="text-gray-600">Seleccionar foto de perfil</p>
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
          <img
          src={ asesor.fotoBase64 }
          alt="Arrastre una imagen aquí para agregarla2"
          className="mb-4 object-contain h-48 w-full"
        />
       {errores.fotoBase64 && (
              <span className="text-red-500 text-xs py-1">
                { errores.fotoBase64 }
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

export default EditarAsesor
