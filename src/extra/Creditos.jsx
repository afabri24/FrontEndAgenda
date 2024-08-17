import React from 'react';

const Creditos = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Créditos</h1>
      <div className="flex space-x-8">
        <div className="group perspective">
          <div className="relative w-64 h-96 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
            <div className="absolute w-full h-full backface-hidden bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center p-4">
              <img src="ruta/a/imagen1.jpg" alt="Imagen 1" className="w-full h-32 object-cover rounded-t-lg" />
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold">Angel Fabrizio Franyutti Pulido</h2>
                <p className="text-gray-600">Estudiante de la Universidad Veracruzana en Tecnologías Computacionales</p>
              </div>
            </div>
            <div className="absolute w-full h-full backface-hidden bg-gray-100 border border-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center p-4 transform rotate-y-180">
              <h2 className="text-xl font-semibold">Contacto</h2>
              <p className="text-gray-600">correo1@example.com</p>
            </div>
          </div>
        </div>
        <div className="group perspective">
          <div className="relative w-64 h-96 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
            <div className="absolute w-full h-full backface-hidden bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center p-4">
              <img src="ruta/a/imagen2.jpg" alt="Imagen 2" className="w-full h-32 object-cover rounded-t-lg" />
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold">Diego Arellano Moreno</h2>
                <p className="text-gray-600">Estudiante de la Universidad Veracruzana en Tecnologías Computacionales</p>
              </div>
            </div>
            <div className="absolute w-full h-full backface-hidden bg-gray-100 border border-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center p-4 transform rotate-y-180">
              <h2 className="text-xl font-semibold">Contacto</h2>
              <p className="text-gray-600">correo2@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creditos;