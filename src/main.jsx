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
import Faq from "./Faq.jsx";
import { SessionProvider } from "./SessionContext.jsx";

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
          </Routes>
          </SessionProvider>
          <Footer />
        
      </Router>
    </>
  );
}

export default Main;
