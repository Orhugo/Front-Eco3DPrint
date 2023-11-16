import React, { useState } from "react";
import axios from "axios";

function ButtonUploadFiles({ files, info }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [uploading, setUploading] = useState(false);

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
          filament_brand: info.marcaFilamento,
          filament_color: info.colorFilamento,
          filament_material: info.materialFilamento,
          infill: parseInt(info.relleno),
          printer_brand: info.marcaImpresora,
          printer_model: info.modeloImpresora,
          resolution: parseFloat(info.resolucion),
          supports: info.soportes,
        }
      );

      const modelResponse = await axios.post(
        "http://localhost:8080/models/add",
        {
          category: info.categoria,
          description: info.description,
          tags: "whatever",
          title: info.title,
          author_id: user.id,
          print_setting_id: printSettingsResponse.data,
        }
      );
      const modelId = modelResponse.data;

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
          console.log(user.id);
        }}
      >
        imprimir info
      </button>
    </>
  );
}

export default ButtonUploadFiles;
