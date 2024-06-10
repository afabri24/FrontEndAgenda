import React, { useContext, useState } from 'react'
import TablaAsesor from './TablaAsesor'
import RegistroAsesor from './RegistroAsesor'
import EditarAsesor from './EditarAsesor';
import { dataContext } from '../ContextoAdmin';

function Asesores() {
    const [handleClic, setHandleClic] = useState(true)
    
    function irTabla(){
      setHandleClic(true)
    }

    function irFormulario(){
      setHandleClic(false)
    }

  const { asesor } = useContext(dataContext)

  return (
    <div>
      { handleClic ? 
        <TablaAsesor irFormulario={irFormulario} /> : 
        ( asesor ?
          <EditarAsesor irTabla={irTabla} /> :
          <RegistroAsesor irTabla={irTabla} />
          
        )
      }
    </div>
  )
}

export default Asesores
