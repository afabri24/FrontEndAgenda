import React, { useContext, useEffect, useState } from 'react'
import { multiStepContext } from './Contexto'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import API_URL from "../utils/Constantes.js";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


function Paso2() {

  const [check, setCheck] = useState(true)
  const token = localStorage.getItem('token');
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    axios.post(API_URL+`api/asesores/obtenerCursos/`, {
      "token": token,
      "idAsesor": asesoriaDatos["idAsesor"]
    })
      .then(response => {
        console.log(response.data)
        setCursos(response.data.mensaje)
      })
      .catch(error => {
        console.error("Error al obtener el producto:", error);
      });
  }, []);

  function validarDatos() {

      if(check){
        console.log("valido")
      }else {
        console.log("invalido")
      }
  }


  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } = useContext(multiStepContext);
  return (
    <div className='p-4'>
      <a className='text-blue-700 text-xl'>Curso y modalidad</a>
      <div className='p-5'>
      
        <FormControl>

        <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            onChange={
              (e)=> { setAsesoriaDatos({...asesoriaDatos, "idCurso": e.target.value})
            }}
            value={asesoriaDatos["idCurso"]}>

            {cursos && cursos.length > 0 ? ( cursos.map( curso =>
            (
              <MenuItem value={curso.id_curso}>{curso.nombrecurso}</MenuItem>
            ))) :
              (<MenuItem value="" disabled>
                No hay cursos disponibles
              </MenuItem>
            )}
            
          </Select>





          <FormLabel id="demo-radio-buttons-group-label">Modalidad</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={asesoriaDatos["modalidad"]}
              name="radio-buttons-group"
            >
            <FormControlLabel value="presencial" onChange={(e)=>setAsesoriaDatos({...asesoriaDatos, "modalidad": "presencial"} )} control={<Radio />} label="Presencial" />
            <FormControlLabel value="virtual" onChange={(e)=>setAsesoriaDatos({...asesoriaDatos, "modalidad": "virtual"})} control={<Radio />} label="Virtual" />
          </RadioGroup>
        </FormControl>
      </div>
      
      <div className="space-y-6">

         
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
          <FormControlLabel required control={
            <Checkbox 
              checked={asesoriaDatos["check"]}
              onChange={(e) =>{
                setAsesoriaDatos({...asesoriaDatos, "check": !asesoriaDatos["check"]})
              }}/>} 
              label="Lei todos los terminos y condiciones" />
          </FormGroup>
      </div>
      <Button onClick={() => setPaso(1)} >Regresar</Button>
      <Button onClick={() => {setPaso(3), validarDatos(), enviarDatos()}} >Siguiente</Button>
    </div>
  )
}

export default Paso2