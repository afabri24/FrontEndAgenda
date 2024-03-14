import React from "react";
import Time from "./TimerPickerComponent.jsx";


function Perfil() {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const monthsOfYear = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay();

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      startOfWeek + i
    );
    const day = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    return date.getDay() === 0 || date.getDay() === 6
      ? null
      : `${day} ${date.getDate()} de ${month}`;
  }).filter(Boolean);

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4">
      <div className="p-4 mt-4">
        <a
          className="px-4 py-2 mt-4 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline bg-blue-300 rounded-lg"
          href="/"
        >
          Regresar
        </a>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold">Usuario</h2>
          <form className="flex flex-col">
            <input
              className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2"
              type="email"
              placeholder="Correo electrónico: usuario@ejemplo.com"
            />
            <input
              className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              placeholder="Nombre: Juan Perez"
            />
            <input
              className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2"
              type="password"
              placeholder="Contraseña: ******"
            />
            <select className="text-gray-500 block w-full p-2 border border-gray-300 rounded mt-2">
              <option value="">Cursos</option>
              <option value="ingles">Inglés</option>
              <option value="matematicas">Ingles II</option>
              <option value="ciencias">Ingles Avanzado</option>
            </select>
            <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-accent-400 rounded-lg">
              +
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-4 mt-4">
        <h2 className="text-xl font-bold">Horario</h2>
        <div className="flex-col">
          {weekDates.map((date, index) => (
            <a
              key={index}
              href={`/${date.replace(/\s/g, "_")}`}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >
              {date}
            </a>
          ))}

          <Time />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
