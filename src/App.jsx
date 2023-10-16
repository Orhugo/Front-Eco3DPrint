import React from "react";
import Home from "./views/Home";
import VisualizarSTL from "./views/STLVisualizer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";
import UserRegistration from "./components/UserRegistration";
import ProfileConfig from "./components/ProfileConfig";
import BarraNav from "./components/NavBar";

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
            <Route path="/UserRegistration" element={<UserRegistration />} />
            <Route path="/ProfileConfig" element={<ProfileConfig />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
