import React, { useState } from "react";
import Modal from "./Modal";
import API_URL from "./utils/constantes";

function Login() {
  const [credencial, setCredencial] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("usuario");
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");

  const handlePopup = (message, error) => {
    setModalMessage(message);
    setModalVariant(error ? "danger" : "success");
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleCredencialChange = (e) => {
    setCredencial(e.target.value);
    // Verifica si el valor ingresado es un correo electrónico
    const isEmail = e.target.value.includes("@");
    // Si es un correo electrónico, cambia el tipo a 'asesor'
    // De lo contrario, el tipo debería ser 'usuario'
    setTipo(isEmail ? "asesor" : "usuario");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes llamar a tu API con los valores de matricula y password
    const response = await fetch(API_URL+"api/autenticacion/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, credencial, password }),
    });

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
      window.location.href = "/";
    }
  };

  return (
    <div className="flex relative justify-center lg:px-0 items-center lg:py-20 md:px-12 overflow-hidden">
      <div className="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4">
        <h2 className="text-3xl font-extrabold text-black md:text-4xl lg:text-5xl xl:text-6xl">
          <span className="block">Hola!</span>
          <span className="block">inicia sesion</span>
        </h2>

        <div className="h-8"></div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label>Matricula</label>
              <input
                id="matricula"
                name="matricula"
                className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                placeholder="Matricula"
                onChange={handleCredencialChange}
              />
            </div>
            <div className="col-span-full">
              <label>Contraseña</label>
              <input
                id="password"
                name="password"
                className="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500"
                placeholder="Contraseña"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {error && (
                  <p className="text-red-400">
                    {error}, matricula y/o contraseña incorrectas
                  </p>
                )}
                <a
                  className="font-medium hover:text-accent-500 text-accent-500"
                  href="/forgotPass"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="col-span-full">
              <button
                className="items-center h-12 justify-center rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full"
                type="submit"
              >
                Iniciar sesion
              </button>
            </div>
            <div>
              <p className="font-medium text-sm leading-tight text-black">
                No estas registrado?{" "}
                <a
                  className="text-accent-500 hover:text-accent-400 ml-3"
                  href="/signup"
                >
                  Registrate Ahora
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
  );
}

export default Login;
