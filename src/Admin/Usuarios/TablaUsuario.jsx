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
import SwitchUsuario from './SwitchUsuario.jsx';

function TablaUsuario({irFormulario}) {

  const [usuarios, setUsuarios] = useState([])
  const [open, setOpen] = useState(false)

  const { setShowModalSession } =
    useContext(ModalSessionContext);

    const { setUsuario } = useContext(dataContext);

    function handleOpen(usuario) {
      setUsuario(usuario)
      setOpen(true)
    }

    useEffect(() =>{
      const token = localStorage.getItem("token")
        axios.get(API_URL+'api/admin/obtenerUsuarios/',{
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        })
        .then((response) => {
            console.log("asesores: " + response.data.mensaje)
            setUsuarios(response.data.mensaje)
        })
        .catch((error) => {
            if (error.response.status === 401) {
              setShowModalSession(true);
            }
          });
    }, [])

    function handleEdit(asesor) {
        setUsuario(asesor)
        irFormulario()
    }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Correo electronico</TableCell>
              <TableCell align="right">Matricula</TableCell>
              <TableCell align="right">Acciones</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            { usuarios.map((usuario) => (
              <TableRow
                key={usuario.id_usuario}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {usuario.nombre}
                </TableCell>
                <TableCell align="right">{usuario.email}</TableCell>
                <TableCell align="right">{usuario.matricula}</TableCell>
                <TableCell align="right">
                  <div className='flex flex-row space-x-1'>
                    <button onClick={() => handleEdit(usuario)}>
                        <MdEdit className='icon'/>  
                      </button> 
                      <button onClick={() => handleOpen(usuario)}>
                        <IoEye className='icon'/>  
                      </button>  
                      <SwitchUsuario />
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

export default TablaUsuario
