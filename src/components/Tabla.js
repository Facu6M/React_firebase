import React, { useEffect, useState } from "react";
// STYLES
import styles from "../styles/Tabla.css";
// FIRE BASE
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Base de datos
const db = getFirestore(app);
// REACT ROUTER
import { Link } from "react-router-dom";


const Tabla = ({ setDetalles, setCompanyName }) => {

  //Creo el lugar donde voy a alojar el array
  const [lista, setLista] = useState([]);

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
      // ORDENAR LA LISTA DE FORMA ALFABETICA Y NUMERICA
      docs.sort((a, b) => {
        const nameAgencyA = a.nameAgency.toLowerCase();
        const nameAgencyB = b.nameAgency.toLowerCase();

        if (nameAgencyA > nameAgencyB) {
          return 1;
        }

        if (nameAgencyA < nameAgencyB) {
          return -1;
        }

        if (a.finalPrice > b.finalPrice) {
          return -1;
        }

        if (a.finalPrice < a.finalPrice) {
          return 1;
        }
        return 0;
      });
      setLista(docs);
      obtenerMaxVentas(docs);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener maximo ventas
  const [maxVentas, setMaxVentas] = useState();
  function obtenerMaxVentas(lista) {
    let array = [];
    lista.forEach((e) => {
      array.push(e.finalPrice);
      let maximo = Math.max(...array);
      setMaxVentas(maximo);
    });
  }


  return (
    <>
      <nav>
        <h1>Facundo Melita</h1>
      </nav>

      <div className="texto_container">
        <div className="texto_div">
          <h2>EMPRESA MAS VENTAS</h2>
          <p> ${maxVentas}</p>
        </div>
        <div className="texto_div">
          <h2>MES MAS VENTAS</h2>
          <p>NOVIEMBRE</p>
        </div>
      </div>

      <div className="table_container">
        <table>
          <tbody>
            <tr>
              <th>Nombre empresa</th>
              <th>Total de ventas</th>
              <th>Comisión</th>
              <th>Detalle</th>
            </tr>
            {lista.map((objetos) => (
              <>
                <tr>
                  <td>{objetos.nameAgency}</td>
                  <td>{objetos.finalPrice}</td>
                  <td>{objetos.finalPrice * 0.025}</td>
                  <td>
                    <Link
                      to={`/empresas/${objetos.nameAgency.split(" ").join("")}`}
                    >
                      <button
                        className="table_button"
                        onClick={() => {
                          setDetalles(objetos);
                          setCompanyName(
                            objetos.nameAgency.split(" ").join("")
                          );
                        }}
                      >
                        Ver detalles
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tabla;