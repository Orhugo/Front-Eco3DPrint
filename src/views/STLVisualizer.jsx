import { useState } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation } from 'react-router-dom';


const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export function VisualizarSTL() {

  const { state } = useLocation();
  const url = state +".stl"
  //Se necesita un filtro. Si no se da el nombre en específico, peta
  //Este componente solo te deja ver un modelo a la vez, no puedo listar varios modelos
  //¿Se pueden convertir a json los .stl?
  return (
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
  );
}

export default VisualizarSTL;