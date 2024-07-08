import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Asesor from "./AsesoriasAsesor/Asesor.jsx";
import Perfil from "./Perfil.jsx";
import Usuario from "./AsesoriasUsuario/Usuario.jsx";
import PerfilUsuario from "./PefilUsuario.jsx";
import Cookies from "universal-cookie";
import RegistroAsesoria from "./RegistroAsesoria/RegistroAsesoria.jsx";
import Contexto from "./RegistroAsesoria/Contexto.jsx";
import PaginaPrincipal from "./PaginaPrincipal.jsx";
import Navbar from "./Navbar.jsx";
import Faq from "./components/Faq.jsx";
import { SessionProvider } from "./SessionContext.jsx";
import RegistroAsesor from "./Admin/Asesores/RegistroAsesor.jsx";
import LoginAdmin from "./Admin/LoginAdmin.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import NotFound from "./extra/NotFound.jsx";
import ContextoAdmin from "./Admin/ContextoAdmin.jsx";
import OlvideContra from "./extra/OlvideContra.jsx";
import RecuperarContrasena from "./extra/RecuperarContrasena.jsx";

function Main() {
  const cookies = new Cookies();
  const [tipo, setTipo] = useState(cookies.get("tipo"));

  return (
    <>
      <Router>
          <Navbar />
          <SessionProvider>          
            <Routes>
            
            
              <Route
                path="/asesorias"
                element={tipo == "asesor" ? <Asesor /> : <Usuario />}
              />
              <Route
                path="/perfil"
                element={tipo == "asesor" ? <Perfil /> : <PerfilUsuario />}
              />
              <Route
                path="/RegistroAsesoria"
                element={
                  <Contexto>
                    <RegistroAsesoria />
                  </Contexto>
                }
              />
              <Route path="/" element={<PaginaPrincipal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/admin" element={<LoginAdmin />} />
              <Route 
              path="/dashboard" 
              element={tipo == "admin" ? 
                <ContextoAdmin>
                  <Dashboard />
                </ContextoAdmin>
               : <NotFound/>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/olvideContrasena" element={<OlvideContra/>} />
              <Route path="/registroAsesor" 
            element={tipo == "admin" ? <RegistroAsesor /> : <NotFound/>} />
              <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
            </Routes>
            </SessionProvider>
          <Footer />
        
      </Router>
    </>
  );
}

export default Main;
