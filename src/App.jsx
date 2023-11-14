import React, {useEffect} from "react";
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
import Profile from "./views/Profile";
import Budget from "./views/Budget";


function App() {
  return (
      <div className="h-screen w-full flex justify-center">
        <Router>
          <NavBar/>
            <div className="w-full h-screen flex justify-center items-center">
              <Routes>
                <Route path="/Volume" element={<Home />} />
                <Route path="/Volume/subirArchivo" element={<UploadFile />} />
                <Route path="/Volume/visualizarSTL" element={<STLVisualizer />} />
                <Route path="/Volume/catalogo" element={<Catalog />} />
                <Route path="/Volume/UserRegistration" element={<UserRegistration />} />
                <Route path="/Volume/UserLogin" element={<UserLogin />} />
                <Route path="/Volume/ProfileConfig" element={<ProfileConfig />} />
                <Route path="/Volume/Comment" element={<Comment />} />
                <Route path="/Volume/Profile" element={<Profile />} />
                <Route path="/Volume/CalcularPresupuesto" element={<Budget />} />
              </Routes>
            </div>
        </Router>
      </div>
    
  );
}

export default App;