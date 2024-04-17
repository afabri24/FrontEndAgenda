import React, { useEffect, useState } from "react";
import Logged from "./NoLogged.jsx";
import NoLogged from "./Logged.jsx";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';



function Navbar2() {
  const [isLogged, setIsLogged] = useState(true);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(token !== null); // Establecer isLogged en true si hay un token en localStorage
    console.log("Token" + token)
  }, []);

  function mostrarComponente() {
    if(isLogged)
      return <NoLogged />;
    else
      return <Logged handleLogout={handleLogout}/>;
  }

  function handleLogout() {
    cookies.remove("nombre");
    cookies.remove("tipo");
    window.localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }


  return (
    <>
      <div className="flex justify-center">
        <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
            <div className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6">
                <div className="flex flex-row items-center justify-between lg:justify-start">
                </div>
            </div>
        </div>
      </div>
      {mostrarComponente()}
    </>
  );
}

export default Navbar2;