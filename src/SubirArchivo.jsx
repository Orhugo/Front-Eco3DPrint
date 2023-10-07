import React from "react";
import "./styles/SubirArchivo.css";

function SubirArchivo() {
  return (
    <div className="container">
      <div className="archivoSeleccionado">
        <div className="textoArchivo">
          <h2>Archivo seleccionado</h2>
          <p>Nombre del archivo</p>
        </div>
      </div>
      <div className="containerBtnSubir">
        <button className="btnSubir">Subir</button>
      </div>
    </div>
  );
}


export default SubirArchivo;
