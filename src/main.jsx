import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Asesorias from "./Asesorias.jsx";
import Perfil from "./Perfil.jsx";
import Usuario from "./Usuario.jsx";
import PerfilUsuario from "./PefilUsuario.jsx"
import Cookies from "universal-cookie";
import RegistroAsesoria from "./RegistroAsesoria/RegistroAsesoria.jsx";
import VerificarToken from "./utils/VerificarToken.jsx";
import Contexto from "./RegistroAsesoria/Contexto.jsx";
import ContextNavbar from "./utils/ContextNavbar.jsx";
import PaginaPrincipal from "./PaginaPrincipal.jsx";
import Navbar2 from './Navbar2';

function Main() {
  const cookies = new Cookies();
  const [tipo, setTipo] = useState(cookies.get("tipo"));


  return (
    <>
        <Router>
          <Navbar2/>
              <Routes>
                <Route path="/asesorias" element={(tipo == 'asesor') ? <Asesorias /> : <Usuario />} />
                <Route path="/perfil" element={(tipo == 'asesor') ? <Perfil /> : <PerfilUsuario />} />
                <Route path="/RegistroAsesoria" element={<Contexto><RegistroAsesoria /></Contexto>} />
                <Route path="/" element={<PaginaPrincipal />} />
                <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
              </Routes>
        <Footer />
    </Router></>
    
  );
}

export default Main;
