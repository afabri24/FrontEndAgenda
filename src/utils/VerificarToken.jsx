import React, { useState, useEffect, useHistory } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cookies from 'universal-cookie';

function VerificarToken() {
    const navigate = useNavigate();
    const coockies = new Cookies()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log("Token times: "+decodedToken+", "+currentTime)

        if (decodedToken.exp < currentTime) {
            setShowModal(true);
            localStorage.clear()
            coockies.remove("nombre")
            coockies.remove("token")
            coockies.remove("tipo")
        }
        } else {
            console.log("Error ya no hay token")
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <>
        {showModal && (
            <Modal 
                showModal={showModal}
                handleClose={handleCloseModal}
                modalVariant={"danger"}
                modalMessage={"Su sesion ha expirado, porfavor vuelva a iniciar una sesion"}
            />
            
        )}
        </>
    );
}

export default VerificarToken;