import React, { useState } from 'react';
import ModalNuevo from '../ModalNuevo';
import axios from 'axios';
import { API_URL } from '../utils/Constantes';
import BeatLoader from "react-spinners/BeatLoader";

const OlvideContra = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTittle, setModalTittle] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePopup = (tittle, message) => {
    setModalMessage(message);
    setModalTittle(tittle);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(email)
    axios.post(API_URL+'api/autenticacion/recuperar_contrasena/', { email: email })
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        handlePopup("Mensaje", response.data.mensaje);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        handlePopup("Error", "Hubo un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo.");
        setLoading(false)
    });
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 text-center bg-white shadow-lg">
        <h3 className="mb-4 text-2xl font-bold">¿Olvidaste tu contraseña?</h3>
        <p className="mb-4 text-gray-500">Ingresa tu correo electrónico con el que te registraste para recuperar tu contraseña</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            required
          />
          {loading ? 
              <BeatLoader
                color={"#2E86C1"}
                loading={loading}
                size={20}
                margin={4}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> :
              <button type="submit" className="btn btn-primary px-4 mt-4">Enviar</button>
          }
        </form>
      </div>
      <ModalNuevo
          showModal={showModal}
          handleClose={handleClose}
          modalTittle={modalTittle}
          modalMessage={modalMessage}
        />
    </div>
  );
};

export default OlvideContra;