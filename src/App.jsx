import React from "react";
import Home from "./views/Home";
import STLVisualizer from "./views/STLVisualizer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";
import UserRegistration from "./views/UserRegistration";
import ProfileConfig from "./views/ProfileConfig";
import NavBar from "./components/NavBar";
import UserLogin from "./views/UserLogin";

function App() {
  return (
    <>
      <Router>
      <NavBar />
        <div style={{marginTop:"100px"}}>
          <Routes>
            <Route path="/Front-Eco3DPrint" element={<Home />} />
            <Route path="/Front-Eco3DPrint/subirArchivo" element={<UploadFile />} />
            <Route path="/Front-Eco3DPrint/visualizarSTL" element={<STLVisualizer />} />
            <Route path="/Front-Eco3DPrint/UserRegistration" element={<UserRegistration />} />
            <Route path="/Front-Eco3DPrint/UserLogin" element={<UserLogin />} />
            <Route path="/Front-Eco3DPrint/ProfileConfig" element={<ProfileConfig />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
