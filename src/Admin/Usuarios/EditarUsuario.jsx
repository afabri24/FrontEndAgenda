import React, { useContext, useState, useCallback, useEffect } from 'react'
import { dataContext } from '../ContextoAdmin'
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "./../../utils/Constantes";
import ModalNuevo from "../../ModalNuevo";
import { es_valido_email } from "../../utils/Validadores";

function EditarUsuario({irTabla}) {

    const token = localStorage.getItem('token');
    const { setUsuario, usuario } = useContext(dataContext)

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
            const response = await axios.patch(API_URL+"api/admin/actualizarUsuario/", usuario,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
    
              handlePopup("Actualizado", 'Los datos del usuario fueron actualizados correctamente', true);

          } catch (error) {
            handlePopup("Error", "Ocurrio un error al actualizar los datos" , true);
          }
        }
      };

      const [errores, setErrores] = useState({
        nombre: "",
        email: "",
        matricula: "",
      });

      const handleChange = (e) => {
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value,
        });
      };

      function validarCampos() {
    
        let valido = true;
        let nombreError = '';
        let emailError = '';
        let matriculaError = '';
    
        if(usuario.nombre.length === 0){
          nombreError = '*Campo requerido'
          valido = false
        }
    
        if(usuario.matricula.length === 0){
          idiomaError = '*Campo requerido'
          valido = false
        }
    
        if(usuario.email.length === 0){
          emailError = '*Campo requerido'
          valido = false
        }
    
        if (!es_valido_email(usuario.email)) {
          emailError = '*El correo electronico no es valido'
          valido = false
        }
    
    
        setErrores({
          nombre: nombreError,
          email: emailError,
          matricula: matriculaError,
        });
        return valido;
      }
    
      function limpiarErrores() {
        errores.nombre =  "";
        errores.email = "";
        errores.matricula = "";
      }

  return (
    <div>
      
    <Button variant="contained" onClick={() => { irTabla() }}> Regresar</Button>

  <div className="flex justify-center items-center">
  <div
        className="w-1/2 p-4 border-2 border-gray-300 rounded-md">
    
      <h1 className="text-center mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit}>

        <TextField
          name="nombre"
          label="Nombre"
          margin="normal"
          fullWidth
          value={usuario.nombre}
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
          value={usuario.email}
          onChange={handleChange}
        />
        {errores.email && (
            <span className="text-red-500 text-xs py-1">
              { errores.email }
            </span>
          )}
        <TextField
          name="matricula"
          label="Matricula"
          margin="normal"
          fullWidth
          value={usuario.matricula}
          onChange={handleChange}
          type={"text"}
        />
        {errores.matricula && (
            <span className="text-red-500 text-xs py-1">
              { errores.matricula  }
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

export default EditarUsuario
