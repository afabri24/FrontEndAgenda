import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";

function Signup() {

  //aqui estan las variables que se usan en el formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  //las variables que se usan en el modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");

  //funcion que se encarga de mostrar el modal
  const handlePopup = (message, error) => {
    setModalMessage(message);
    setModalVariant(error ? "danger" : "success");
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  //regex para validar la matricula
  const matriculaRegex = /^S/;
  useEffect(() => {
    if (!matriculaRegex.test(matricula)) {
      setError('La matrícula debe comenzar con "S".');
    }
  }, [matricula, matriculaRegex]);

  //funcion que se encarga de enviar los datos del formulario al servidor
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/usuarios/registrar/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, matricula, password }),
      }
    );

    if (!response.ok) {
      // Si el servidor devuelve un estado de error, muestra un mensaje de error
      setError("Error en la base de datos, intente de nuevo.");
      return;
    }

    const data = await response.json();

    if (data.error) {
      // Server returned error
      handlePopup(data.mensaje || data.message, true); // Use either 'mensaje' or 'message' based on your response
    } else {
      // Successful response
      handlePopup(data.mensaje || data.message, false); // Use either 'mensaje' or 'message' based on your response
      window.location.href = "/Login";
    }
  };

  return (
    <div className="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden">
      <div className="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10">
        <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="font-medium leading-tight text-black text-xl font-display text-center">
                Registro
              </h2>
              <p className="mt-2 text-sm text-gray-500"></p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="col-span-full">
                Nombre completo
                <input
                  className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                  id="nombre"
                  name="mombre"
                  autoComplete="given-name"
                  required=""
                  placeholder="Nombre completo"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="col-span-full">
                Matricula
                <input
                  className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                  id="Matricula"
                  name="Matricula"
                  required=""
                  placeholder="Matricula"
                  onChange={(e) => setMatricula(e.target.value)}
                />
                {error && <p className="text-red-100">{error}</p>}
              </div>
              <div>
                Email
                <input
                  id="email"
                  name="email"
                  className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-span-full">
                Contraseña
                <input
                  id="company"
                  name="company"
                  className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                  placeholder="Contraseña"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex">
                <div className="flex items-start">
                  <input
                    className="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label className="font-medium text-xs block leading-tight ml-2 text-gray-500">
                    Creando una cuenta con nosotros significa que aceptas
                    nuestros{" "}
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/terms"
                    >
                      Terminos de servicio,
                    </a>
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/privacy"
                    >
                      Aviso de privacidad
                    </a>
                    , y las notificaciones{" "}
                    <a
                      className="text-accent-500 hover:text-accent-400"
                      href="/notifications"
                    >
                      por correo.
                    </a>
                  </label>
                </div>
              </div>
              <div className="col-span-full">
                
                <button
                  className="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                  type="submit"
                >
                  Crear una cuenta
                </button>
              </div>
              <div className="space-y-4">
                <p className="font-medium text-sm leading-tight text-black">
                  Ya te registraste?{" "}
                  <a
                    className="text-accent-500 hover:text-accent-400 ml-3"
                    href="/login"
                  >
                    Inicia sesion
                  </a>
                </p>
              </div>
            </div>
          </form>

          <Modal
            showModal={showModal}
            handleClose={handleClose}
            modalVariant={modalVariant}
            modalMessage={modalMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
