import React from "react";
import styles from "../styles/Main.css";
import { Link } from "react-router-dom";

const Main = () => {

  return (
    <>
      <div className="main_container">
        <h1>Facundo Melita</h1>
        <div className="button_container">
        <Link className="link" to="/empresas">
          <button>Ver empresas y sus detalles</button>
        </Link>
        <Link className="link" to="/empresas/graficos">
          <button>Ver grafico tortas</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Main;
