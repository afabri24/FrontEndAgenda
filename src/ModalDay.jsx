import React, { useState } from "react";
import Hours from "./Hours.jsx";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Switch } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import API_URL from "./utils/Constantes.js";
import Cookies from "universal-cookie";

function ModalDay({
  fecha,
  dia,
  onRequestClose,
  selectedDate,
  handleDateChange,
}) {
  const cookies = new Cookies();
  const [isChecked, setIsChecked] = useState(false);
  const [reload, setReload] = useState(true);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [mode, setMode] = useState("nulo");

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

  const handleClick = async () => {
    const token = cookies.get("token");

    if (mode == "nulo") {
      alert("Por favor selecciona una modalidad: virtual o presencial");
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
        alert("Se agrego el nuevo horario");
        fetchHorarios();
      }else{
        alert("error al agregar el horario")
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1>{fecha}</h1>
            <h2>Horas:</h2>
            <div
              className=" py-10 overflow-y-auto"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {horarios &&
                horarios.map((horario, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-slate-300 p-4 rounded-lg my-2"
                  >
                    <Hours
                      idDiaHora={horario.id_diahora}
                      horaInicio={horario.hora_inicio}
                      horaFin={horario.hora_termino}
                      selectedDate={selectedDate || horario.horaInicio}
                      handleDateChange={handleDateChange}
                      modalidad={horario.modalidad}
                      handleReload={handleReload}
                      esLibre={horario.eslibre}
                      estado={horario.estado}
                      dia={dia}
                    />
                  </div>
                ))}
            </div>
            <p>Seleccionar nueva hora</p>
            <div className="flex justify-between bg-slate-300 p-4 rounded-lg">
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

                <Select value={mode} onChange={handleModeChange}>
                  <MenuItem value={"nulo"}>Modalidad</MenuItem>
                  <MenuItem value={"presencial"}>Presencial</MenuItem>
                  <MenuItem value={"virtual"}>Virtual</MenuItem>
                </Select>

                {/* agregar horario de ese dia */}

                <button
                  className="mt-3 text-white font-bold py-2 px-4 rounded bg-green-400 hover:bg-green-700"
                  onClick={handleClick}
                >
                  Agregar
                </button>
              </LocalizationProvider>
            </div>

            <button
              onClick={onRequestClose}
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDay;
