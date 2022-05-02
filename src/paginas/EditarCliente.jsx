import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
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
    <>
      <h1 className="font-black text-4xl text-blue-900">
        {cliente?.nombre ? "Editar Cliente" : "Cliente ID no es Válido"}
      </h1>
      <p className="mt-3">
        {" "}
        {cliente?.nombre
          ? "Completa los datos requeridos para editar el cliente."
          : " "}
      </p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no es Válido</p>
      )}
    </>
  );
};

export default EditarCliente;
