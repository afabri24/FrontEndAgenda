import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Constantes';

const RecuperarContrasena = () => {
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const location = useLocation();

    // Función para extraer el token de la URL
    const obtenerTokenDeURL = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('token');
    };

    const token = obtenerTokenDeURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Reemplaza la URL con la ruta de tu API para la recuperación de contraseña
            axios.post(API_URL + 'api/autenticacion/recuperar-contrasena/', { nuevaContrasena },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Respuesta del servidor:', respuesta.data);
            // Manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito)
            window.location.href = "/Login";
        } catch (error) {
            console.error('Error al recuperar la contraseña:', error);
            // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Recuperar Contraseña</h2>
            <div>
                <label htmlFor="nuevaContrasena">Nueva Contraseña:</label>
                <input
                    type="password"
                    id="nuevaContrasena"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default RecuperarContrasena;