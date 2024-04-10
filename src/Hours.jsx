import React, { useState, useEffect ,useRef} from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Switch } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import API_URL from "./utils/Constantes";
import Cookies from "universal-cookie";


function Hours({
  idDiaHora,
  horaInicio,
  horaFin,
  modalidad,
  dia,
  esLibre,
  estado,
  selectedDate,
  handleDateChange,
  handleReload,
}) {
  const cookies = new Cookies();
  
  const [isChecked, setIsChecked] = useState(true)
  const [mode, setMode] = useState(modalidad)
  const [status, setStatus] = useState(estado)

  const isFirstRender = useRef(true);

  
  const handleSwitchChange = (event) => {
    setStatus(event.target.checked ? "activo" : "inactivo");
    setIsChecked(event.target.checked)
    updateData()
  };
  
  const handleModeChange = (event) => {
    setMode(event.target.value);
    updateData()
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      try {
        const response = await axios({
          method: "DELETE",
          url: API_URL + "api/asesores/eliminarDiaHora/",
          data: {
            id_diahora: idDiaHora,
            token: token,
          },
        });
        if (!response.data.error) {
          alert("Horario eliminado");
          handleReload();
        } else {
          alert("Hubo un error al eliminar el horario");
        }
      } catch (error) {
        console.error("Error al eliminar el horario", error);
      }
    }
  };

  const updateData = async () => {
    console.log("idDiaHora", idDiaHora);
    console.log("dia", dia);
    console.log("horaInicio", horaInicio);
    console.log("horaFin", horaFin);
    console.log("modo", modo);
    console.log("esLibre", esLibre);
    console.log("estado", bloqueado);
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "PUT",
        url: API_URL + "api/asesores/actualizarDiaHora/",
        data: {
          idDiaHora: idDiaHora,
          dia: dia.toString().toLowerCase(),
          hora_inicio: horaInicio,
          hora_termino: horaFin,
          modalidad: modo,
          esLibre: esLibre,
          estado: bloqueado,
          token: token,
        },
      });

      console.log(response.data);
      if (!response.data.error) {
        alert("Datos actualizados");
        handleReload();
      } else {
        alert("Hubo un error al actualizar los datos");
      }
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaInicio, "HH:mm")}
        onChange={handleDateChange}
        // onAccept={handleDateChangeStart}
        renderInput={(params) => <Time {...params} />}
      />
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaFin, "HH:mm")}
        onChange={handleDateChange}
        // onAccept={handleDateChangeEnd}
        renderInput={(params) => <Time {...params} />}
      />

      {/* switch desactivacion hora */}
      <Switch checked={status} onChange={handleSwitchChange} />

      {/* cambiar a virtal o presencial */}

      <Select value={mode} onChange={handleModeChange}>
        <MenuItem value={"presencial"}>Presencial</MenuItem>
        <MenuItem value={"virtual"}>Virtual</MenuItem>
      </Select>

      {/* eliminar horario de ese dia */}

      <button
        className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Eliminar
      </button>
    </LocalizationProvider>
  );
}

export default Hours;
