import { useState, useRef } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: "relative",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

const buttonStyle = {
  position: "absolute",
  top: "80px",  
  left: "50%",
  transform: "translateX(-50%)",
  padding: "15px 30px",
  fontSize: "20px",
  zIndex: 1,
};

export function VisualizarSTL() {
  const { state } = useLocation();
  const url = state ? state + ".stl" : "Face.stl";
  const navigate = useNavigate();
  const modelId = 2; //SHOULD RETRIEVE IT FROM DB

  const handleButtonClick = () => {
    navigate(`/Front-Eco3DPrint/InfoModel?id=${modelId}`);
  };

  return (
    <div style={style} >
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
      <button style={buttonStyle} onClick={handleButtonClick}>
        Visualizar Información
      </button>
    </div>
  );
}

export default VisualizarSTL;
