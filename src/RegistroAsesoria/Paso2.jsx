import React, { useContext } from 'react'
import { multiStepContext } from './Contexto'
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function Paso2() {
  const { setPaso, asesoriaDatos, setAsesoriaDatos } = useContext(multiStepContext);
  return (
    <div className='p-4'>
      <a className='text-blue-700 text-xl'>Dia y hora</a>
      <div className="space-y-6">
            <div>
            <Box sx={{ minWidth: 120 }}>
      <FormControl className='w-1/3'>
        <InputLabel id="demo-simple-select-label">Dia</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={asesoriaDatos["dia"]}
        >
          <MenuItem value={"lunes"}>Lunes</MenuItem>
          <MenuItem value={"martes"}>Martes</MenuItem>
          <MenuItem value={"jueves"}>Jueves</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='w-1/3 p-4'>
        <InputLabel id="demo-simple-select-label">Hora</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={asesoriaDatos["hora"]}
        >
          <MenuItem value={10}>10:00 a 11:00</MenuItem>
          <MenuItem value={20}>11:00 a 12:00</MenuItem>
          <MenuItem value={30}>14:00 a 15:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
            </div>
      </div>
      <div className='w-1/3 border-2 rounded-md'>
      - Asesorías de LUNES a VIERNES
      - Sólo registrar una práctica oral 
        por día (si haces más de una práctica 
        oral al día con diferente asesora 
        sólo se tomará en cuenta una 
        práctica oral al día para 
        evaluación).
      - Reservar con 24 horas de 
        anticipacion
        <FormGroup>
          <FormControlLabel required control={<Checkbox />} label="Lei todos los terminos y condiciones" />
        </FormGroup>
      </div>
      <Button onClick={() => setPaso(1)} >Regresar</Button>
      <Button onClick={() => setPaso(3)} >Siguiente</Button>
    </div>
  )
}

export default Paso2