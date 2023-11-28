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
import AuthorsProfile from "./views/AuthorsProfile";
import InfoModel from "./views/InfoModel";
import AboutUs from "./views/AboutUs.jsx";
import Footer from "./components/Footer.jsx";
import HomeUI from "./views/HomeUI.jsx";
import VolumeNavBar from "./components/VolumeNavBar.jsx"
import UploadFileUI from "./views/UploadFileUI.jsx";
import ModelViewUI from "./views/ModelViewUI.jsx";


function App() {
    return (
        <div id="MainAppContainer" className="w-full justify-center bg-neutral-100">
            <Router>
                <div id="navigationBarWrapper" className="w-full sticky top-0 flex justify-center p-4 z-10">
                    <VolumeNavBar/>
                </div>
                <div id="MainViewContainer" className="w-full relative flex justify-center items-center z-0">
                    <Routes>
                        <Route path="/Volume" element={<HomeUI/>}/>
                        <Route path="/Volume/subirArchivo" element={<UploadFileUI/>}/>
                        <Route path="/Volume/visualizarSTL" element={<ModelViewUI/>}/>
                        <Route path="/Volume/catalogo" element={<Catalog/>}/>
                        <Route path="/Volume/UserRegistration" element={<UserRegistration/>}/>
                        <Route path="/Volume/UserLogin" element={<UserLogin/>}/>
                        <Route path="/Volume/ProfileConfig" element={<ProfileConfig/>}/>
                        <Route path="/Volume/Comment" element={<Comment/>}/>
                        <Route path="/Volume/Profile" element={<Profile/>}/>
                        <Route path="/Volume/CalcularPresupuesto" element={<Budget/>}/>
                        <Route path="/Volume/tutorials" element={<Tutorials/>}/>
                        <Route path="/Volume/tutorials/:id" element={<TutorialHandler/>}/>
                        <Route path="/Volume/authors/:username" element={<AuthorsProfile/>}/>
                        <Route path="/Front-Eco3DPrint/InfoModel" element={<InfoModel/>}/>
                        <Route path="/Volume/AboutUs" element={<AboutUs/>}/>
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