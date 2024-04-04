import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./CardUsuario";
import API_URL from "./utils/Constantes";


function Usuario() {
    const [asesorias, setAsesorias] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        const token = cookies.get("token");
        const response = await axios.post(
          API_URL + `api/asesorias/obtenerUsuario/`,
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

    return(
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesorias.length > 0 ? (
          asesorias.map((asesoria) => (
            <Card
              key={asesoria.id} 
              tipo={asesoria.tipo} 
              tema={asesoria.tema} 
              asesor={asesoria.nombre_asesor} 
              alumno={asesoria.alumno} 
              fecha={asesoria.fecha} 
              horaInicio={asesoria.hora_inicio} 
              horaFin={asesoria.hora_termino} 
              dia={asesoria.dia} 
              modalidad={asesoria.modalidad}
              password={asesoria.password_reunion}
              url={asesoria.url_reunion}
              reunion_id={asesoria.id_reunion}
            />
          ))
        ) : (
          <p>No hay asesorias disponibles o hubo un error al cargarlas.</p>
        )}
      </div>
      <h1 className="text-2xl font-bold mt-4">Hitorial de asesorias</h1>
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
          alumno="Juan"
          fecha="2021-10-15"
          horaInicio="10:00"
          horaFin="11:00"
          dia="Lunes"
          modalidad="Presencial"
        />
      </div>

        <a href="/registroAsesoria" className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg">
        Agregar Asesoría +
      </a>
    </div>
    )


}

export default Usuario;