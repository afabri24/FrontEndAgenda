import React, {useState, useContext, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { API_URL } from '../../utils/Constantes.js';
import { ModalSessionContext } from "../../SessionContext.jsx";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Button } from '@mui/material';
import { MdEdit } from "react-icons/md";
import '../../assets/styles.css'
import { dataContext } from '../ContextoAdmin.jsx';
import ModalDetalles from './ModalDetalles.jsx';

function TablaAdmin({irFormulario}) {
    const [admins, setAdmins] = useState([])
    const [open, setOpen] = useState(false)
    
    function handleOpen(asesor) {
      setAdmin(asesor)
      setOpen(true)
    }
    

    const { setShowModalSession } =
    useContext(ModalSessionContext);

    const { setAdmin } = useContext(dataContext);

    useEffect(() =>{
      const token = localStorage.getItem("token")
        axios.get(API_URL+'api/admin/obtenerAdmins/',{
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        })
        .then((response) => {
            setAdmins(response.data.mensaje)
        })
        .catch((error) => {
            if (error.response.status === 401) {
              setShowModalSession(true);
            }
          });
    }, [])

    function handleEdit(admin) {
        setAdmin(admin)
        irFormulario()
    }
  return (
    <div>
        <div>
        <Button variant="contained" onClick={() =>{irFormulario(), setAdmin("")}}> Agregar Admin +</Button>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Correo electronico</TableCell>
            <TableCell align="right">Acciones</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { admins.map((admin) => (
            <TableRow
              key={admin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {admin.nombre}
              </TableCell>
              <TableCell align="right">{admin.email}</TableCell>
              <TableCell align="right">
                <div className='flex flex-row space-x-1'>
                  <button onClick={() => handleEdit(admin)}>
                      <MdEdit className='icon'/>  
                    </button> 
                    <button onClick={() => handleOpen(admin)}>
                      <IoEye className='icon'/>  
                    </button>  
                    <MdDelete className='icon'/>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalDetalles open={open} setOpen={setOpen}/>
      
    </div>
  )
}

export default TablaAdmin
