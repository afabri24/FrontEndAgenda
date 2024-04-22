import React, { useContext, useState } from "react";
import { multiStepContext } from "./Contexto";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from 'axios';
import API_URL from "../utils/Constantes";
import { useNavigate } from 'react-router-dom';
import { ModalSessionContext } from '../SessionContext';
import { obtenerFechaDiaSemanaActual } from '../utils/Funciones';
import Modal from '../Modal.jsx';

function Paso4() {
  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } =
    useContext(multiStepContext);
    const { showModalSession, setShowModalSession } = useContext(ModalSessionContext);
    const navigate = useNavigate();
    const [modalMessage, setModalMessage] = useState("")

    const [showModal, setShowModal] = React.useState(false);

    async function enviarDatosConToken() {
      const token = localStorage.getItem('token');
      if (!asesoriaDatos.tema || asesoriaDatos.tema.trim() === '') {
        setModalMessage("Por favor, agrega un tema a la asesoria.")
        setShowModal(true)
        return;
      }
      
      console.log(asesoriaDatos);
      try {
        const response = await axios.post(API_URL+"api/asesorias/registrar/", { 
          ...asesoriaDatos,
          Fecha: obtenerFechaDiaSemanaActual(asesoriaDatos["dia"]),
          token: token,

        });
    
        if (!response.data.error) {
          navigate("/asesorias");
        } else {
          setModalMessage("Error al agregar tu asesoria, intentalo mas tarde")
          setShowModal(true)
          if(error.response.status === 401){
            setShowModalSession(true)
          }
        }
      } catch (error) {
        if(error.response.status === 401){
          setShowModalSession(true)
        }
      }
    }

    const handleClose = () => {
      setShowModal(false);
    }


  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="border-2 rounded-xl w-full sm:w-1/2 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="p-5">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tipo de asesoria
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue="asesoria"
              >
                <FormControlLabel
                  value="asesoria"
                  onChange={(e) =>
                    setAsesoriaDatos({ ...asesoriaDatos, tipo: "asesoria" })
                  }
                  control={<Radio />}
                  label="Asesoria"
                />
                <FormControlLabel
                  value="oral"
                  onChange={(e) =>
                    setAsesoriaDatos({ ...asesoriaDatos, tipo: "oral" })
                  }
                  control={<Radio />}
                  label="Practica oral"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="p-5">
            <TextField
              id="outlined-multiline-static"
              label="Tema"
              multiline
              placeholder="Ingresa el tema a tratar en la asesoria"
              rows={4}
              onChange={(e) =>
                setAsesoriaDatos({ ...asesoriaDatos, tema: e.target.value })
              }
              value={asesoriaDatos["tema"]}
            />
          </div>
        </div>
        <div className="flex justify-between px-10">
          <Button onClick={() => setPaso(3)}>Regresar</Button>
          <Button onClick={() => enviarDatosConToken()}>Registrar asesoria</Button>

          <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalVariant="danger"
            modalMessage={modalMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Paso4;
