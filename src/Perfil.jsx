import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ModalDay from "./ModalDay";
import API_URL from "./utils/Constantes.js";
import ModalNuevo from "./ModalNuevo";
import { es_valido_email, es_valido_password } from "./utils/Validadores.js";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { ModalSessionContext } from "./SessionContext";
import CursosModal from "./CursosModal.jsx";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Perfil() {
  const token = localStorage.getItem("token");
  const [datosAsesor, setDatosAsesor] = useState(null);
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

  const days = [];
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const monthsOfYear = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      startOfWeek + i
    );
    const day = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];

    days.push(day);

    return date.getDay() === 0 || date.getDay() === 6
      ? null
      : `${day} ${date.getDate()} de ${month}`;
  }).filter(Boolean);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [cursoAEliminar, setCursoAEliminar] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (index) => {
    setCursoAEliminar(index);
    setOpen(true);
  };

  const handleModalCursos = () => {
    setIsOpen(false);
  };

  const handleCerrar = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setCursos(cursos.filter((c, i) => i !== cursoAEliminar));
    handleCerrar();
  };

  const handleDayClick = (date, day) => {
    setSelectedDate(date);
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  function enviarDatos() {
    if (validarDatos()) {
      axios
        .put(API_URL + `api/asesores/actualizar/`, {
          nombre: datosAsesor.nombre,
          token: localStorage.getItem("token"),
          email: datosAsesor.email,
          password: datosAsesor.password,
          idioma: datosAsesor.idioma,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.error) {
            handlePopup("Se actualizo correctamente", response.data.mensaje);
            console.log("error");
          } else {
            handlePopup(
              "Se actualizo correctamente",
              "Tus datos se guardaron correctamente"
            );
            console.log("mostrar modal");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setShowModalSession(true);
          }
        });
    }
  }

  function validarDatos() {
    let valido = true;
    let nombreError = "";
    let idiomaError = "";
    let emailError = "";
    let passwordError = "";

    if (!es_valido_email(datosAsesor["email"])) {
      emailError = "El email que ingreso no es valido, favor de cambiarlo.";
      valido = false;
    }

    if (!es_valido_password(datosAsesor["password"])) {
      passwordError =
        "La contraseña que ingreso no es valida, favor de cambiarla. (min 8, max 16 caracteres)";
      valido = false;
    }

    if (datosAsesor["nombre"].length === 0) {
      nombreError = "El nombre es requerido";
      valido = false;
    }
    if (datosAsesor["email"].length === 0) {
      emailError = "El email es requerido";
      valido = false;
    }

    if (datosAsesor["password"].length === 0) {
      passwordError = "La contraseña es requerida";
      valido = false;
    }

    setErrores({
      nombre: nombreError,
      idioma: idiomaError,
      email: emailError,
      password: passwordError,
    });

    return valido;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios
      .post(API_URL + `api/asesores/obtenerDatosAsesor/`, { token: token })
      .then((response) => {
        console.log(response.data);
        setDatosAsesor(response.data.mensaje);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }, []);

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    idioma: "",
    password: "",
  });

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4">
      <div className="p-4 mt-4">
        <a
          className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          href="/"
        >
          Regresar
        </a>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold">Mis Datos</h2>
          <div className="flex flex-col h-full">
            {datosAsesor && (
              <>
                <TextField
                  id="nombre"
                  className="w-full py-10 h-12 block"
                  label="Nombre completo"
                  name="nombre"
                  variant="outlined"
                  placeholder="Ingresa tu nombre completo"
                  margin="normal"
                  value={datosAsesor.nombre}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosAsesor, nombre: e.target.value })
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
                  value={datosAsesor.email}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosAsesor, email: e.target.value })
                  }
                />
                {errores.email && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.email}
                  </span>
                )}
                <TextField
                  id="password"
                  type="password"
                  className="w-full py-10 h-12 block"
                  label="Contraseña"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  placeholder="Ingresa tu contraseña"
                  value={datosAsesor.password}
                  onChange={(e) =>
                    setDatosAsesor({ ...datosAsesor, password: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errores.password && (
                  <span className="text-red-500 text-xs py-1">
                    {errores.password}
                  </span>
                )}
                
                <InputLabel id="demo-simple-select-label">Idiomas</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  onChange={(e) => {
                    setDatosAsesor({ ...datosAsesor, idioma: e.target.value });
                  }}
                  value={datosAsesor["idioma"]}
                  margin="normal"
                >
                  <MenuItem value={"ingles"}>Ingles</MenuItem>
                  <MenuItem value={"frances"}>Frances</MenuItem>
                  <MenuItem value={"aleman"}>Aleman</MenuItem>
                  <MenuItem value={"japones"}>Japones</MenuItem>
                </Select>

                

                <button 
                className="w-64 my-4 mx-10 p-2 bg-blue-500 text-lg hover:bg-blue-700 text-white rounded-lg"
                variant="contained" 
                onClick={() => enviarDatos()}>
                  Guardar mis datos
                  </button>
              </>
            )}
          </div>
          <InputLabel className="mx-4" id="demo-simple-select-label">
                  Mis Cursos
                </InputLabel>
          <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg" onClick={() => setIsOpen(true)}>Mis cursos</button>
          {isOpen && (
            <CursosModal
              handleModalCursos={handleModalCursos}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      <div className="bg-white p-4 mt-4">
        <h2 className="text-xl font-bold">Horario</h2>
        <div className="flex-col">
          {weekDates.map((date, index) => (
            <button
              onClick={() => handleDayClick(date, days[index + 1])}
              key={index}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <ModalNuevo
        showModal={showModal}
        handleClose={handleClose}
        modalTittle={modalTittle}
        modalMessage={modalMessage}
      />
      {isModalOpen && (
        <ModalDay
          onRequestClose={() => setIsModalOpen(false)}
          fecha={selectedDate}
          dia={selectedDay}
        />
      )}
    </div>
  );
}

export default Perfil;
