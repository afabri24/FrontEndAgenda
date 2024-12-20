import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import ModalDay from "./ModalDay";
import { API_URL } from "./utils/Constantes";
import ModalNuevo from "./ModalNuevo";
import { es_valido_email, es_valido_password } from "./utils/Validadores.js";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { ModalSessionContext } from "./SessionContext";
import CursosModal from "./CursosModal.jsx";
import ZoomDatosModal from "./ZoomDatosModal.jsx";
import { FaCloudDownloadAlt } from "react-icons/fa";
import ModalReporte from "./components/ModalReporte.jsx";
import { MoonLoader } from "react-spinners";

function Perfil() {
  const token = localStorage.getItem("token");
  const [datosAsesor, setDatosAsesor] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");
  const { showModalSession, setShowModalSession } =
    useContext(ModalSessionContext);

  const [modalReporte, setModalReporte] = useState(false);

  const handleModalReporteOpen = () => {
    console.log("abrir modal reporte");
    setModalReporte(true);
  };

  const handleModalReporteClose = () => {
    console.log("cerrar modal reporte");
    setModalReporte(false);
  };

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

  const [isOpenZoom, setIsOpenZoom] = useState(false);

  const handleModalCursos = () => {
    setIsOpen(false);
  };

  const handleModalZoom = () => {
    setIsOpenZoom(false);
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
        .put(
          API_URL + `api/asesores/actualizar/`,
          {
            nombre: datosAsesor.nombre,
            email: datosAsesor.email,
            idioma: datosAsesor.idioma,
            fotoBase64: datosAsesor.fotoBase64,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setDatosAsesor((prevForm) => ({
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
        setDatosAsesor((prevForm) => ({
          ...prevForm,
          fotoBase64: reader.result,
        }));
      };
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        reader.readAsDataURL(file);
      } else {
        alert("Solo se permiten archivos PNG, JPG y JPEG");
      }
    }
  };

  function validarDatos() {
    let valido = true;
    let nombreError = "";
    let idiomaError = "";
    let emailError = "";

    if (!es_valido_email(datosAsesor["email"])) {
      emailError = "El email que ingreso no es valido, favor de cambiarlo.";
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

    setErrores({
      nombre: nombreError,
      idioma: idiomaError,
      email: emailError,
    });

    return valido;
  }

  const fetchDatosAsesor = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        API_URL + `api/asesores/obtenerDatosAsesor/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setDatosAsesor(response.data.mensaje);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowModalSession(true);
      } else {
        setError(
          "Hubo un problema al cargar los datos del perfil. Por favor, inténtalo de nuevo."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatosAsesor();
  }, []);

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    idioma: "",
  });

  return (
    <div className="container mx-auto grid md:grid-cols-2 grid-cols-1 gap-4">
      <div className="p-4 mt-4">
        <a
          className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          href="/asesorias"
        >
          Regresar
        </a>
        <div className="flex mt-3">
          <div className="flex col-auto">
            <div>
              <InputLabel className="mx-4" id="demo-simple-select-label">
                Mis Cursos
              </InputLabel>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                Mis cursos
              </button>
              {isOpen && (
                <CursosModal
                  handleModalCursos={handleModalCursos}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            <div>
              <InputLabel className="mx-4" id="demo-simple-select-label">
                Datos de reunion zoom
              </InputLabel>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg"
                onClick={() => setIsOpenZoom(true)}
              >
                Reunion Zoom
              </button>

              {isOpenZoom && (
                <ZoomDatosModal
                  handleModalZoom={handleModalZoom}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            <div>
              <InputLabel className="mx-4" id="demo-simple-select-label">
                Reporte mensual de asesorias
              </InputLabel>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg flex"
                onClick={handleModalReporteOpen}
              >
                <FaCloudDownloadAlt className="mr-2" />
                Descargar reporte mensual
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <MoonLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-red-500">{error}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white p-3 m-2 rounded-lg"
              onClick={fetchDatosAsesor}
            >
              Recargar Perfil
            </button>
          </div>
        ) : (
          <div className="bg-white p-4">
            <h2 className="text-xl font-bold">Mis Datos</h2>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
              {datosAsesor && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px dashed gray",
                    borderRadius: "5px",
                    height: "300px",
                    width: "300px",
                    overflow: "hidden",
                  }}
                >
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Ocultar el input de archivo
                    id="fileInput" // Agregar un id para poder hacer referencia a él
                  />
                  <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                    {" "}
                    <img
                      src={
                        datosAsesor.fotoBase64 ||
                        "https://via.placeholder.com/400"
                      } // Usar una imagen de marcador de posición si no hay ninguna imagen cargada
                      alt="Haz clic o arrastra una imagen aquí para agregarla"
                      className="object-contain h-full w-full" // Hacer que la imagen llene el div
                    />
                  </label>
                  {errores.fotoBase64 && (
                    <span className="text-red-500 text-xs py-1">
                      {errores.fotoBase64}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-col">
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
                        setDatosAsesor({
                          ...datosAsesor,
                          nombre: e.target.value,
                        })
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
                        setDatosAsesor({
                          ...datosAsesor,
                          email: e.target.value,
                        })
                      }
                    />
                    {errores.email && (
                      <span className="text-red-500 text-xs py-1">
                        {errores.email}
                      </span>
                    )}

                    <InputLabel id="demo-simple-select-label">
                      Idiomas
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      onChange={(e) => {
                        setDatosAsesor({
                          ...datosAsesor,
                          idioma: e.target.value,
                        });
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
                      onClick={() => enviarDatos()}
                    >
                      Guardar mis datos
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
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
      <ModalReporte open={modalReporte} handleClose={handleModalReporteClose} />
    </div>
  );
}

export default Perfil;
