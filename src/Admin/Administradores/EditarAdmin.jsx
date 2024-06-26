import React, { useContext, useState, useCallback, useEffect } from 'react'
import { dataContext } from '../ContextoAdmin'
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "./../../utils/Constantes";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { es_valido_email } from "../../utils/Validadores";
import ModalNuevo from "../../ModalNuevo";


function EditarAdmin({irTabla}) {
  const token = localStorage.getItem('token');
    const { setAdmin, admin } = useContext(dataContext)

   //Modal para errores, alertas
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState("");
   const [modalTittle, setModalTittle] = useState("");

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        limpiarErrores()
        if(validarCampos()){
        
    
          try {
            const response = await axios.patch(API_URL+"api/admin/actualizarAdmin/", admin,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
    
              handlePopup("Actualizado", 'Los datos del admin fueron actualizados correctamente', true);

          } catch (error) {
            handlePopup("Error", "Ocurrio un error al actualizar los datos" , true);
          }
        }
      };

      const [errores, setErrores] = useState({
        nombre: "",
        email: "",
      });

      const handleChange = (e) => {
        setAdmin({
          ...admin,
          [e.target.name]: e.target.value,
        });
      };

      function validarCampos() {
    
        let valido = true;
        let nombreError = '';
        let emailError = '';
    
        if(admin.nombre.length === 0){
          nombreError = '*Campo requerido'
          valido = false
        }
    
        if(admin.email.length === 0){
          emailError = '*Campo requerido'
          valido = false
        }
    
        if (!es_valido_email(admin.email)) {
          emailError = '*El correo electronico no es valido'
          valido = false
        }
    
    
        setErrores({
          nombre: nombreError,
          email: emailError,
        });
        return valido;
      }
    
      function limpiarErrores() {
        errores.nombre =  "";
        errores.email = "";
      }
  return (
    <div>
      
    <Button variant="contained" onClick={() => { irTabla() }}> Regresar</Button>

  <div className="flex justify-center items-center">
  <div
        className="w-1/2 p-4 border-2 border-gray-300 rounded-md">
    
      <h1 className="text-center mb-4">Editar Administrador</h1>
      <form onSubmit={handleSubmit}>

        <TextField
          name="nombre"
          label="Nombre"
          margin="normal"
          fullWidth
          value={admin.nombre}
          onChange={handleChange}
        />
        {errores.nombre && (
            <span className="text-red-500 text-xs py-1">
              { errores.nombre }
            </span>
          )}
       
        <TextField
          name="email"
          label="Email"
          margin="normal"
          fullWidth
          value={admin.email}
          onChange={handleChange}
        />
        {errores.email && (
            <span className="text-red-500 text-xs py-1">
              { errores.email }
            </span>
          )}
       
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar Datos
        </Button>
      </form>
      </div>
    </div>
    <ModalNuevo
        showModal={showModal}
        handleClose={handleClose}
        modalTittle={modalTittle}
        modalMessage={modalMessage}
      />

  </div>
  )
}

export default EditarAdmin
