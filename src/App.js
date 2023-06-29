import { useEffect, useState } from "react";
// styles
import "./App.css";
//components
import Tabla_Detalles from "./components/Tabla_Detalles";
import Tabla from "./components/Tabla";
import Main from "./components/Main";
import Empresas_Graficos from "./components/Empresas_Graficos";
// react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [detalles, setDetalles] = useState([]);
  const [companyName, setCompanyName] = useState();



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/empresas"
            element={
              <Tabla
                setDetalles={setDetalles}
                setCompanyName={setCompanyName}
              />
            }
          ></Route>

          <Route
            path="/empresas/graficos"
            element={<Empresas_Graficos />}
          ></Route>

          <Route
            path={`empresas/${companyName}`}
            element={
              <Tabla_Detalles setDetalles={setDetalles} detalles={detalles} />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
