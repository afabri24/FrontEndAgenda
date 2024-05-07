import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "./CardAsesor";
import {API_URL} from "../utils/Constantes.js";
import imageEmpty from '../assets/empty.png'
import { ModalSessionContext } from '../SessionContext';

function Asesor() {
  const [asesoriasActuales, setAsesoriasActuales] = useState([]);
  const [asesoriasPasadas, setAsesoriasPasadas] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const [reload, setReload] = useState(true)

  const fetchAsesorias = async () => {
    axios.post(`${API_URL}api/asesorias/obtenerAsesor/`, {
      token: localStorage.getItem('token'),
    })
    .then(response => {
      setAsesoriasActuales([])
      setAsesoriasPasadas([])
      const hoy = new Date();
      response.data.forEach(asesoria => {
        if (new Date(asesoria.fecha) >= hoy && asesoria.escancelada === 0) {
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
        
      </div>
  );
}

export default Asesor;
