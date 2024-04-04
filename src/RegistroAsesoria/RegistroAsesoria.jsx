import React, { useContext } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paso1 from './Paso1'
import Paso2 from './Paso2'
import Paso3 from './Paso3'
import { multiStepContext } from './Contexto.jsx';

function RegistroAsesoria() {

  const {pasoActual, datosFinales} = useContext(multiStepContext);

  function mostrarPasos(paso){
    console.log(paso)
    switch(paso){
      case 1:
        return <Paso1 />
      case 2:
        return <Paso2 />
      case 3:
        return <Paso3 />
    }
  }
  return (
    <>
        <Stepper activeStep={pasoActual - 1} className='w-2/3'>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
        {mostrarPasos(pasoActual)}
    </>
  )
}

export default RegistroAsesoria