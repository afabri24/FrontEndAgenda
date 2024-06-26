import React, {useState} from 'react'
import TablaUsuario from './TablaUsuario'
import EditarUsuario from './EditarUsuario'

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
        <EditarUsuario irTabla={irTabla} /> 
      }
    </div>
  )
}

export default Usuarios
