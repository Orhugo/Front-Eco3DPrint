import React, { useEffect, useState } from "react";
import axios from "axios";

function ButtonUploadFiles({ files, info }) {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const [uploading, setUploading] = useState(false);
  const [printSettings, setPrintSettingsId] = useState(null);
  const [userId, setUserId] = useState(null);


  useEffect(() => {setUserId(usuario.id);});
  const uploadFiles = async () => {
    setUploading(true);
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const uploadResponse = await axios.post(
            "http://localhost:8080/aws/upload",
            formData
          );
          alert("File uploaded successfully");
          const uploadedFileName = file.name;
          const urlResponse = await axios.get(
            "http://localhost:8080/aws/getFileUrl",
            {
              params: {
                key: uploadedFileName,
              },
            }
          );
          return urlResponse.data;
        })
      );

      const printSettingsResponse = await axios.post(
        "http://localhost:8080/printSettings/add",
        {
          filamentBrand: info.marcaFilamento,
          filamentColor: info.colorFilamento,
          filamentMaterial: info.materialFilamento,
          infill: parseInt(info.relleno),
          printerBrand: info.marcaImpresora,
          printerModel: info.modeloImpresora,
          resolution: parseFloat(info.resolucion),
          supports: info.soportes,
        }
      );
        const pSettings = printSettingsResponse.data;
        setPrintSettingsId(pSettings);
        console.log(pSettings);
        
      const modelResponse = await axios.post(
        "http://localhost:8080/models/add",
        {
          title: info.title,
          description: info.description,
          category: info.categoria,
          tags: "whatever",
          author: usuario,
          printSettings: printSettings,
          mainUrl: urls[0],
        }
      );
      const modelId = modelResponse.data.id;

      await Promise.all(
        urls.map((url) =>
          axios.post("http://localhost:8080/url/add", {
            id_model: modelId,
            url: url,
          })
        )
      );

      alert("Files uploaded and model created successfully");
    } catch (error) {
      console.error("Error uploading or getting file URL:", error);
      alert("Error uploading files");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={uploadFiles}
        disabled={uploading}
        className="text-gray-900 bg-gray-100 hover:bg-gray-400 focus:ring-4 focus:outline-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mb-2"
      >
        {uploading ? "Uploading..." : "Subir Archivos"}
      </button>
      <button
        onClick={() => {
          console.log(info);
        }}
      >
        imprimir info
      </button>
    </>
  );
}

export default ButtonUploadFiles;
