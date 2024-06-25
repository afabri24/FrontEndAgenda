import React, { useState } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";

function SwitchAsesor({id_asesor, estado}) {
  const [label, setLabel] = useState('')
  const [status, setStatus] = useState('')
  const token = localStorage.getItem("token");

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

  function handleCambios() {
    axios.put(API_URL + `api/asesores/actualizar_estado/`, {
          estado: estado,
        },{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.error) {
            handlePopup("Se actualizo correctamente", response.data.error);
            console.log("error");
          } else {
            handlePopup("Se actualizo correctamente", response.data.mensaje);
            setPassword("")
            console.log("mostrar modal");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la peticion:", error);
        });
    
  }
    
  return (
    <div>
      <FormControlLabel
        control={<Switch onChange={handleChangeSwitch} checked={estado} />}
        label={"activo"}
    />
    </div>
  )
}

export default SwitchAsesor
