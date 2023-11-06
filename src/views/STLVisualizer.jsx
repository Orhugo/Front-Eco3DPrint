import { useState, useRef } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation, useNavigate } from 'react-router-dom';
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
  const url = state ? state + ".stl" : "Face.stl";
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
      <div className="button-container">
        <button className="button-style" onClick={handleButtonClick}>
          Visualizar Información
        </button>
        <button className="button-style" onClick={downloadSTL}>
          Descargar modelo
        </button>
      </div>
    </div>
  );
}

export default VisualizarSTL;
