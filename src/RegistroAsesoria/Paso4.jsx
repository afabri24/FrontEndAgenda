import React, { useContext } from "react";
import { multiStepContext } from "./Contexto";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

function Paso4() {
  const { setPaso, asesoriaDatos, setAsesoriaDatos, enviarDatos } =
    useContext(multiStepContext);
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="border-2 rounded-xl w-full sm:w-1/2 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="p-5">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tipo de asesoria
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue="asesoria"
              >
                <FormControlLabel
                  value="asesoria"
                  onChange={(e) =>
                    setAsesoriaDatos({ ...asesoriaDatos, tipo: "asesoria" })
                  }
                  control={<Radio />}
                  label="Asesoria"
                />
                <FormControlLabel
                  value="oral"
                  onChange={(e) =>
                    setAsesoriaDatos({ ...asesoriaDatos, tipo: "oral" })
                  }
                  control={<Radio />}
                  label="Practica oral"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="p-5">
            <TextField
              id="outlined-multiline-static"
              label="Tema"
              multiline
              placeholder="Ingresa el tema a tratar en la asesoria"
              rows={4}
              onChange={(e) =>
                setAsesoriaDatos({ ...asesoriaDatos, tema: e.target.value })
              }
              value={asesoriaDatos["tema"]}
            />
          </div>
        </div>
        <div className="flex justify-between px-10">
          <Button onClick={() => setPaso(3)}>Regresar</Button>
          <Button onClick={() => enviarDatos()}>Registrar asesoria</Button>
        </div>
      </div>
    </div>
  );
}

export default Paso4;
