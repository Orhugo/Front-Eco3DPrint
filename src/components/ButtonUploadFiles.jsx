import React, { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

function ButtonUploadFiles({ files, info }) {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(usuario.id);
  });
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
          //alert("File uploaded successfully");
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
          payment: info.pago,
          price: parseFloat(info.precio),
        }
      );
      const pSettings = printSettingsResponse.data;
      console.log(pSettings);

      const url = await handleUploadImage();

      const modelResponse = await axios.post(
        "http://localhost:8080/models/add",
        {
          title: info.title,
          description: info.description,
          category: info.categoria,
          tags: "whatever",
          author: usuario,
          printSettings: pSettings,
          mainUrl: urls[0],
          imageUrl: url,
          likeCounter: 0,
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
    window.location.reload(false);
  };
  const supabaseUrl = "https://ohjmhtpmzrwhleemxqgr.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oam1odHBtenJ3aGxlZW14cWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMzA0NjQsImV4cCI6MjAxNDYwNjQ2NH0.a8yTP4L8J_qPPzOBasqmFjMuftpA279n4fgRoLWQgW8";

  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleUploadImage = async () => {
    const path = `public/${info.image.name}`;
    const { data, error } = await supabase.storage
      .from("test")
      .upload(path, info.image);

    if (error) {
      console.error("Error al subir la imagen:", error.message);
      return null;
    } else {
      const localImageUrl = `${supabaseUrl}/storage/v1/object/public/test/${path}`;

      console.log("Imagen subida con éxito:", data);
      console.log("URL de la imagen:", localImageUrl);

      return localImageUrl;
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
      {uploading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ButtonUploadFiles;
