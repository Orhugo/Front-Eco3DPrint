import React from "react";
import SubirArchivo from "./views/SubirArchivo";
import Home from "./views/Home";
import VisualizarSTL from "./views/VisualizarSTL";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";

function App() {
  return (
    <UploadFile />
    // <Router>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/subirArchivo" element={<SubirArchivo />} />
    //       <Route path="/visualizarSTL" element={<VisualizarSTL />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
