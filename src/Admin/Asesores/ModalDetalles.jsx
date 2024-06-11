import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { dataContext } from '../ContextoAdmin';

function ModalDetalles({open, handleClose}) {
    // const { asesor } = useContext(dataContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      // useEffect(() =>{
      //   console.log(asesor)
      // })

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
   

    </Modal>
  )
}


export default ModalDetalles
