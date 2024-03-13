import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./Card";

function Asesorias() {
  const [asesorias, setAsesorias] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        const userId = cookies.get("userId"); // Asume que 'userId' es el nombre de tu cookie
        const response = await axios.post("/api/asesorias", { userId }); // Asume que '/api/asesorias' es la URL de tu API
        setAsesorias(response.data);
      } catch (error) {
        console.error("Hubo un error al recuperar las asesorias:", error);
      }
    };

    fetchAsesorias();
  }, []);

  return (
    <div>
      {asesorias.length > 0 ? (
        asesorias.map((asesoria) => (
          <Card
            key={asesoria.id} // Asume que cada asesoría tiene un id único
            title={asesoria.title} // Asume que cada asesoría tiene un título
            description={asesoria.description} // Asume que cada asesoría tiene una descripción
            date={asesoria.date} // Asume que cada asesoría tiene una fecha
          />
        ))
      ) : (
        <p>No hay asesorias disponibles o hubo un error al cargarlas.</p>
      )}
    </div>
  );
}

export default Asesorias;
