import "./styles/SubirArchivo.css";
import Axios from "axios";
import React, { useRef } from "react";

function SubirArchivo() {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      if (fileName.endsWith(".stl")) {
        const formData = new FormData();
        formData.append("stlFile", selectedFile);

        Axios.post("/api/upload-stl", formData)
          .then((response) => {
            console.log("Archivo subido con éxito:", response.data);
          })
          .catch((error) => {
            console.error("Error al subir el archivo:", error);
          });
      } else {
        alert("Por favor, seleccione un archivo .stl para subir tu modelo");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="archivoSeleccionado">
          <div className="textoArchivo">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".stl"
            />
            <button onClick={handleFileSelect}>Seleccionar archivo</button>
            <h2>Archivo seleccionado</h2>
            <p>Nombre del archivo</p>
          </div>
        </div>
        <div className="containerBtnSubir">
          <button className="btnSubir">Subir Diseño</button>
        </div>
      </div>
    </div>
  );
}

// return (
//   <div className="container">
//     <div className="archivoSeleccionado">
//       <div className="textoArchivo">
//         <h2>Archivo seleccionado</h2>
//         <p>Nombre del archivo</p>
//       </div>
//     </div>
//     <div className="containerBtnSubir">
//       <button className="btnSubir">Subir Diseño</button>
//     </div>
//   </div>
// );

export default SubirArchivo;