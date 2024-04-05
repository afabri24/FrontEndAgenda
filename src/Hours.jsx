import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Switch } from "@mui/material";
import { Select, MenuItem } from '@mui/material';
import axios from "axios";

function Hours({idDiaHora, horaInicio, horaFin,modalidad, selectedDate, handleDateChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      try {
        const response = await axios.post(
          API_URL + "api/asesores/eliminarDiaHora/",
          {
            id_diahora: idDiaHora,
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
    }
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaInicio, "HH:mm")}
        onChange={handleDateChange}
        renderInput={(params) => <Time {...params} />}
        disabled={!isChecked}
      />
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaFin, "HH:mm")}
        onChange={handleDateChange}
        renderInput={(params) => <Time {...params} />}
        disabled={!isChecked}
      />

      {/* switch desactivacion hora */}
      <div className="content-center">Editar?</div>
      <Switch checked={isChecked} onChange={handleSwitchChange} />

      {/* cambiar a virtal o presencial */}

      <Select value={modalidad} onChange={handleModeChange}>
        <MenuItem value={"presencial"}>Presencial</MenuItem>
        <MenuItem value={"virtual"}>Virtual</MenuItem>
      </Select>

      {/* eliminar horario de ese dia */}

      <button className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDelete}>
        Eliminar
      </button>
    </LocalizationProvider>
  );
}

export default Hours;
