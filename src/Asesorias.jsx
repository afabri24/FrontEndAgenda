import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./Card";
import API_URL from "./utils/constantes";
import Button from '@mui/material/Button';



function Asesorias() {
  const [asesorias, setAsesorias] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        const userId = parseInt(cookies.get("id"));
        console.log(userId);
        const response = await axios.get(API_URL+`api/asesorias/obtenerAsesor/${userId}/`); // Asume que '/api/asesorias' es la URL de tu API
        setAsesorias(response.data);
        console.log(response.data.Asesorias);
      } catch (error) {
        console.error("Hubo un error al recuperar las asesorias:", error);
      }
    };

    fetchAsesorias();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 s:grid-cols-1">
      {asesorias.length > 0 ? (
        asesorias.map((asesoria) => (
          <Card
            key={asesoria.id} // Asume que cada asesoría tiene un ID único
            title={asesoria.tipo} // Asume que cada asesoría tiene un título
            description={asesoria.tema} // Asume que cada asesoría tiene una descripción
            date={asesoria.fecha} // Asume que cada asesoría tiene una fecha
          />
        ))
      ) : (
        <p>No hay asesorias disponibles o hubo un error al cargarlas.</p>
      )}
      </div>
      <h1 className="text-2xl font-bold mt-4">Hitorial de  asesorias</h1>
      <select className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2 size-1/6">
        <option value="">Ascedente</option>
        <option value="">Decediente</option>
        <option value="">Semana pasada</option>
        <option value="">Mes pasado</option>
      </select>
      <div className="grid grid-cols-5 gap-4">
        <Card
          title="Asesoría de matemáticas"
          description="Aprende a resolver ecuaciones de primer grado"
          date="2021-07-01"
        />
        <Card
          title="Asesoría de inglés"
          description="Aprende a hablar inglés como un nativo"
          date="2021-07-02"
        />
        <Card
          title="Asesoría de ciencias"
          description="Aprende a hacer experimentos científicos"
          date="2021-07-03"
        />
        
        </div>

      <button className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg">
        Agregar Asesoría +
      </button>
    </div>
  );
}

export default Asesorias;
