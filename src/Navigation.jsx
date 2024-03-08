import React, { useState } from 'react';
import logo from './assets/logoUV.svg';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
return (
    <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
    <div
      className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6"
    >
      <div className="flex flex-row items-center justify-between lg:justify-start">
        <a href="/" className="text-black inline-flex items-center gap-3">
          <img src={logo} alt="UV Logo" className="w-10 h-13" />
          <span className="font-bold font-display">Agenda asesorias</span>
        </a>

        <button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black lg:hidden">
          <svg
            className="w-6 h-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="inline-flex"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path
              className="hidden"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="flex-col items-center flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row">
        <a
          className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto"
          href="/#features"
        >
          ¿Que es?
        </a>
        <a
          className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
          href="/#pricing"
        >
          Conocenos
        </a>

        <a
          className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
          href="/faq"
        >
          Preguntas frecuentes
        </a>

        <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
          <a
            href="/signup"
            className="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline"
          >
            Registro
          </a>
          <a
            href="/login"
            className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
          >
            Iniciar sesión
          </a>
        </div>
      </nav>
    </div>
  </div>
);
}

export default Navigation;
