import React, { useContext } from 'react'
import { multiStepContext } from './Contexto'
import { Button } from '@mui/material';

function Paso1() {
  function handleClic(id) {
    setAsesoriaDatos({...asesoriaDatos, "modalidad": "presencial", "idAsesor": id})
    setPaso(2)
  }
    
  const { setPaso, asesoriaDatos, setAsesoriaDatos } = useContext(multiStepContext);
  return (
    <div>
          <div className="mx-auto max-w-7xl pt-12">
            <h2 className="sr-only">Acesores</h2>
            <div>
              <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/1.jpg" alt="Imagen maestra Gabriela" />
                    </div>
                    <p  className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Gabriela Jimenez Aguilar
                    </p>
                    
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                  <Button onClick={() => { handleClic(2) }} >Seleccionar</Button>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/2.jpeg" alt="Imagen doctora Roxana" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Dra. Ma. Roxana Rivera Ochoa
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/3.jpg" alt="Imagen doctora Eugenia" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Dra. Ma. Eugenia Castilla Villalobos
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img
                        src="/4.jpg"
                        alt="Imagen maestra Kirina"
                      />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Kirina Reyes Hernandez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Frances</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/5.jpeg" alt="Imagen maestra Victoria" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Victoria Sanchez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Italiano</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/6.jpeg" alt="Imagen maestra Josefina" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Josefina Tapia
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Aleman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Paso1