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
        console.log(response.data);
      } catch (error) {
        console.error("Hubo un error al recuperar las asesorias:", error);
      }
    };

    fetchAsesorias();
  }, []);

    return(
    <div>
        <div className="grid grid-cols-5 gap-4 s:grid-cols-1">
        {asesorias.length > 0 ? (
          asesorias.map((asesoria) => (
            <Card
            qdwwedwedwe
              key={asesoria.id} // Asume que cada asesoría tiene un ID único
              tipo={asesoria.tipo} // Asume que cada asesoría tiene un título
              tema={asesoria.tema} // Asume que cada asesoría tiene una descripción
              asesor={asesoria.nombre_asesor} // Asume que cada asesoría tiene un asesor
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
        <button className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg">
        Agregar Asesoría +
      </button>
    </div>
    )


}

export default Usuario;