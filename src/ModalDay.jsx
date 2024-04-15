import React, { useState } from "react";
import Hours from "./Hours.jsx";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import { useEffect } from "react";
import API_URL from "./utils/Constantes.js";
import ModalNuevo from "./ModalNuevo";
import Cookies from "universal-cookie";

function ModalDay({
  fecha,
  dia,
  onRequestClose,
  selectedDate
}) {
  const cookies = new Cookies();
  const [isChecked, setIsChecked] = useState(false);
  const [reload, setReload] = useState(true);

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

  const [mode, setMode] = useState(null);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const [horarios, setHorarios] = useState([]);

  const fetchHorarios = async () => {
    try {
      const response = await axios.post(
        API_URL + "api/asesorias/obtenerHorariosByAsesor/",
        {
          dia: dia.toString().toLowerCase(),
          token: localStorage.getItem("token"),
        }
      );
      setHorarios(response.data.mensaje);
      setReload(!reload);
    } catch (error) {
      console.error("Error al recuperar los horarios", error);
    }
  };
  
  useEffect(() => {
    if (reload) {
      fetchHorarios();
      setReload(false); // reset the reload state after fetching
    }
  }, [reload]);

  const handleReload = () => {
    setReload(true);
  };

  

  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);

  const handleClickRegistrar = async () => {
    const token = cookies.get("token");

    if (mode == null) {
      handlePopup("Error", "Por favor selecciona una modalidad: virtual o presencial");
      return;
    }

    if (selectedDateStart == null) {
      handlePopup("Error", "Por favor selecciona una hora de inicio");
      return;
    }

    if (selectedDateEnd == null) {
      handlePopup("Error", "Por favor selecciona una hora de fin");
      return;
    }
    const formattedDateStart = selectedDateStart
      ? selectedDateStart.format("HH:mm:ss")
      : null;
    const formattedDateEnd = selectedDateEnd
      ? selectedDateEnd.format("HH:mm:ss")
      : null;

    try {
      const response = await axios.post(
        API_URL + "api/asesores/registrarDiaHora/",
        {
          hora_inicio: formattedDateStart,
          hora_termino: formattedDateEnd,
          modalidad: mode,
          dia: dia.toString().toLowerCase(),
          token: token,
        }
      );


      if(!response.data.error){
        handlePopup("Registro exitoso", "Se agrego el nuevo horario");
        setMode(null)
        fetchHorarios();
      }else{
        alert("error al agregar el horario")
        console.error(error);
      }

      limpiarCampos()
    } catch (error) {
      console.error(error);
    }
  };

  function limpiarCampos() {
    setSelectedDateEnd(null)
    setSelectedDateStart(null)
    setMode(null)
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-xl">{fecha}</h1>
            <h2>Horas registradas:</h2>
            <div
              className=" py-10 overflow-y-auto"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {horarios &&
                horarios.map((horario, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-slate-200 shadow-md p-4 rounded-lg my-2"
                  >
                    <Hours
                      idDiaHora={horario.id_diahora}
                      horaInicio={horario.hora_inicio}
                      horaFin={horario.hora_termino}
                      selectedDate={selectedDate || horario.horaInicio}
                      modalidad={horario.modalidad}
                      handleReload={handleReload}
                      esLibre={horario.eslibre}
                      estado={horario.estado}
                      dia={dia}
                    />
                  </div>
                ))}
            </div>
            <p className="my-2 text-xl">Agregar una hora nueva</p>
            <div className="flex justify-between bg-slate-200 shadow-md p-4 rounded-lg">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  value={selectedDateStart}
                  onChange={setSelectedDateStart}
                  renderInput={(params) => <Time {...params} />}
                />
                <MobileTimePicker
                  value={selectedDateEnd}
                  onChange={setSelectedDateEnd}
                  renderInput={(params) => <Time {...params} />}
                />

                {/* cambiar a virtal o presencial */}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Modalidad</InputLabel>
                    <Select onChange={handleModeChange} value={mode} label="Modalidad" autoWidth={true}>
                      <MenuItem value={"presencial"} >Presencial</MenuItem>
                      <MenuItem value={"virtual"}>Virtual</MenuItem>
                    </Select>
                  </FormControl>

                {/* agregar horario de ese dia */}

                <button
                  className="mt-3 text-white font-bold py-2 px-4 rounded my-2 bg-green-600 hover:bg-green-700"
                  onClick={handleClickRegistrar}
                >
                  Agregar
                </button>
              </LocalizationProvider>
            </div>

            <button
              onClick={onRequestClose}
              className="mt-3 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
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

export default ModalDay;
