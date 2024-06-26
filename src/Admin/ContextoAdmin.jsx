import React, {useState} from 'react'
import Dashboard from './Dashboard';
export const dataContext = React.createContext();

function ContextoAdmin() {
    const [asesor, setAsesor] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [admin, setAdmin] = useState(null)
  return (
    <div>
        <dataContext.Provider value={{asesor, setAsesor, usuario, setUsuario, admin, setAdmin}}>
            <Dashboard />
        </dataContext.Provider>
    </div>
  )
}

export default ContextoAdmin
