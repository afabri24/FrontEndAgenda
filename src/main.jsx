import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import AuthContext from "./AuthContext.jsx";
import Asesorias from "./Asesorias.jsx";

function Main() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        {isAuthenticated ? (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<Asesorias />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

