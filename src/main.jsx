import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Asesorias from "./Asesorias.jsx";
import LoginNav from "./LoginNav.jsx";
import Perfil from "./Perfil.jsx";
import Usuario from "./Usuario.jsx";
import PerfilUsuario from "./PefilUsuario.jsx"
import Cookies from "universal-cookie";
import RegistroAsesoria from "./RegistroAsesoria/RegistroAsesoria.jsx";
import VerificarToken from "./utils/VerificarToken.jsx";
import Contexto from "./RegistroAsesoria/Contexto.jsx";

function Main() {
  const cookies = new Cookies();
  const [login, setLogin] = useState(true);
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    setTipo(cookies.get("tipo"));
  }, []);

  return (
    <Router>
      {login ? (
        <>
          <Navigation />
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
        </>) : 
        
        (<>
        <LoginNav/>
          {(tipo == 'asesor') ? (
            <>
              <VerificarToken />
              <Routes>
                <Route path="/" element={<Asesorias />} />
                <Route path="/perfil" element={<Perfil />} />
              </Routes>
            </>):(
          <>
            <VerificarToken />
            <Routes>
              <Route path="/" element={<Usuario />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
              <Route path="/RegistroAsesoria" element={<Contexto><RegistroAsesoria /></Contexto>} />
            </Routes>
          </>
          )}
        </>)
      }
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        <Footer />
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
