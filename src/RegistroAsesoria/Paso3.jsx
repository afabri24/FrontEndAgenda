import React, { useContext } from 'react'
import { multiStepContext } from './Contexto'
import { Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function Paso3() {
  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } = useContext(multiStepContext);
  return (
    <div className='p-10'>
      <div className='border-2 rounded-xl'>
        <div className='p-5'>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Tipo de asesoria</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Asesoria" />
                <FormControlLabel value="male" control={<Radio />} label="Practica oral" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className='p-5'>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Modalidad</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="presencial"
                name="radio-buttons-group"
              >
                <FormControlLabel value="presencial" onChange={(e)=>setAsesoriaDatos({...asesoriaDatos, "modalidad": "presencial"})} control={<Radio />} label="Presencial" />
                <FormControlLabel value="virtual" onChange={(e)=>setAsesoriaDatos({...asesoriaDatos, "modalidad": "virtual"})} control={<Radio />} label="Virtual" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className='p-5'>
            <TextField
                id="outlined-multiline-static"
                label="Tema"
                multiline
                placeholder="Ingresa el tema a tratar en la asesoria"
                rows={4}
                onChange={(e)=>setAsesoriaDatos({...asesoriaDatos, "tema": e.target.value})}
                value={asesoriaDatos["tema"]}
              />
          </div>
      </div>
      <Button onClick={() => setPaso(2)} >Regresar</Button>
      <Button onClick={() => enviarDatos()} >Registrar asesoria</Button>
    </div>
  )
}

export default Paso3