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

function Main() {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLogin(false);
    }
  }, []);

  return (
    <Router>
      {login ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <LoginNav/>
          <Routes>
            <Route path="/" element={<Asesorias />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
