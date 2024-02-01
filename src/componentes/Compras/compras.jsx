import { AuthContext } from "../AuthProvider/authProvider";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

const Compras = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.token.id;
        console.log("este es el id", token);
        const response = await axios.get(
          `https://backendrunnersparadise-production.up.railway.app/payment/getDataPayment/${token}`
        );

        if (response && response.data && response.data.length > 0) {
          const itemsData = response.data.map((item) => ({
            date: item.date,
            status: item.status,
            title: item.title,
            amount: item.amount,
            method: item.method,
            type: item.type,
          }));
          setItems(itemsData);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error al obtener datos de pago:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [auth.token.id]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            <p>Fecha: {item.date}</p>
            <p>Estado: {item.status}</p>
            <p>Título: {item.title}</p>
            <p>Cantidad: {item.amount}</p>
            <p>Método: {item.method}</p>
            <p>Tipo: {item.type}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No hay datos de pago disponibles</p>
      )}
    </div>
  );
};

export default Compras;
