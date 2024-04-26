import React, { useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import API_URL from "./utils/Constantes";

function RegistroAsesor() {
  const [form, setForm] = useState({
    nombre: "",
    idioma: "",
    email: "",
    password: "",
    fotoBase64: "",
  });
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("placeholder.png"); // placeholder image

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    console.log(form);
    try {
      const response = await axios.post(API_URL+"api/asesores/registrar/", form);
      console.log(response.data);
      console.log("Asesor registrado");
    } catch (error) {
      console.error(error);
    }
  };

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
          <TextField
            name="idioma"
            label="Idioma"
            margin="normal"
            fullWidth
            value={form.idioma}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            margin="normal"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            margin="normal"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          <img
            src={preview}
            alt="Arrastre una imagen aquí para agregarla"
            className="mb-4 object-contain h-48 w-full"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegistroAsesor;
