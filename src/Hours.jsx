import React, { useState, useEffect ,useRef} from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Time from "./TimerPickerComponent.jsx";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Switch } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import FormControl from '@mui/material/FormControl';
import API_URL from "./utils/Constantes";
import ModalNuevo from "./ModalNuevo";


function Hours({
  idDiaHora,
  horaInicio,
  horaFin,
  modalidad,
  dia,
  esLibre,
  estado,
  handleReload,
}) {

  
  const [status, setStatus] = useState(null)
  const [labelSwitch, setLabelSwitch] = useState(null)
  const [cambios, setCambios] = useState(false)

  //Modal para errores, alertas
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const [data, setData] = useState(null)

  useEffect(() => {
    if(estado === "activo"){
      setLabelSwitch("activo")
      setStatus(true)
    }else{
      setLabelSwitch("inactivo")
      setStatus(false)
    }
    setData({
      "idDiaHora": idDiaHora,
      "horaInicio": horaInicio,
      "horaFin": horaFin,
      "dia": dia,
      "modalidad": modalidad,
      "esLibre": esLibre,
      "horaFin": horaFin,
      "estado": estado,
  })

  }, []);


  function handleUpdate() {
    console.log(data)
    if(esLibre == 1){
      setCambios(false)
      updateData()
    }else{
      handlePopup("Ocurrio un error al guardar la informacion", "No se puede guardar la informacion ya que la hora no se encuentra libre, si desea cambiar la informacion elimine la asesoria antes");
    }
  }

  function handleChangeSwitch() {
    handleCambios()
    console.log(estado)
    setStatus(!status)
    if(status){
      setLabelSwitch("inactivo")
      setData({...data, "estado": "inactivo"})
    }else{
      setLabelSwitch("activo")
      setData({...data, "estado": "activo"})
    }
  }

  function handleCambios() {
    setCambios(true)
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("¿Estás seguro de que quieres eliminar este horario?")) {
      try {
        const response = await axios({
          method: "DELETE",
          url: API_URL + "api/asesores/eliminarDiaHora/",
          data: {
            id_diahora: idDiaHora,
            token: token,
          },
        });
        if (!response.data.error) {
          alert("Horario eliminado");
          handleReload();
        } else {
          alert("Hubo un error al eliminar el horario");
        }
      } catch (error) {
        console.error("Error al eliminar el horario", error);
      }
    }
  };

  function updateData() {

    axios.put(API_URL+`api/asesores/actualizarDiaHora/`, {
      "idDiaHora": idDiaHora,
      "hora_inicio": data["horaInicio"],
      "hora_termino": data["horaFin"],
      "modalidad": data["modalidad"],
      "estado": data["estado"],
      "token": localStorage.getItem("token"),
    })
      .then(response => {
        console.log(response.data)
        if(response.data.error){
          console.log("error")
        }else{
          handlePopup("Actualizacion exitosa", "Se actualizo la hora correctamente")
          console.log("mostrar modal")
        }
        
      })
      .catch(error => {
        console.error("Error al obtener el producto:", error);
      });
    }


  function handleHoraTermino(e) {
    setData({ ...data, "horaFin": e.format('HH:mm:ss')});
    
  }

  function handleHoraInicio(e) {
    setData({ ...data, "horaInicio": e.format('HH:mm:ss')});
    
  }

  function handleModalidad(e) {
    setData({...data, "modalidad": e.target.value})
    
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {data ? 
      <>
        <MobileTimePicker
        label="Hora de inicio"
        value={dayjs(data["horaInicio"], "HH:mm")}
        defaultValue={dayjs(horaInicio, "HH:mm")}
        renderInput={(params) => <Time {...params} />}
        onChange={(e)=>{
          handleCambios();
          handleHoraInicio(e);
        }}
      />
      <MobileTimePicker
      label="Hora de termino"
        value={dayjs(data["horaFin"], "HH:mm")}
        defaultValue={dayjs(horaFin, "HH:mm")}
        onChange={(e)=>{
          handleCambios();
          handleHoraTermino(e);
        }}
        renderInput={(params) => <Time {...params} />}
      /> 
      {/* cambiar a virtal o presencial */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">

        <InputLabel id="demo-select-small-label">Modalidad</InputLabel>
          <Select 
          value={data["modalidad"]} 
          onChange={(e)=>{
            handleCambios();
            handleModalidad(e);
          }}
          label="modalidad"
          >
            <MenuItem value={"presencial"}>Presencial</MenuItem>
            <MenuItem value={"virtual"}>Virtual</MenuItem>
          </Select>

      </FormControl>

      {/* switch desactivacion hora */}

      <FormControlLabel control={<Switch onChange={handleChangeSwitch} checked={status} />} label={labelSwitch} />

      
      </>
    : <a>No hay horarios</a>}
      

      

      <button
        className="mt-3 bg-red-500 my-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Eliminar
      </button>
      {cambios ? 
      <button
        className="mt-3 bg-blue-500 my-2 mx-2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpdate}
      >
        Guardar
      </button> : <></>}
      <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
      
      
    </LocalizationProvider>
    
  );
}

export default Hours;
