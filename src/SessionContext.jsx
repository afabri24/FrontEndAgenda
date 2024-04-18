import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Cookies from 'universal-cookie';

export const ModalSessionContext = React.createContext();

export function SessionProvider({ children }) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [showModalSession, setShowModalSession] = useState(false);

    const handleCloseModal = () => {
        localStorage.clear();
        cookies.remove("nombre");
        cookies.remove("token");
        cookies.remove("tipo");
        setShowModalSession(false);
        navigate('/login');
        window.location.reload();
    };

    return (
        <div>
            <ModalSessionContext.Provider value={{ showModalSession, setShowModalSession }}>
                {children}
                {showModalSession && (
                    <Modal 
                        showModal={showModalSession}
                        handleClose={handleCloseModal}
                        modalVariant={"danger"}
                        modalMessage={"Su sesión ha expirado, por favor vuelva a iniciar sesión"}
                    />
                )}
            </ModalSessionContext.Provider>
        </div>
    );
}