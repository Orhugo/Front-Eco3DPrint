import React from "react";
import axios from "axios";
import { Form } from "react-router-dom";

function ButtonUploadFiles({ files, title, description }) {
  const uploadFiles = () => {
    const formData = new FormData();
    let url = "";
    let modelId;

    files.forEach((file) => {
      formData.append("file", file);
      axios
        .post("http://localhost:8080/aws/upload", formData)
        .then((response) => {
          // handle the response
          alert("File uploaded successfully");
          console.log(response);
          const uploadedFileName = file.name;
          console.log(uploadedFileName);
          axios
            .get("http://localhost:8080/aws/getFileUrl", {
              params: {
                key: uploadedFileName,
              },
            })
            .then((urlResponse) => {
              // Maneja la respuesta con la URL del archivo
              console.log("File URL:", urlResponse.data);
              url = urlResponse.data;
              axios
                .post("http://localhost:8080/models/add", {
                  category: "1",
                  description: description,
                  tags: "whatever",
                  title: title,
                  author_id: 10,
                  print_setting_id: null,
                })
                .then((response) => {
                  axios
                    .get("http://localhost:8080/models/getLastModelId", {})
                    .then((response) => {
                      modelId = response.data;
                      axios.post("http://localhost:8080/url/add", {
                        id_model: modelId,
                        url: url,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((urlError) => {
              // Maneja errores en la obtención de la URL
              console.error("Error getting file URL", urlError);
            });
        })
        .catch((error) => {
          // handle errors
          alert("Error uploading file");
          console.log(error);
        });
      console.log(formData.get("file"));
      formData.delete("file");
    });
  };

  return (
    <>
      <button onClick={uploadFiles}>Subir Archivos</button>
    </>
  );
}

export default ButtonUploadFiles;
