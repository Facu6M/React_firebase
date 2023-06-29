import React, { useEffect, useState } from "react";
// STYLES
import styles from "../styles/Tabla_Detalles.css";
// REACT ROUTER
import { Link } from "react-router-dom";
// Importo todo lo de react chart
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const Tabla_Detalles = ({ detalles }) => {

const maximo = detalles.finalPrice

useEffect(() => {
  obtenerMes();
},[])

var beneficios = [7232, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60,20];
var meses = [
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

const [data,setData] = useState([]);

function obtenerMes(){
  let info = []
  const finalPrice = detalles.finalPrice
  const fecha = detalles.datePayment
  const mes = fecha[5] + fecha[6]
  for(let i=1; i < beneficios.length; i++)
  if (mes == i){
    console.log(`es igual: ${i}`)
    info.push(finalPrice)
  }
  else{
    info.push(0)
  }
  setData(info)
}

console.log(data)




  var misoptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: maximo,
      },
      x: {
        ticks: { color: "rgba(0, 220, 195)" },
      },
    },
  };

  var midata = {
    labels: meses,
    datasets: [
      {
        label: "Ventas $",
        data: data,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="name_container">
        <Link to="/empresas">
          <p>Empresa</p>
        </Link>
        <p>></p>
        <p>{detalles.nameAgency}</p>
      </div>

      <div className="detalles_container">
        <table>
          <tbody>
            <tr>
              <th>Nombre de cliente</th>
              <th>Personas</th>
              <th>Dia</th>
              <th>Hora</th>
              <th>Valor venta</th>
            </tr>
            <tr>
              <td>{detalles.name}</td>
              <td>{detalles.persons}</td>
              <td>{detalles.day}</td>
              <td>{detalles.hour}</td>
              <td>{detalles.finalPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="grafico_barras">
        <Bar data={midata} options={misoptions} />
      </div>
      </div>
    </>
  );
};

export default Tabla_Detalles;

