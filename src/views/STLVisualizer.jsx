import { useState, useEffect } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "./Comment";
import ModelLikes from "./ModelLikesHandler";

const style = {
  width: "900px",
  height: "600px",
};
export function VisualizarSTL() {
  const { state } = useLocation();
  const url = state ? state.mainUrl : "thinker.stl";
  const modelName = state ? state.modelName : "Nombre Predeterminado";

  const navigate = useNavigate();
  return (
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

      <div className="stl-viewer-container">
        <button
          className="mt-[100px]"
          onClick={() => navigate("/Volume/authors/user1")}
        >
          Ir a perfil de usuario
        </button>
      </div>

      <div style={{ display: "center" }} className="comments-container">
        {/* There should be model ID variable in the STL Visualizer component  */}
        {/* If this is implemented, the line below should be changed to: */}
        {/* <Comments modelId={modelId} /> */}
        {/* #TO DO */}
        <ModelLikes modelId={3} />
      </div>

      <div style={{ display: "center" }} className="comments-container">
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
