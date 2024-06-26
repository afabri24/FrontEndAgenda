import React, {useState, useContext} from 'react'
import { dataContext } from '../ContextoAdmin';
import TablaAdmin from './TablaAdmin';
import EditarAdmin from './EditarAdmin';
import RegistroAdmin from './RegistroAdmin';

function Administradores() {
    const [handleClic, setHandleClic] = useState(true)
    
    function irTabla(){
      setHandleClic(true)
    }

    function irFormulario(){
      setHandleClic(false)
    }

  const { admin } = useContext(dataContext)

  return (
    <div>
      { handleClic ? 
        <TablaAdmin irFormulario={irFormulario} /> : 
        ( admin ?
          <EditarAdmin irTabla={irTabla} /> :
          <RegistroAdmin irTabla={irTabla} />
          
        )
      }
    </div>
  )
}

export default Administradores
