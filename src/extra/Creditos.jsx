import React from "react";

const Creditos = () => {
  const imagenes = [
    {
      imagen:
        "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Créditos</h1>
      <h2 className="text-2xl font-semibold mb-4">Desarrolladores</h2>
      <div className="flex space-x-8">
        <div className="relative w-64 h-96 transition-transform duration-700">
          <div className="absolute w-full h-full bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Imagen 1"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold">
                Angel Fabrizio Franyutti Pulido
              </h2>
              <p className="text-gray-600">
                Estudiante de la Universidad Veracruzana en Tecnologías
                Computacionales
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-96 transition-transform duration-700">
          <div className="absolute w-full h-full bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Imagen 2"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold">Diego Arellano Moreno</h2>
              <p className="text-gray-600">
                Estudiante de la Universidad Veracruzana en Tecnologías
                Computacionales
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creditos;
