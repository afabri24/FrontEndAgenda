import React, { useState, useEffect } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";
import axios from 'axios';
import { API_URL } from '../../utils/Constantes';
import ModalNuevo from '../../ModalNuevo';


function SwitchAsesor({id_asesor, activo}) {
  const [label, setLabel] = useState('')
  const token = localStorage.getItem("token");
  const [estado, setEstado] = useState(activo)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);


  function handleChangeSwitch() {
    handleCambios();
    
  }
  function cambiarLabel() {
    if (estado) {
      setLabel("inactivo");
    } else {
      setLabel("activo");
    }
  }

  useEffect(() =>{
    if (estado) {
      setLabel("activo");
    } else {
      setLabel("inactivo");
    }
    console.log(estado)
  }, [])

  function handleCambios() {
    axios.patch(API_URL + `api/admin/estadoAsesor/`, {
          id_asesor: id_asesor
        },{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.error) {
            handlePopup('No se puede realizar la accion', response.data.mensaje);
            console.log("error");
          } else {
            handlePopup('Se cambio el estado correctamente', response.data.mensaje);
            setEstado(!estado)
            cambiarLabel()
            console.log("mostrar modal");
            
          }
        })
        .catch((error) => {
          console.error("Error al realizar la peticion:", error);
        });
    
  }
    
  return (
    <div>
      <FormControlLabel
        control={<Switch onChange={handleChangeSwitch} checked={estado} />}
        label={label}
    />
    <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
    </div>
  )
}

export default SwitchAsesor
