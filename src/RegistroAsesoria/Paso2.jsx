import React, { useContext, useEffect, useState } from "react";
import { multiStepContext } from "./Contexto";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import {API_URL} from "../utils/Constantes.js";
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
import { ModalSessionContext } from '../SessionContext';

function Paso2() {
  const [check, setCheck] = useState(true);
  const token = localStorage.getItem("token");
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalCurso, setShowModalCurso] = React.useState(false);
  const { showModalSession, setShowModalSession } = useContext(ModalSessionContext);

  useEffect(() => {
    axios
      .post(API_URL + `api/usuarios/obtenerCursos/`, {
        token: token,
        idAsesor: asesoriaDatos["idAsesor"],
      })
      .then((response) => {
        console.log(response.data.mensaje);
        setCursos(response.data.mensaje);
      })
      .catch(error => {
        if(error.response.status === 401){
          setShowModalSession(true)
        }
    });
  }, []);


  function validarDatos() {
    if (asesoriaDatos.idCurso) {
      console.log("Curso seleccionado:", asesoriaDatos.idCurso);
    } else {
      setShowModalCurso(true);
      console.log("Curso no seleccionado");
      return false;
    }
    return true;
  }

  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } =
    useContext(multiStepContext);

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseCurso = () => {
    setShowModalCurso(false);
  }

  return (
    <div className="p-4 flex flex-col lg:flex-row justify-center items-center px-60">
      <div className="flex-1 mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-blue-700">Selecciona tu curso:</h2>
        <FormControl className="">
          <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            onChange={(e) => {
              setAsesoriaDatos({ ...asesoriaDatos, idCurso: e.target.value });
            }}
            value={asesoriaDatos["idCurso"]}
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
                validarDatos();
                if(validarDatos()){
                  setPaso(3);
                  enviarDatos();
                }else {
                  console.log("Datos no validos");
                }
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
          <Modal
            showModal={showModalCurso}
            handleClose={handleCloseCurso}
            modalVariant="danger"
            modalMessage="Por favor, selecciona un curso para continuar."
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
