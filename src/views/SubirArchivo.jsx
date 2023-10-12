import "../styles/SubirArchivo.css";
import Axios from "axios";
import React, { useRef, useState } from "react";

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

  const [files, setFiles] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }  
    // )
  };

  if (files) return (
    <div className="uploads">
        <ul>
            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
        </ul>
        <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
        </div>
    </div>
  )

  return (
    <div className="drag-area" onDragOver={handleDragOver}
    onDrop={handleDrop}>
      <input
        type="file"
        file
        hidden
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".stl"
      />

      <h2>Arrastra y suelta tu archivo</h2>
      <p>O</p>
      <button onClick={handleFileSelect}>Seleccionar archivo</button>
    </div>
  );
}

export default SubirArchivo;
