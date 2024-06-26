import React from 'react';

const OlvideContra = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 text-center bg-white shadow-lg">
        <h3 className="mb-4 text-2xl font-bold">¿Olvidaste tu contraseña?</h3>
        <p>Comunícate con el centro de idiomas o manda un correo a <a href="mailto:soporte@centrodeidiomas.com" className="text-blue-600 hover:underline">soporte@centrodeidiomas.com</a> señalando que olvidaste tu contraseña.</p>
      </div>
    </div>
  );
};

export default OlvideContra;