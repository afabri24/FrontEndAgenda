import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import logo from "./assets/logoUV.png";
import ModalDecision from "./components/ModalDecision";
import NavDesktop from "./NavBar/NavDesktop";
import { NavMobile } from "./NavBar/NavMobile";


function Navbar() {
  
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const tipo = cookies.get('tipo')

  const handleCerrar = () => {
    setModalAbierto(false);
  };

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    console.log(token);
  }, []);

  const abrirModal = () => {
    setModalAbierto(true);
  };


  const handleLogout = () => {
    cookies.remove("nombre");
    cookies.remove("tipo");
    window.localStorage.removeItem("token");
    navigate("/"); // Redirige al usuario a la página principal
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto lg:px-16 top-0 z-10">
      <div className="relative flex w-full py-5 mx-auto items-end place-content-between md:flex-row md:px-6">
        <div className="flex flex-row items-center justify-between lg:justify-start p-4">
          {token ? (
            <Link
              to="/asesorias"
              className="text-black inline-flex items-center gap-3"
            >
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
          ) : (
            <Link to="/" className="text-black inline-flex items-center gap-3">
              <img src={logo} alt="UV Logo" className="w-10 h-13" />
              <span className="font-bold font-display">Agenda asesorias</span>
            </Link>
          )}
        </div>

        {token ? (
          <nav className="flex place-items-end justify-between flex-row p-2 items-center h-full">
            <span className="hidden sm:block px-2 lg:px-6 py-2 md:text-xl  md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto">
              Bienvenido/a {cookies.get("nombre")}
            </span>

            <div className="flex items-center gap-2 list-none lg:ml-auto">
            {tipo === 'admin' ? <></>:
              <Link
                to="/perfil"
                className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
              >
                Perfil
              </Link>
            }
              <button
                onClick={abrirModal}
                className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-slate-300 rounded-lg w-auto"
              >
                Cerrar sesion
              </button>
            </div>
            <ModalDecision
              showModal={modalAbierto}
              onClose={handleCerrar}
              onAccept={handleLogout}
              title={"Confirmación"}
              message="¿Estás seguro de cerrar tu sesion?"
            />
          </nav>
        ) : (
          <nav className="flex place-items-end justify-between flex-row p-6">
            <NavDesktop />
            <NavMobile />
                
          </nav>
        )}
      </div>
    </div>
  );
}

export default Navbar;
