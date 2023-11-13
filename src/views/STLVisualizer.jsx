import { useState, useEffect } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation } from 'react-router-dom';
import Comments from "./Comment";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};
export function VisualizarSTL() {
  const { state } = useLocation();
  const url = state ? state : "thinker.stl";

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="wrapper">
      <div  className="stl-viewer-container">
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

      <div style={{display: 'center'}} className="comments-container">
        {/* There should be model ID variable in the STL Visualizer component  */}
        {/* If this is implemented, the line below should be changed to: */}
        {/* <Comments modelId={modelId} /> */}
        {/* #TO DO */}
        <Comments modelId={3} />
      </div>

    </div>
  );
}

export default VisualizarSTL;