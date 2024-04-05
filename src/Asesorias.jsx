import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./CardAsesor";
import API_URL from "./utils/Constantes";
import Button from "@mui/material/Button";

function Asesorias() {
  const [asesorias, setAsesorias] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        const token = cookies.get("token");
        const response = await axios.post(
          API_URL + `api/asesorias/obtenerAsesor/`,
          {
            token: token,
          }
        );
        setAsesorias(response.data);
      } catch (error) {
        console.error("Hubo un error al recuperar las asesorias:", error);
      }
    };

    fetchAsesorias();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesorias.length > 0 ? (
          asesorias.map((asesoria) => (
            <Card
              key={asesoria.id} // Asume que cada asesoría tiene un ID único
              tipo={asesoria.tipo} // Asume que cada asesoría tiene un título
              tema={asesoria.tema} // Asume que cada asesoría tiene una descripción
              asesor={asesoria.asesor} // Asume que cada asesoría tiene un asesor
              alumno={asesoria.alumno} // Asume que cada asesoría tiene un alumno
              fecha={asesoria.fecha} // Asume que cada asesoría tiene una fecha
              horaInicio={asesoria.horaInicio} // Asume que cada asesoría tiene una hora de inicio
              horaFin={asesoria.horaFin} // Asume que cada asesoría tiene una hora de fin
              dia={asesoria.dia} // Asume que cada asesoría tiene un día
              modalidad={asesoria.modalidad} // Asume que cada asesoría tiene una modalidad
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
