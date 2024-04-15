import React, { useContext, useEffect, useState } from 'react'
import { multiStepContext } from './Contexto.jsx'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import API_URL from "../utils/Constantes.js";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { dias_entre_semana } from "../utils/Funciones.js"
import { obtenerFechaDiaSemanaActual } from '../utils/Funciones';
import Modal from '../Modal.jsx';



function Paso3() {

  const token = localStorage.getItem('token');
  const [horas, setHoras] = useState([])
  const [diasEntreSemana, setDiasEntreSemana] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  
  useEffect(() => {
    setDiasEntreSemana(dias_entre_semana());
    if (asesoriaDatos["dia"]) {
      axios.post(API_URL+`api/asesorias/obtenerHorasByDia/`, {
        "token": token,
        "idAsesor": asesoriaDatos["idAsesor"],
        "dia": asesoriaDatos["dia"],
        "modalidad": asesoriaDatos["modalidad"]
      })
        .then(response => {
          console.log(response.data)
          setHoras(response.data.mensaje)
        })
        .catch(error => {
          console.error("Error al obtener el producto:", error);
        });
      }else{
        console.log("bug")
      }
  },  []);

  function obtenerHorasByDia(dia) {
    axios.post(API_URL+`api/asesorias/obtenerHorasByDia/`, {
      "token": token,
      "idAsesor": asesoriaDatos["idAsesor"],
      "dia": dia,
      "modalidad": asesoriaDatos["modalidad"]
    })
      .then(response => {
        console.log(response.data)
        setHoras(response.data.mensaje)
      })
      .catch(error => {
        console.error("Error al obtener el producto:", error);
      });
  }

  function validarDatos() {
    if (!asesoriaDatos.dia || !asesoriaDatos.idDiaHora) {
      setShowModal(true);
    } else {
      // Continuar al siguiente paso
      setPaso(4);
      setAsesoriaDatos({...asesoriaDatos, "tipo": "asesoria"});
      enviarDatos();
    }
  }

  const handleClose = () => {
    setShowModal(false);
  };


  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } = useContext(multiStepContext);
  return (
    <div className='p-4 items-center justify-center flex flex-col'>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2'>
      <a className='text-blue-700 text-xl'>Dia y hora</a>
      <div className="space-y-6">
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl className='w-2/6 p-4 ' sx={{m:1}}>
              <InputLabel>Dia</InputLabel>
              <Select
              id="outlined-multiline-static"
              margin='normal'
                onChange={
                  (e)=> { setAsesoriaDatos({...asesoriaDatos, "dia": e.target.value, "idDiaHora": 0, "fecha": obtenerFechaDiaSemanaActual(e.target.value)})
                  obtenerHorasByDia(e.target.value)
                }}
                value={asesoriaDatos["dia"]}
              >
                {diasEntreSemana.map(dia =>
                    <MenuItem value={dia.valor}>{dia.dia}</MenuItem>
                )}
            </Select>
          </FormControl>
        <FormControl className='w-2/6 p-4 mx-5' sx={{m:1}}>
          <InputLabel id="demo-simple-select-label">Hora</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            margin='normal'
            onChange={
              (e)=> { setAsesoriaDatos({...asesoriaDatos, "idDiaHora": e.target.value})
            }}
            value={asesoriaDatos["idDiaHora"]}>

            {horas && horas.length > 0 ? ( horas.map( hora =>
            (
              <MenuItem value={hora.idDiaHora}>{hora.hora}</MenuItem>
            ))) :
              (<MenuItem value="" disabled>
                No hay horas disponibles
              </MenuItem>
            )}
            
          </Select>
        </FormControl>
      </Box>     
    </div>
  </div>
     
      <Button onClick={() => setPaso(2)} >Regresar</Button>
      <Button onClick={() => {validarDatos()}} >Siguiente</Button>
      <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalVariant="danger"
            modalMessage="Por favor, selecciona la hora y dia."
          />
      </div>
    </div>
  )
}

export default Paso3