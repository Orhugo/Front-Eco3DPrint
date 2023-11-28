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
import Tutorials from "./views/TutorialsCatalog";
import TutorialHandler from "./views/TutorialHandler";
import Profile from "./views/Profile";
import Budget from "./views/Budget";
import AuthorsProfile from "./views/AuthorsProfile";
import InfoModel from "./views/InfoModel";
import AboutUs from "./views/AboutUs.jsx";
import Footer from "./components/Footer.jsx";



function App() {
  return (
      <div id="MainAppContainer" className="h-fit w-full justify-center overflow-scroll">
        <Router>
          <NavBar/>
            <div id="MainViewContainer" className="w-full h-fit pt-[100px] flex justify-center items-center">
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
                <Route path="/Volume/AboutUs" element={<AboutUs />} />
              </Routes>
            </div>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;