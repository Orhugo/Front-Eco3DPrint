import React, {useEffect} from "react";
import Home from "./views/Home";
import STLVisualizer from "./views/STLVisualizer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import InfoModel from "./views/InfoModel";
import AboutUs from "./views/AboutUs.jsx";
import Footer from "./components/Footer.jsx";
import HomeUI from "./views/HomeUI.jsx";
import VolumeNavBar from "./components/VolumeNavBar.jsx"
import UploadFileUI from "./views/UploadFileUI.jsx";
import ModelViewUI from "./views/ModelViewUI.jsx";
import UserLoginUI from "./views/UserLoginUI.jsx";
import TutorialsUI from "./views/TutorialsUI.jsx";
import CatalogUI from "./views/CatalogUI.jsx";
import ProfileUI from "./views/ProfileUI.jsx";
import UserRegistrationUI from "./views/UserRegistrationUI.jsx";


function App() {
    return (
        <div id="MainAppContainer" className="w-full justify-center bg-neutral-100 no-scrollbar">
            <Router>
                <div id="navigationBarWrapper" className="w-full sticky top-0 flex justify-center p-4 z-10">
                    <VolumeNavBar/>
                </div>
                <div id="MainViewContainer" className="w-full relative flex justify-center items-center z-0">
                    <Routes>
                        <Route path="/volume" element={<HomeUI/>}/>
                        <Route path="/volume/subirArchivo" element={<UploadFileUI/>}/>
                        <Route path="/volume/visualizarstl" element={<ModelViewUI/>}/>
                        <Route path="/volume/catalogo" element={<CatalogUI/>}/>
                        <Route path="/volume/userregistration" element={<UserRegistrationUI/>}/>
                        <Route path="/volume/userlogin" element={<UserLoginUI/>}/>
                        <Route path="/volume/profileconfig" element={<ProfileConfig/>}/>
                        <Route path="/volume/comment" element={<Comment/>}/>
                        <Route path="/volume/profile" element={<ProfileUI/>}/>
                        <Route path="/volume/calcularpresupuesto" element={<Budget/>}/>
                        <Route path="/volume/tutorials" element={<TutorialsUI/>}/>
                        <Route path="/volume/tutorials/:id" element={<TutorialHandler/>}/>
                        <Route path="/volume/authors/:username" element={<ProfileUI/>}/>
                        <Route path="/Front-Eco3DPrint/InfoModel" element={<InfoModel/>}/>
                        <Route path="/volume/AboutUs" element={<AboutUs/>}/>
                    </Routes>
                </div>
                <div id="footerContainer" className="w-full">
                    <Footer/>
                </div>
            </Router>
        </div>
    );
}

export default App;