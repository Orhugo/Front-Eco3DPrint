import { useState, useRef } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
<<<<<<< Updated upstream
import { useLocation, useNavigate } from 'react-router-dom';
=======
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "./Comment";
import ModelLikes from "./ModelLikesHandler";
>>>>>>> Stashed changes
import '../styles/VisualizarSTL.css'; 

const style = {
  position: "relative",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export function VisualizarSTL() {
  const { state } = useLocation();
<<<<<<< Updated upstream
  const url = state ? state + ".stl" : "Face.stl";
=======
  const url = state ? state.mainUrl : "thinker.stl";
  const modelName = state ? state.modelName : "Nombre Predeterminado";
  const modelId = 2; //SHOULD RETRIEVE IT FROM DB

  const handleButtonClick = () => {
    navigate(`/Front-Eco3DPrint/InfoModel?id=${modelId}`);
  };

  const downloadSTL = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.click();
  };

>>>>>>> Stashed changes
  const navigate = useNavigate();
  const modelId = 2; //SHOULD RETRIEVE IT FROM DB

  const handleButtonClick = () => {
    navigate(`/Front-Eco3DPrint/InfoModel?id=${modelId}`);
  };

  const downloadSTL = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1);
    link.click();
  };

  return (
<<<<<<< Updated upstream
    <div style={style}>
      <StlViewer
        style={style}
        orbitControls
        shadows
        url={url}
        modelProps={{
          color: "#0a6bc1",
          positionX: 0,
          positionY: 0,
        }}
      />
=======
    <div className="flex flex-col justify-center items-center">
      <div className="w-[900px] h-[600px] bg-gray-300 mt-[300px] flex flex-col justify-center items-center">
        <h2>{modelName}</h2>
        <StlViewer
          style={style}
          orbitControls
          shadows
          url={url}
          modelProps={{
            color: "#0a6bc1",
            positionX: 0,
            positionY: 0,
          }}
        />
      </div>

>>>>>>> Stashed changes
      <div className="button-container">
        <button className="button-style" onClick={handleButtonClick}>
          Visualizar Información
        </button>
        <button className="button-style" onClick={downloadSTL}>
          Descargar modelo
<<<<<<< Updated upstream
=======
        </button>
      </div>

      <div className="stl-viewer-container">
        <button
          className="mt-[100px]"
          onClick={() => navigate("/Volume/authors/user1")}
        >
          Ir a perfil de usuario
>>>>>>> Stashed changes
        </button>
      </div>
    </div>
  );
}

export default VisualizarSTL;
