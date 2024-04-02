import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
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
        <button className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg">
        Agregar Asesoría +
      </button>
    </div>
    )


}

export default Usuario;