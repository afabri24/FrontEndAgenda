import React,{ useState,useEffect } from "react";

import axios from "axios";

import API_URL from "./utils/Constantes.js";

function ObtenerAsesores() {
  const [asesores, setAsesores] = useState([]);

  useEffect(() => {
    axios
      .post(API_URL + "api/asesores/obtenerAsesores/")
      .then((response) => {
        console.log(response.data.mensaje);
        setAsesores(response.data.mensaje);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return(
    <div>
      <h1>Asesores</h1>
      <ul>
        {asesores.map((asesor) => (
          <li key={asesor.id}>
            <p>Nombre: {asesor.nombre}</p>
            <p>Idioma: {asesor.idioma}</p>
            <p>Email: {asesor.email}</p>
            <p>Password: {asesor.password}</p>
            <img src={asesor.fotoBase64} alt="Foto del asesor" />
          </li>
        ))}
      </ul>
    </div>
  );

}

export default ObtenerAsesores;