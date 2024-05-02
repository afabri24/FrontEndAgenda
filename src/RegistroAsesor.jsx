import React, { useState, useCallback, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import API_URL from "./utils/Constantes";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import imgDefault from "./assets/addImage.png";
import { es_valido_email } from "./utils/Validadores";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function RegistroAsesor() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [form, setForm] = useState({
    nombre: "",
    idioma: "",
    email: "",
    password: "",
    fotoBase64: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    idioma: "",
    email: "",
    password: "",
    fotoBase64: "",
  });


  const [file, setFile] = useState();
  const [preview, setPreview] = useState("placeholder.png"); // placeholder image

  const handleChange = (e) => {
    console.log(form)
    setForm({
      ...form,
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
        setForm((prevForm) => ({
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
        setPreview(reader.result);
        setForm((prevForm) => ({
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
    

      console.log(form);
      try {
        const response = await axios.post(API_URL+"api/asesores/registrar/", form);
        console.log(response.data);
        console.log("Asesor registrado");
      } catch (error) {
        console.error(error);
      }
    }else{
      console.log("error")
    }
  };

  function validarCampos() {
    
    let valido = true;
    let nombreError = '';
    let idiomaError = '';
    let passwordError = '';
    let emailError = '';
    let fotoBase64Error = '';

    if(form.nombre.length === 0){
      nombreError = '*Campo requerido'
      valido = false
    }

    if(form.idioma.length === 0){
      idiomaError = '*Campo requerido'
      valido = false
    }

    if(form.email.length === 0){
      emailError = '*Campo requerido'
      valido = false
    }

    if(form.fotoBase64.length === 0){
      fotoBase64Error = '*Es necesario elegir una foto de perfil'
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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="w-1/2 p-4 border-2 border-gray-300 rounded-md"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1 className="text-center mb-4">Registro Asesor</h1>
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
          <InputLabel id="demo-simple-select-label">Idiomas</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  name="idioma"
                  onChange={handleChange}
                  value={form.idioma}
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
          <p className="text-gray-600">Seleccionar foto de perfil</p>
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />

          {form.fotoBase64 ? 
          <img
          src={ preview }
          alt="Arrastre una imagen aquí para agregarla"
          className="mb-4 object-contain h-48 w-full"
        />
         : <img
         src={ imgDefault }
         alt="Arrastre una imagen aquí para agregarla"
         className="mb-4 object-contain h-48 w-full"
       /> }
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
    </div>
  );
}

export default RegistroAsesor;
