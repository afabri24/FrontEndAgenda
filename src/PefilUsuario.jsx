import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import API_URL from "./utils/Constantes.js";
import { es_valido_email, es_valido_matricula, es_valido_password } from "./utils/Validadores.js";

function PefilUsuario() {

    const token = localStorage.getItem('token');
    const [datosUsuario, setDatosUsuario] = useState(null)
    //variables para los errores del formulario
    const [errores, setErrores] = useState({
      nombre: '',
      email: '',
      matricula: '',
      password: ''
    });

    function enviarDatos() {



      if(validarDatos()){
        
        console.log("Enviando datos: "+ datosUsuario.token )

        axios.put(API_URL+`api/usuarios/actualizar/`, {
          "nombre": datosUsuario.nombre,
          "token": localStorage.getItem("token"),
          "email": datosUsuario.email,
          "password": datosUsuario.password,
          "matricula": datosUsuario.matricula
        })
          .then(response => {
            console.log(response.data)
            
          })
          .catch(error => {
            console.error("Error al obtener el producto:", error);
          });
      }
       
    }

    function validarDatos() {
      let valido = true;
      let nombreError = '';
      let matriculaError = '';
      let emailError = '';
      let passwordError = '';

      if (!es_valido_email(datosUsuario["email"])){
        emailError = 'El email que ingreso no es valido, favor de cambiarlo.';
        valido = false;
      }
  
      if (!es_valido_matricula(datosUsuario["matricula"])){
        matriculaError = 'La matricula que ingreso no es valida, favor de cambiarla.';
        valido = false;
      }
  
      if (!es_valido_password(datosUsuario["password"])){
        passwordError = 'La contraseña que ingreso no es valida, favor de cambiarla. (min 8, max 16 caracteres)';
        valido = false;
      }
  
  
      if (datosUsuario["nombre"].length === 0) {
        nombreError = 'El nombre es requerido'
        valido = false;
      }
      if (datosUsuario["email"].length === 0) {
        emailError = 'El email es requerido';
        valido = false;
      }
      if (datosUsuario["matricula"].length === 0) {
        matriculaError = 'La matricula es requerida';
        valido = false;
      }
      if (datosUsuario["password"].length === 0) {
        passwordError = 'La contraseña es requerida';
        valido = false;
      }
  
      setErrores({
        nombre: nombreError,
        matricula: matriculaError,
        email: emailError,
        password: passwordError,
      });
  
      return valido;
      
    }

    useEffect(() => {
        axios.post(API_URL+`api/usuarios/obtenerDatosUsuario/`, {"token": token})
          .then(response => {

            console.log(response.data)
            setDatosUsuario(response.data.mensaje);
          })
          .catch(error => {
            console.error("Error al obtener el producto:", error);
          });
      },  []);


    return (
        <div className="container mx-auto grid grid-cols-2 gap-4">
          <div className="p-4 mt-4">
            <a
              className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
              href="/"
            >
              Regresar
            </a>
            <div className="bg-white p-4">
              <h2 className="text-xl font-bold">Usuario</h2>
              <form className="flex flex-col h-full">
                {datosUsuario && 
                (
                <>
                    <TextField id="matricula" 
                    className="w-full py-10 h-12 block m-10"
                    label="Matricula" 
                    name="matricula"
                    variant="outlined" 
                    value={datosUsuario.matricula}
                    placeholder="Ingresa tu matricula (ejem: S200XXXXX)"
                    onChange={(e)=>setDatosUsuario({...datosUsuario, "matricula": e.target.value})}
                    />
                    {errores.matricula && <span
                      className="text-red-500 text-xs py-1">
                      {errores.matricula}</span>}
                    <TextField id="nombre" 
                    className="w-full py-10 h-12 block"
                    label="Nombre completo" 
                    name="nombre"
                    variant="outlined" 
                    placeholder="Ingresa tu nombre completo"
                    value={datosUsuario.nombre}
                    onChange={(e)=>setDatosUsuario({...datosUsuario, "nombre": e.target.value})}
                    />
                      {errores.nombre && <span
                      className="text-red-500 text-xs py-1">
                      {errores.nombre}</span>}
                    <TextField id="email" 
                    className="w-full py-10 h-12 block"
                    label="Correo electronico" 
                    name="matricula"
                    variant="outlined" 
                    placeholder="Ingresa tu correo electronico"
                    value={datosUsuario.email}
                    onChange={(e)=>setDatosUsuario({...datosUsuario, "email": e.target.value})}
                    />
                    {errores.email && <span
                      className="text-red-500 text-xs py-1">
                      {errores.email}</span>}
                    <TextField id="password" 
                    className="w-full py-10 h-12 block"
                    label="Contraseña" 
                    name="password"
                    variant="outlined" 
                    placeholder="Ingresa tu contraseña"
                    value={datosUsuario.password}
                    onChange={(e)=>setDatosUsuario({...datosUsuario, "password": e.target.value})}
                    />
                    {errores.password && <span
                      className="text-red-500 text-xs py-1">
                      {errores.password}</span>}
                  </>
            
            )}
                  
                  <div>
                    <Button>Regresar</Button>
                    <Button onClick={()=>enviarDatos()}>Guardar</Button>
                  </div>
              </form>
            </div>
          </div>
    

          
        </div>
      );
}

export default PefilUsuario