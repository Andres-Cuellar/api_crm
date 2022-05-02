import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(true);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log("Error ", error);
      }
      setCargando(false);
    };

    obtenerClienteAPI();
  }, []);


  return (
    <div>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <p>No hay resultados</p>
      ) : (
        <div>
          <h1 className="font-black text-4xl text-blue-900">
            Cliente: {cliente.nombre}
          </h1>
          <p className="mt-3"> Información del Cliente</p>

          <p className="text-3xl text-gray-600 mt-4">
            <span className=" text-gray-800 uppercase font-bold">Nombre: </span>
            {cliente.nombre}
          </p>
          <p className="text-2xl mt-4 text-gray-600">
            <span className="text-gray-800  uppercase font-bold">Email: </span>
            {cliente.email}
          </p>
          <p className="text-2xl mt-4 text-gray-600">
            <span className="text-gray-800  uppercase font-bold">
              Teléfono:{" "}
            </span>
            {cliente.telefono}
          </p>
          <p className="text-2xl mt-4 text-gray-600">
            <span className="text-gray-800  uppercase font-bold">
              Empresa:{" "}
            </span>
            {cliente.empresa}
          </p>
          {cliente.notas && (
            <p className="text-2xl mt-4 text-gray-600">
              <span className="text-gray-800  uppercase font-bold">
                Notas:{" "}
              </span>
              {cliente.notas}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerCliente;
