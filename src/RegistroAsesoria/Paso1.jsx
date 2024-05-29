import React, { useContext, useState, useEffect } from "react";
import { multiStepContext } from "./Contexto";
import axios from "axios";
import {API_URL} from "../utils/Constantes.js";
import { obtenerDiaHoy, obtenerDiaMañana, obtenerFechaDiaSemanaActual } from "../utils/Funciones";
import MoonLoader from "react-spinners/MoonLoader";

function Paso1() {

  const [asesores, setAsesores] = useState([]);
  const [loading, setLoading] = useState(true)

  function handleClick(id) {
    console.log('id: '+ id)
    setAsesoriaDatos({
      ...asesoriaDatos,
      modalidad: "presencial",
      idAsesor: id,
      dia: obtenerDiaMañana(),
      dia2: obtenerDiaHoy(),
      fecha: obtenerFechaDiaSemanaActual(obtenerDiaMañana())
    });
    setPaso(2);
  }

  useEffect(() => {
    axios
      .get(API_URL + `api/asesores/obtenerAsesores/`)
      .then((response) => {
        setAsesores(response.data.mensaje)
        setLoading(false)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowModalSession(true);
        }
      });
      console.log(asesores)
  }, []);

  const { setPaso, asesoriaDatos, setAsesoriaDatos } =
    useContext(multiStepContext);
  return (
    <div>
      <div className="mx-auto max-w-7xl pt-12">
        <div className="justify-center items-center flex p-4">
          <h1 className="text-blue-700 text-2xl">
            Selecciona tu asesor
          </h1>
        </div>
        {loading ? 

        <div className="flex w-full align-middle h-xxxl justify-center">
          <MoonLoader
            color={"#2E86C1"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> 
          </div>
        : <>
        <div   className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3 p-4">
        {asesores && asesores.map(asesor => (
         
            <div key={asesor.id_asesor}>
              <div
                onClick={() => handleClick(asesor.id_asesor)}
                className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
              >
                <div className="flex flex-col items-center">
                  <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img src={asesor.fotoBase64} alt="Foto del asesor" />
                  </div>
                  <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                    {asesor.nombre}
                  </p>
                  <div className="mt-4 text-gray-500 text-sm">{asesor.idioma}</div>
                </div>
              </div>
            </div>
        )) }
        </div>
        </>
      }
        

        
      </div>
    </div>
  );
}

export default Paso1;
