import React, { useEffect, useState } from "react";
// styles
import styles from "../styles/Empresas_Graficos.css";
// React router dom
import { Link } from "react-router-dom";
// Importo todo lo de react chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
// FIRE BASE
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Base de datos
const db = getFirestore(app);

ChartJS.register(ArcElement, Tooltip, Legend);

const Empresas_Graficos = () => {
  //Creo el lugar donde voy a alojar el array
  const [products, setLista] = useState([]);

  // Renderizar Lista de todo
  useEffect(() => {
    getLista();
  }, []);

  // Obtener los datos del JSON
  const getLista = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "foodList"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLista(docs);
    } catch (error) {
      console.log(error);
    }
  };

  // consigo todos los valores de venta de todas las empresas
  const finalPrice = [];
  products.forEach((e) => {
    finalPrice.push(e.finalPrice);
  });

  // funcion para obtener los porcentajes
  const porcentajes = [];
  // sumo el total de todos los valores de venta
  const total = finalPrice.reduce((a, b) => a + b, 0);
  finalPrice.forEach((precioFinal) => {
    const porcentaje = (precioFinal * 100) / total;
    porcentajes.push(porcentaje);
  });

  console.log(total);

  // suma para verificar que la suma de todos los porcentajes te da 100
  const info = porcentajes.reduce((a, b) => a + b, 0);
  console.log(info);

  // Obtengo todos los nombre de las empresas
  const empresas = [];
  products.forEach((e) => {
    empresas.push(e.nameAgency);
  });

  // Creo el cuadro
  var data = {
    labels: empresas,
    datasets: [
      {
        label: "Ventas %",
        data: porcentajes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    responsive: true,
  };

  return (
    <div>
      <Link className="link" to="/">
        <p>Volver atras</p>
      </Link>
      <Pie data={data} options={options} />;
    </div>
  );
};

export default Empresas_Graficos;
