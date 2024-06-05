import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { API_URL } from '../utils/Constantes';
import { ModalSessionContext } from "../SessionContext.jsx";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function Asesores() {
    
    const [asesores, setAsesores] = useState([])
    const { showModalSession, setShowModalSession } =
    useContext(ModalSessionContext);

    useEffect(() =>{
      const token = localStorage.getItem("token")
        axios.get(API_URL+'api/admin/obtenerAsesores/',{
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        })
        .then((response) => {
          console.log(response.data)
            setAsesores(response.data.mensaje)
        })
        .catch((error) => {
            if (error.response.status === 401) {
              setShowModalSession(true);
            }
          });
    }, [])
  return (
    <div>
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
          {asesores.map((asesor) => (
            <TableRow
              key={asesor.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asesor.nombre}
              </TableCell>
              <TableCell align="right">{asesor.email}</TableCell>
              <TableCell align="right">{asesor.idioma}</TableCell>
              <TableCell align="right">{asesor.noAsesorias}</TableCell>
              <TableCell align="right">
                <button>
                  <IoEye />  
                </button>  
                <button>
                  <MdDelete />  
                </button>  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Asesores