import React, { useContext, useEffect, useState } from 'react'
import { multiStepContext } from './Contexto.jsx'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import {API_URL} from "../utils/Constantes.js";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { obtenerFechaDiaSemanaActual } from '../utils/Funciones';
import { obtenerMensaje } from '../utils/Funciones';
import Modal from '../Modal.jsx';
import { ModalSessionContext } from '../SessionContext';


function Paso3() {

  const token = localStorage.getItem('token');
  const [horas, setHoras] = useState([])
  const [diasEntreSemana, setDiasEntreSemana] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const [mensajeDia, setMensajeDia] = useState();
  const [mensajeModal, setMensajeModal] = useState("");
  
  useEffect(() => {
    console.log(asesoriaDatos)
    if (asesoriaDatos["dia"]) {
      axios.post(API_URL+`api/asesorias/obtenerHorasByDia/`, {
        "idAsesor": asesoriaDatos["idAsesor"],
        "dia": asesoriaDatos["dia"],
        "modalidad": asesoriaDatos["modalidad"]
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response.data)
          setHoras(response.data.mensaje)
        })
        .catch(error => {
          if(error.response.status === 401){
            setShowModalSession(true)
          }
      });
      axios.post(API_URL+`api/asesorias/obtenerDisponibilidadHorarios/`, {
        "idAsesor": asesoriaDatos["idAsesor"],
        "modalidad": asesoriaDatos["modalidad"]
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response.data)
          setDiasEntreSemana(response.data.mensaje)
        })
        .catch(error => {
          if(error.response.status === 401){
            setShowModalSession(true)
          }
      });
      setMensajeDia(obtenerMensaje(asesoriaDatos['dia2']));
      }else{
        console.log("bug")
      }
  },  []);

  function obtenerHorasByDia(dia) {
    axios.post(API_URL+`api/asesorias/obtenerHorasByDia/`, {
      "idAsesor": asesoriaDatos["idAsesor"],
      "dia": dia,
      "modalidad": asesoriaDatos["modalidad"]
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setHoras(response.data.mensaje)
      })
      .catch(error => {
        if(error.response.status === 401){
          setShowModalSession(true)
        }
    });
  }

  function verificarDisponibilidadDia(dia) {
    axios.post(API_URL+`api/asesorias/verificarDisponibilidadDia/`, {
      "dia": dia,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('horas: ' + response.data)
        setHoras(response.data.mensaje)
        setMensajeModal("Por favor, selecciona la hora y dia.")
        setShowModal(true);
      })
      .catch(error => {
        if(error.response.status === 401){
          setShowModalSession(true)
        }
    });
  }
  function validarDatos() {

    if (!asesoriaDatos.dia || !asesoriaDatos.idDiaHora) {
      setMensajeModal("Por favor, selecciona la hora y dia.")
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

  const handleDia = (e) => {
    setAsesoriaDatos({
      ...asesoriaDatos, 
      "dia": e.target.value, 
      "idDiaHora": 0, 
      "fecha": obtenerFechaDiaSemanaActual(e.target.value)})
    obtenerHorasByDia(e.target.value)
    verificarDisponibilidadDia(e.target.value)
  }


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
                onChange={(e)=> { handleDia(e)}}
                value={asesoriaDatos["dia"]}
              >
                {diasEntreSemana.map(dia =>
                    <MenuItem value={dia.valor}>{dia.dia}
                    <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: dia.tieneHoras ? (dia.ocupado ? 'orange' : 'green') : 'red',
                      marginLeft: '10px',
                    }}
                  /></MenuItem>
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
      <a>{mensajeDia}</a>   
      <div className='flex flex-row'>
        <span
          style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'green',
          marginTop: '8px',
          marginRight: '3px',
          }} />Dias con horas disponibles
          <span
          style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'orange',
          marginTop: '8px',
          marginRight: '3px',
          marginLeft: '3px',
          }} />Dia ocupado
          <span
          style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          marginTop: '8px',
          marginRight: '3px',
          marginLeft: '3px',
          }} />Dia sin horas
      </div>
    </div>
  </div>
     
      <Button onClick={() => setPaso(2)} >Regresar</Button>
      <Button onClick={() => {validarDatos()}} >Siguiente</Button>
      <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalVariant="danger"
            modalMessage={mensajeModal}
          />
      </div>
    </div>
  )
}

export default Paso3