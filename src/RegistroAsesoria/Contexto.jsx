import React, {useState} from 'react'
import RegistroAsesoria from "./RegistroAsesoria"
import { obtenerFechaDiaSemanaActual } from '../utils/Funciones';
export const multiStepContext = React.createContext();

function Contexto() {
    const [pasoActual, setPaso] = useState(1);
    const [asesoriaDatos, setAsesoriaDatos] = useState([]);
    const [datosFinales, setDatosFinales] = useState([]);

    function enviarDatos(){
      console.log("Fecha: " + obtenerFechaDiaSemanaActual(asesoriaDatos["dia"]))
      console.log(asesoriaDatos)
    }
  return (
    <div>
        <multiStepContext.Provider value={{pasoActual, setPaso, asesoriaDatos, setAsesoriaDatos, datosFinales, setDatosFinales, enviarDatos}}>
            <RegistroAsesoria />
        </multiStepContext.Provider>
    </div>
  )
}

export default Contexto