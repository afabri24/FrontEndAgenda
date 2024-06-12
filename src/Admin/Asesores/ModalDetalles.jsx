import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal, Button } from "flowbite-react";
import { dataContext } from '../ContextoAdmin';

function ModalDetalles({open, setOpen}) {
    
    const { asesor } = useContext(dataContext)
    useEffect(() =>{
      
      console.log(asesor)
    })

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
        {asesor && <><Modal.Header>Datos de {asesor.nombre}</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-base leading-relaxed text-gray-500 ">
                Correo Electronico:
              </h2>
              <p className="text-base leading-relaxed text-gray-700 ">
                {asesor.email}
              </p>
              <h2 className="text-base leading-relaxed text-gray-500 ">
                Idioma:
              </h2>
              <p className="text-base leading-relaxed text-gray-700 ">
                {asesor.idioma}
              </p>
            </div>
            <div className='max-w-40 max-y-40'>
              <img src={asesor.fotoBase64} className='border-2 rounded-lg' />
            </div>
          </div>
        </Modal.Body>
        </>}
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Aceptar</Button>
        </Modal.Footer> 
      </Modal>
  )
}


export default ModalDetalles
