import React from "react";
import Home from "./views/Home";
import VisualizarSTL from "./views/VisualizarSTL";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";
import BarraNav from "./components/BarraNav";

function App() {
  return (
    <>
      <BarraNav />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subirArchivo" element={<UploadFile />} />
            <Route path="/visualizarSTL" element={<VisualizarSTL />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
