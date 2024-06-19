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
import SwitchAsesor from './SwitchAsesor.jsx';

function TablaAsesor({irFormulario}) {

    const [asesores, setAsesores] = useState([])
    const [open, setOpen] = useState(false)
    const [activo, setActivo]= useState(true)
    
    function handleOpen(asesor) {
      setAsesor(asesor)
      setOpen(true)
    }
    

    const { setShowModalSession } =
    useContext(ModalSessionContext);

    const { setAsesor } = useContext(dataContext);

    useEffect(() =>{
      const token = localStorage.getItem("token")
        axios.get(API_URL+'api/admin/obtenerAsesores/',{
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        })
        .then((response) => {
            console.log("asesores: " + response.data.mensaje)
            setAsesores(response.data.mensaje)
        })
        .catch((error) => {
            if (error.response.status === 401) {
              setShowModalSession(true);
            }
          });
    }, [])

    function handleEdit(asesor) {
        setAsesor(asesor)
        irFormulario()
    }

  return (
    <div>
        <div>
        <Button variant="contained" onClick={irFormulario}> Agregar Asesor +</Button>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Correo electronico</TableCell>
            <TableCell align="right">Idioma</TableCell>
            <TableCell align="right">No. Asesorias</TableCell>
            <TableCell align="right">Acciones</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { asesores.map((asesor) => (
            <TableRow
              key={asesor.id_asesor}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asesor.nombre}
              </TableCell>
              <TableCell align="right">{asesor.email}</TableCell>
              <TableCell align="right">{asesor.idioma}</TableCell>
              <TableCell align="right">{asesor.num_asesorias}</TableCell>
              <TableCell align="right">
                <div className='flex flex-row space-x-1'>
                  <button onClick={() => handleEdit(asesor)}>
                      <MdEdit className='icon'/>  
                    </button> 
                    <button onClick={() => handleOpen(asesor)}>
                      <IoEye className='icon'/>  
                    </button>  
                    <SwitchAsesor />
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

export default TablaAsesor
