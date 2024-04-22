import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./CardAsesor";
import API_URL from "./utils/Constantes";
import Button from "@mui/material/Button";
import { ModalSessionContext } from './SessionContext';

function Asesorias() {
  const [asesorias, setAsesorias] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);


  useEffect(() => {
    axios.post(`${API_URL}api/asesorias/obtenerAsesor/`, {
      token: localStorage.getItem('token'),
  })
    .then(response => {
      setAsesorias(response.data);
    })
    .catch(error => {
      if (error.response.status === 401) {
        setShowModalSession(true);
      }
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesorias.length > 0 ? (
          asesorias.map((asesoria) => (
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
            />
          ))
        ) : (
          <p>No hay asesorias disponibles o hubo un error al cargarlas.</p>
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
        <Card
          tipo="Ingles 2"
          tema="verbo to be"
          asesor="Roxana"
          alumno="María García"
          fecha="2021-10-20"
          horaInicio="10:00"
          horaFin="11:00"
          dia="Lunes"
          modalidad="Presencial"
        />
        <Card
          tipo="Ingles 2"
          tema="verbo to be"
          asesor="Roxana"
          alumno="María García"
          fecha="2021-10-20"
          horaInicio="10:00"
          horaFin="11:00"
          dia="Lunes"
          modalidad="virtual"
          link={"https://meet.google.com/abc-123"}
        />

        
      </div>
    </div>
  );
}

export default Asesorias;
