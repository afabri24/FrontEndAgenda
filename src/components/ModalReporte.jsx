import {
  Button,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { API_URL } from "../utils/Constantes";
import axios from "axios";

function ModalReporte({ open, handleClose }) {
  const [month, setMonth] = useState("");
  const [format, setFormat] = useState("pdf");
  const token = localStorage.getItem("token");

  const handleChangeMonth = (event) => setMonth(event.target.value);
  const handleChangeFormat = (event) => setFormat(event.target.value);

  const meses = [
    { id: 1, nombre: "Enero" },
    { id: 2, nombre: "Febrero" },
    { id: 3, nombre: "Marzo" },
    { id: 4, nombre: "Abril" },
    { id: 5, nombre: "Mayo" },
    { id: 6, nombre: "Junio" },
    { id: 7, nombre: "Julio" },
    { id: 8, nombre: "Agosto" },
    { id: 9, nombre: "Septiembre" },
    { id: 10, nombre: "Octubre" },
    { id: 11, nombre: "Noviembre" },
    { id: 12, nombre: "Diciembre" },
  ];

  const descargarReporte= () => {
    if (month === "") {
      alert("Seleccione un mes");
      return;
    }
    axios.put( API_URL + "reporte", {
        mes: month,
        tipo: format,
        }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reporte.${format}`);
            document.body.appendChild(link);
            link.click();
        }
    );
  }

  return (
    <div
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            width: 300,
            margin: "auto",
          }}
        >
          <h1>Descargar Reporte</h1>
          <FormControl variant="standard">
            <InputLabel id="month-label">Seleccione un mes:</InputLabel>
            <Select
              labelId="month-label"
              value={month}
              onChange={handleChangeMonth}
              label="Month"
              size="medium"
              style={{ width: "200px" }}
              error={month === "" ? true : false}
            >
              {meses.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="format"
              name="row-radio-buttons-group"
              value={format}
              onChange={handleChangeFormat}
            >
              <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
              <FormControlLabel
                value="xlsx"
                control={<Radio />}
                label="Excel"
              />
              <FormControlLabel value="csv" control={<Radio />} label="CSV" />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={descargarReporte}
            variant="contained"
            className="mt-4"
          >
            Descargar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalReporte;
