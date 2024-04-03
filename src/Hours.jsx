import React, { useState } from "react";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Switch } from "@mui/material";
import { Select, MenuItem } from '@mui/material';

function Hours({ horaInicio, horaFin,modalidad, selectedDate, handleDateChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [mode, setMode] = useState("presencial");

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaInicio)}
        onChange={handleDateChange}
        renderInput={(params) => <Time {...params} />}
      />
      <MobileTimePicker
        value={selectedDate}
        defaultValue={dayjs(horaFin)}
        onChange={handleDateChange}
        renderInput={(params) => <Time {...params} />}
      />

      {/* switch desactivacion hora */}
      <Switch checked={isChecked} onChange={handleSwitchChange} />

      {/* cambiar a virtal o presencial */}

      <Select value={mode} onChange={handleModeChange}>
        <MenuItem value={"presencial"}>Presencial</MenuItem>
        <MenuItem value={"virtual"}>Virtual</MenuItem>
      </Select>

      {/* eliminar horario de ese dia */}

      <button className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Eliminar
      </button>
    </LocalizationProvider>
  );
}

export default Hours;
