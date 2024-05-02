import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "./CardUsuario";
import API_URL from "../utils/Constantes";
import { Link } from "react-router-dom";
import { ModalSessionContext } from "../SessionContext";
import imageEmpty from "../assets/empty.png";

function Usuario() {
  const [asesoriasActuales, setAsesoriasActuales] = useState([]);
  const [asesoriasPasadas, setAsesoriasPasadas] = useState([]);
  const { showModalSession, setShowModalSession } =
    useContext(ModalSessionContext);
  const [reload, setReload] = useState(true);

  const [filtro, setFiltro] = useState('Descendiente');

  const cookies = new Cookies();
  const fetchAsesorias = async () => {
    try {
      const token = cookies.get("token");
      const response = await axios.post(
        API_URL + `api/asesorias/obtenerUsuario/`,
        {
          token: token,
        }
      );

      const hoy = new Date();
      response.data.forEach((asesoria) => {
        if (new Date(asesoria.fecha) < hoy) {
          setAsesoriasPasadas((asesoriasPasadas) => [
            ...asesoriasPasadas,
            asesoria,
          ]);
        } else {
          setAsesoriasActuales((asesoriasActuales) => [
            ...asesoriasActuales,
            asesoria,
          ]);
        }
      });
      setReload(!reload);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setShowModalSession(true);
      }
    }
  };

  const handleSelectChange = (event) => {
    setFiltro(event.target.value);
  };

  const asesoriasFiltradas = asesoriasPasadas.filter((asesoria) => {

    let asesoriasFiltradas = asesoriasPasadas;

    switch (filtro) {
      case "Ascendente":
        return asesoriasFiltradas.sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );
      case "Descendiente":
        return asesoriasFiltradas.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
      default:
        return true;
    }
  });

  useEffect(() => {
    if (reload) {
      fetchAsesorias();
      setReload(false); // reset the reload state after fetching
    }
  }, [reload]);

  const handleReload = () => {
    setReload(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesoriasActuales.length > 0 ? (
          asesoriasActuales.map((asesoria) => (
            <Card
              key={asesoria.id_asesoria}
              idAsesoria={asesoria.id_asesoria}
              tipo={asesoria.tipo}
              tema={asesoria.tema}
              asesor={asesoria.nombre_asesor}
              alumno={asesoria.alumno}
              fecha={asesoria.fecha}
              horaInicio={asesoria.hora_inicio}
              horaFin={asesoria.hora_termino}
              dia={asesoria.dia}
              modalidad={asesoria.modalidad}
              password={asesoria.password_reunion}
              url={asesoria.url_reunion}
              reunion_id={asesoria.id_reunion}
              funcion={fetchAsesorias}
              curso={asesoria.curso}
              handleReload={handleReload}
              estado={"actual"}
            />
          ))
        ) : (
          <>
            <div></div>
            <div className="flex flex-row w-full items-center">
              <img className="py-20 pl-10" src={imageEmpty} alt="" />
              <p className=" w-full content-center text-5xl font-bold">
                Actualmente no cuentas con asesorias registradas
              </p>
            </div>
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold mt-4 mx-8">Hitorial de asesorias</h1>
      <select
        className="text-gray-500 block  w-1/4 p-2 border mx-8 border-gray-300 rounded mt-2 size-1/6"
        onChange={handleSelectChange}
      >
        <option value="Descendiente">Descendiente</option>
        <option value="Ascendente">Ascendente</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {asesoriasPasadas.length > 0 ? (
          asesoriasPasadas.map((asesoria) => (
            <Card
              key={asesoria.id_asesoria}
              idAsesoria={asesoria.id_asesoria}
              tipo={asesoria.tipo}
              tema={asesoria.tema}
              asesor={asesoria.nombre_asesor}
              alumno={asesoria.alumno}
              fecha={asesoria.fecha}
              horaInicio={asesoria.hora_inicio}
              horaFin={asesoria.hora_termino}
              dia={asesoria.dia}
              modalidad={asesoria.modalidad}
              password={asesoria.password_reunion}
              url={asesoria.url_reunion}
              reunion_id={asesoria.id_reunion}
              funcion={fetchAsesorias}
              curso={asesoria.curso}
              handleReload={handleReload}
              estado={"pasada"}
            />
          ))
        ) : (
          <>
            <div></div>
            <div className="flex flex-row w-full items-center justify-center content-center">
              <p className="mx-8 w-full content-center justify-center text-xl font-bold">
                Actualmente no cuentas con asesorias pasadas
              </p>
            </div>
          </>
        )}
      </div>

      <Link
        to="/registroAsesoria"
        className="fixed bottom-10 right-4 bg-blue-500 text-white text-lg rounded-full py-4 px-4 shadow-lg"
      >
        Agregar Asesoría +
      </Link>
    </div>
  );
}

export default Usuario;
