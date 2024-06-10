import React, { useContext } from 'react'
import { dataContext } from '../ContextoAdmin'
import { TextField, Button } from "@mui/material";

function EditarAsesor({irTabla}) {
    const { setAsesor } = useContext(dataContext)
  return (
    <div>
    <Button variant="contained" onClick={() => {setAsesor(""), irTabla() }}> Regresar</Button>
      edit
    </div>
  )
}

export default EditarAsesor
