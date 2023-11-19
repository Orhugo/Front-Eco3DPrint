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
<<<<<<< Updated upstream
import BarraNav from "./components/NavBar";
import InfoModel from "./views/InfoModel"
=======
import Tutorials from "./views/TutorialsCatalog";
import TutorialHandler from "./views/TutorialHandler";
import Profile from "./views/Profile";
import Budget from "./views/Budget";
import AuthorsProfile from "./views/AuthorsProfile";
import InfoModel from "./views/InfoModel";
>>>>>>> Stashed changes


function App() {
  return (
<<<<<<< Updated upstream
    <>
      
      <Router>
      <NavBar />
        <div style={{marginTop:"100px"}}>
          <Routes>
            <Route path="/Front-Eco3DPrint" element={<Home />} />
            <Route path="/Front-Eco3DPrint/subirArchivo" element={<UploadFile />} />
            <Route path="/Front-Eco3DPrint/visualizarSTL" element={<STLVisualizer />} />
            <Route path="/Front-Eco3DPrint/catalogo" element={<Catalog />} />
            <Route path="/Front-Eco3DPrint/UserRegistration" element={<UserRegistration />} />
            <Route path="/Front-Eco3DPrint/UserLogin" element={<UserLogin />} />
            <Route path="/Front-Eco3DPrint/ProfileConfig" element={<ProfileConfig />} />
            <Route path="/Front-Eco3DPrint/Comment" element={<Comment />} />
            <Route path="/Front-Eco3DPrint/InfoModel" element={<InfoModel />} />
          </Routes>
        </div>
      </Router>
    </>
=======
      <div className="h-screen w-full flex justify-center overflow-scroll">
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
                <Route path="/Volume/tutorials" element={<Tutorials />} />
                <Route path="/Volume/tutorials/:id" element={<TutorialHandler/>} />
                <Route path="/Volume/authors/:username" element={<AuthorsProfile />} />
                <Route path="/Front-Eco3DPrint/InfoModel" element={<InfoModel />} />
              </Routes>
            </div>
        </Router>
      </div>
>>>>>>> Stashed changes
  );
}

export default App;