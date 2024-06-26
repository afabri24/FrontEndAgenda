import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal, Button } from "flowbite-react";
import { dataContext } from '../ContextoAdmin';

function ModalDetalles({open, setOpen}) {
    
    const { admin } = useContext(dataContext)

  return (
    <Modal show={open} onClose={() => setOpen(false)}>
        {admin && <><Modal.Header>Datos de {admin.nombre}</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-base leading-relaxed text-gray-500 ">
                Correo Electronico:
              </h2>
              <p className="text-base leading-relaxed text-gray-700 ">
                {admin.email}
              </p>
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
