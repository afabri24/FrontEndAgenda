import React, { useContext } from "react";
import { multiStepContext } from "./Contexto";
import { Button } from "@mui/material";
import { obtenerDiaMañana, obtenerFechaDiaSemanaActual } from "../utils/Funciones";

function Paso1() {
  function handleClick(id) {
    setAsesoriaDatos({
      ...asesoriaDatos,
      modalidad: "presencial",
      idAsesor: id,
      dia: obtenerDiaMañana(),
      fecha: obtenerFechaDiaSemanaActual(obtenerDiaMañana())
    });
    setPaso(2);
  }

  const { setPaso, asesoriaDatos, setAsesoriaDatos } =
    useContext(multiStepContext);
  return (
    <div>
      <div className="mx-auto max-w-7xl pt-12">
        <div className="justify-center items-center flex p-4">
          <h1 className="text-blue-700 text-2xl">
            Selecciona el asesor para tu asesoria
          </h1>
        </div>
        <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/1.jpg"
                    alt="Imagen maestra Gabriela"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Mtra. Gabriela Jimenez Aguilar
                </p>
                <div className="mt-4 text-gray-500 text-sm">Ingles</div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/2.jpeg"
                    alt="Imagen doctora Roxana"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Dra. Ma. Roxana Rivera Ochoa
                </p>
              <div className="mt-4 text-gray-500 text-sm">Ingles</div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/3.jpg"
                    alt="Imagen doctora Eugenia"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Dra. Ma. Eugenia Castilla Villalobos
                </p>
                <div className="mt-4 text-gray-500 text-sm">Ingles</div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/4.jpg"
                    alt="Imagen maestra Kirina"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Mtra. Kirina Reyes Hernandez
                </p>
                <div className="mt-4 text-gray-500 text-sm">Frances</div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/5.jpeg"
                    alt="Imagen maestra Victoria"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Mtra. Victoria Sanchez
                </p>

                <div className="mt-4 text-gray-500 text-sm">Italiano</div>
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleClick(2)}
              className="transition-transform duration-500 ease-in-out transform hover:rotate-3 cursor-pointer border-2 border-accent-500 rounded-xl p-4 lg:p-8 hover:shadow-lg hover:border-accent-400 hover:bg-accent-100"
            >
              <div className="flex flex-col items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 mx-auto">
                  <img
                    src="/6.jpeg"
                    alt="Imagen maestra Josefina"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                  Mtra. Josefina Tapia
                </p>
                <div className="mt-4 text-gray-500 text-sm">Aleman</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paso1;
