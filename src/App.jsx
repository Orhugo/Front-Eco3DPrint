import React from "react";
import Home from "./views/Home";
import STLVisualizer from "./views/STLVisualizer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subirArchivo" element={<UploadFile />} />
            <Route path="/visualizarSTL" element={<STLVisualizer />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
