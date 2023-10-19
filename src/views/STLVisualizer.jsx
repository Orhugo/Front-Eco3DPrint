import { useState } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";

const url = "./Face.stl";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export function VisualizarSTL() {
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