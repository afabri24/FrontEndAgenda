import React, { useState } from "react";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

function Hours({horaInicio,horaFin, selectedDate, handleDateChange}) {


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

      {/* cambiar a virtal o presencial */}

      {/* eliminar horario de ese dia */}
    </LocalizationProvider>
  );
}

export default Hours;
