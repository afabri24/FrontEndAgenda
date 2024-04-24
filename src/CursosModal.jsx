import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import API_URL from "./utils/Constantes.js";
import Chip from "@mui/material/Chip";
import { ModalSessionContext } from "./SessionContext";

function CursosModal({ handleModalCursos }) {
  //Apartado cursos
  const [nuevoCurso, setNuevoCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const { setShowModalSession } = useContext(ModalSessionContext);
  const token = localStorage.getItem("token");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    axios
      .post(API_URL + "api/asesores/obtenerCursos/", { token: token })
      .then((response) => {
        console.log(response.data.mensaje);
        setCursos(response.data.mensaje);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
  }, []);

  function handleDeleteCurso(id) {}

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-md p-8 max-w-lg min-w-100">
        {cursos &&
          cursos.map((curso) => (
            <Chip
              key={curso.id_curso}
              label={curso.nombrecurso}
              onDelete={() => handleDeleteCurso(curso.id)}
              style={{
                margin: "5px",
                backgroundColor: "#f5f5f5",
                color: "#333",
              }}
            />
          ))}

        <TextField
          label="Nuevo curso"
          value={nuevoCurso}
          onClick={(e) => e.stopPropagation()} 
          onChange={(e) => {
            setNuevoCurso(e.target.value);
            setShowButton(e.target.value !== "");
          }}
        />

        {showButton && (
          <button
            onClick={() => {
              setCursos([...cursos, nuevoCurso]);
              setNuevoCurso("");
              setShowButton(false);
            }}
          >
            Guardar
          </button>
        )}

        <button
          className="hover:bg-slate-200 text-cyan-500"
          onClick={handleModalCursos}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default CursosModal;
