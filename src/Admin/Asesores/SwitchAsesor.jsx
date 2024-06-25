import React, { useState } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";

function SwitchAsesor({id_asesor, estado}) {
  const [label, setLabel] = useState('')
  const [status, setStatus] = useState('')

  useState(() =>{
    
  })

  function handleChangeSwitch() {
    handleCambios();
    console.log(estado);
    setStatus(!status);
    if (status) {
      setLabelSwitch("inactivo");
      setData({ ...data, estado: "inactivo" });
    } else {
      setLabelSwitch("activo");
      setData({ ...data, estado: "activo" });
    }
  }
    
  return (
    <div>
      <FormControlLabel
        control={<Switch onChange={handleChangeSwitch} checked={label} />}
        label={"activo"}
    />
    </div>
  )
}

export default SwitchAsesor
