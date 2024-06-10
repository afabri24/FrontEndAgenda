import React, {useState} from 'react'
import TablaUsuario from './TablaUsuario'
import FormularioUsuario from './FormularioUsuario'

function Usuarios() {
    const [handleClic, setHandleClic] = useState(true)
    function irTabla(){
      setHandleClic(true)
    }

    function irFormulario(){
      setHandleClic(false)
    }

  return (
    <div>
      { handleClic ? 
        <TablaUsuario irFormulario={irFormulario} /> : 
        <FormularioUsuario irTabla={irTabla} /> 
      }
    </div>
  )
}

export default Usuarios
