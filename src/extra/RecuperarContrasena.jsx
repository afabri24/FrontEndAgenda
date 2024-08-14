import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Constantes';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RecuperarContrasena = () => {
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const location = useLocation();



    // Función para extraer el token de la URL
    const obtenerTokenDeURL = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('token');
    };

    const token = obtenerTokenDeURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            // Reemplaza la URL con la ruta de tu API para la recuperación de contraseña
            axios.post(API_URL + 'api/usuarios/recuperarContrasena/', { contrasena_nueva:nuevaContrasena },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
            console.log('Respuesta del servidor:', response.data);
            // Manejar la respuesta del servidor aquí (por ejemplo, mostrar un mensaje de éxito)
            window.location.href = "/Login";
            })
        } catch (error) {
            console.error('Error al recuperar la contraseña:', error);
            // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Recuperar Contraseña
                </Typography>
                <TextField
                    label="Nueva Contraseña"
                    fullWidth
                    margin="normal"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                    endAdornment: (
                        <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    ),
                    }}
                />
                <TextField
                    label="Confirmar Contraseña"
                    fullWidth
                    margin="normal"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                    endAdornment: (
                        <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    ),
                    }}
                />
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Enviar
                </Button>
            </Box>
        </Container>
    );
};

export default RecuperarContrasena;