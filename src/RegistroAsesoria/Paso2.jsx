import React, { useContext, useEffect, useState } from "react";
import { multiStepContext } from "./Contexto";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import API_URL from "../utils/Constantes.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "../Modal.jsx";

function Paso2() {
  const [check, setCheck] = useState(true);
  const token = localStorage.getItem("token");
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    axios
      .post(API_URL + `api/asesores/obtenerCursos/`, {
        token: token,
        idAsesor: asesoriaDatos["idAsesor"],
      })
      .then((response) => {
        console.log(response.data);
        setCursos(response.data.mensaje);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
      });
  }, []);

  function validarDatos() {
    if (check) {
      console.log("valido");
    } else {
      console.log("invalido");
    }
  }

  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } =
    useContext(multiStepContext);

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="p-4 flex flex-col lg:flex-row justify-center items-center px-60">
      <div className="flex-1 mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h2>Selecciona tu curso:</h2>
        <FormControl className="">
          <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            onChange={(e) => {
              setAsesoriaDatos({ ...asesoriaDatos, idCurso: e.target.value });
            }}
            value={asesoriaDatos["idCurso"]}
            margin="normal"
          >
            {cursos && cursos.length > 0 ? (
              cursos.map((curso) => (
                <MenuItem value={curso.id_curso}>{curso.nombrecurso}</MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No hay cursos disponibles
              </MenuItem>
            )}
          </Select>

          <FormLabel id="demo-radio-buttons-group-label">Modalidad</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={asesoriaDatos["modalidad"]}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="presencial"
              onChange={(e) =>
                setAsesoriaDatos({
                  ...asesoriaDatos,
                  modalidad: "presencial",
                })
              }
              control={<Radio />}
              label="Presencial"
            />
            <FormControlLabel
              value="virtual"
              onChange={(e) =>
                setAsesoriaDatos({ ...asesoriaDatos, modalidad: "virtual" })
              }
              control={<Radio />}
              label="Virtual"
            />
          </RadioGroup>
        </FormControl>

        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setPaso(1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Button>
          <Button
            onClick={() => {
              if (!asesoriaDatos["check"]) {
                handleOpen();
              } else {
                setPaso(3);
                validarDatos();
                enviarDatos();
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Siguiente
          </Button>

          <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalVariant="danger"
            modalMessage="Por favor, acepta los términos y condiciones para continuar."
          />
        </div>
      </div>
      <div className="flex-1 pl-4">
        <div className="rounded-md p-4 bg-yellow-100 text-black shadow-lg">
          <p>- Asesorías de LUNES a VIERNES</p>
          <p>
            - Sólo registrar una práctica oral por día (si haces más de una
            práctica oral al día con diferente asesora sólo se tomará en cuenta
            una práctica oral al día para evaluación).
          </p>
          <p>- Reservar con 24 horas de anticipacion</p>
          <FormGroup>
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={asesoriaDatos["check"]}
                  onChange={(e) => {
                    setAsesoriaDatos({
                      ...asesoriaDatos,
                      check: !asesoriaDatos["check"],
                    });
                  }}
                />
              }
              label="Lei todos los terminos y condiciones"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default Paso2;
