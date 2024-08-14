import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "./CardAsesor";
import {API_URL} from "../utils/Constantes";
import imageEmpty from '../assets/empty.png'
import { ModalSessionContext } from '../SessionContext';
import { obtenerFechaHoy } from "../utils/Funciones.js";
import { Tooltip, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function Asesor() {
  const [asesoriasActuales, setAsesoriasActuales] = useState([]);
  const [asesoriasPasadas, setAsesoriasPasadas] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const [reload, setReload] = useState(true)
  const token = localStorage.getItem("token")

  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const fetchAsesorias = async () => {
    axios.post(`${API_URL}api/asesorias/obtenerAsesor/`, {},
      {headers: {
        'Authorization': `Bearer ${token}`,
      }}
    )
    .then(response => {
      console.log(response.data);
      setAsesoriasActuales([])
      setAsesoriasPasadas([])
      const hoy = obtenerFechaHoy()
      console.log(hoy);
      response.data.forEach(asesoria => {
        const fechaAsesoria = asesoria.fecha;
        if ((fechaAsesoria > hoy || fechaAsesoria === hoy) && asesoria.escancelada === false ) {
          setAsesoriasActuales(asesoriasActuales => [...asesoriasActuales, asesoria]);
        } else {
          setAsesoriasPasadas(asesoriasPasadas => [...asesoriasPasadas, asesoria]);
      }});
    })
    .catch(error => {
      if (error.response.status === 401) {
        setShowModalSession(true);
      }
    });
    setReload(!reload);
  };


  useEffect(() => {
    if (reload) {
      fetchAsesorias();
      setReload(false); // reset the reload state after fetching
      
    }
  }, [reload]);

  const handleReload = () => {
    setReload(true);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesoriasActuales.length > 0 ? (
          asesoriasActuales.map((asesoria) => (
            <Card
              key={asesoria.id_asesoria} 
              idAsesoria={asesoria.id_asesoria}
              tipo={asesoria.tipo} 
              tema={asesoria.tema} 
              alumno={asesoria.nombre_usuario} 
              fecha={asesoria.fecha}
              horaInicio={asesoria.hora_inicio}
              horaFin={asesoria.hora_termino} 
              dia={asesoria.dia} 
              modalidad={asesoria.modalidad} 
              curso={asesoria.curso}
              estado={'actual'}
              esCancelada={asesoria.escancelada}
              comentario={asesoria.comentario}
              asistio={asesoria.asistio}
              color={asesoria.color}
              handleReload={handleReload}
            />
          ))
        ) : (
          <>
          <div></div>
          <div className='flex flex-row w-full items-center' >
            <img className='py-20 pl-10' src={imageEmpty} alt='' />
            <p className=' w-full content-center text-5xl font-bold'  >Actualmente no cuentas con asesorias registradas</p>
          </div>
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold mt-4">Historial de asesorias</h1>
      <select className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2 size-1/6">
        <option value="">Ascedente</option>
        <option value="">Decediente</option>
        <option value="">Semana pasada</option>
        <option value="">Mes pasado</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {asesoriasPasadas.length > 0 ? (
          asesoriasPasadas.map((asesoria) => (
            <Card
              key={asesoria.id_asesoria}
              idAsesoria={asesoria.id_asesoria}
              tipo={asesoria.tipo} 
              tema={asesoria.tema} 
              alumno={asesoria.nombre_usuario} 
              fecha={asesoria.fecha} 
              horaInicio={asesoria.hora_inicio} 
              horaFin={asesoria.hora_termino} 
              dia={asesoria.dia} 
              modalidad={asesoria.modalidad}
              password={asesoria.password_reunion}
              url={asesoria.url_reunion}
              reunion_id={asesoria.id_reunion}
              funcion={fetchAsesorias}
              curso={asesoria.curso}
              handleReload={handleReload}
              estado={"pasada"}
              esCancelada={asesoria.escancelada}
              comentario={asesoria.comentario}
              asistio={asesoria.asistio}
              color={asesoria.color}
            />
          ))
        ) : (
          <>
          <div></div>
          <div className='flex flex-row w-full items-center justify-center content-center' >
            <p className='mx-8 w-full content-center justify-center text-xl font-bold'  >Actualmente no cuentas con asesorias pasadas</p>
          </div>
          </>
        )}
        </div>
        <Tooltip title="Información adicional sobre las asesorías" placement="left">
        <Fab
          color="primary"
          aria-label="info"
          style={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleClickOpenInfo}
        >
        <InfoIcon />
        </Fab>
      </Tooltip>
        <Dialog open={openInfo} onClose={handleCloseInfo}>
          <DialogTitle>Información Adicional</DialogTitle>
          <DialogContent>
          <Typography component="div">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'blue',
                    marginRight: '10px',
                  }}
                />
                Las asesorías actuales son aquellas que aún no han ocurrido y no han sido canceladas.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    marginRight: '10px',
                  }}
                />
                Las asesorías que fueron canceladas.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'orange',
                    marginRight: '10px',
                  }}
                />
                Son asesorías que ya pasaron pero falta marcar si el estudiante asistió o no asistió.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    marginRight: '10px',
                  }}
                />
                Son asesorías que ya pasaron y fueron marcadas en asistencia.
              </li>
            </ul>
            </Typography>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseInfo} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
        
      </div>
  );
}

export default Asesor;
