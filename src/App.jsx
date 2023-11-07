import React from "react";
import Home from "./views/Home";
import STLVisualizer from "./views/STLVisualizer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadFile from "./views/UploadFile";
import UserRegistration from "./views/UserRegistration";
import ProfileConfig from "./views/ProfileConfig";
import NavBar from "./components/NavBar";
import Catalog from "./views/Catalog";
import UserLogin from "./views/UserLogin";
import Comment from "./views/Comment";


function App() {
  return (
    <div className="h-screen w-full flex justify-center">

      <Router>
      <NavBar/>
        <div className="w-full h-screen flex justify-center items-center">
          <Routes>
            <Route path="/Front-Eco3DPrint" element={<Home />} />
            <Route path="/Front-Eco3DPrint/subirArchivo" element={<UploadFile />} />
            <Route path="/Front-Eco3DPrint/visualizarSTL" element={<STLVisualizer />} />
            <Route path="/Front-Eco3DPrint/catalogo" element={<Catalog />} />
            <Route path="/Front-Eco3DPrint/UserRegistration" element={<UserRegistration />} />
            <Route path="/Front-Eco3DPrint/UserLogin" element={<UserLogin />} />
            <Route path="/Front-Eco3DPrint/ProfileConfig" element={<ProfileConfig />} />
            <Route path="/Front-Eco3DPrint/Comment" element={<Comment />} />
            <Route path="/Front-Eco3DPrint/Profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;