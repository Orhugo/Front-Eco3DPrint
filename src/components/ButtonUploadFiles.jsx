import React from "react";
import axios from "axios";
import { Form } from "react-router-dom";

function ButtonUploadFiles({ files, title, description }) {
  const uploadFiles = async () => {
    const formData = new FormData();
    let url = "";
    let modelId;
    let urls = [];

    //para cada archivo que queramos subir, lo sube.
    for (const file of files) {
      formData.append("file", file);
      try {
        const uploadResponse = await axios.post("http://localhost:8080/aws/upload", formData);
        alert("File uploaded successfully");
        const uploadedFileName = file.name;
        console.log(uploadedFileName);
        const urlResponse = await axios.get("http://localhost:8080/aws/getFileUrl", {
          params: {
            key: uploadedFileName,
          },
        });
        const url = urlResponse.data;
        urls.push(url);
      } catch (error) {
        console.error("Error uploading or getting file URL:", error);
      } finally {
        formData.delete("file");
      }
    }

    //ahora que ya tenemos todas las urls, podemos crear el modelo
    axios
      .post("http://localhost:8080/models/add", {
        category: "1",
        description: description,
        tags: "whatever",
        title: title,
        author_id: 10,
        print_setting_id: null,
      })
      //obtenemos el id del modelo que acabamos de crear
      .then((response) => {
        axios.get("http://localhost:8080/models/getLastModelId", {})
        .then((response) => {
          modelId = response.data;
        })
      });

      console.log(urls[0])
      console.log(urls[1])

      //ahora ya tenemos toda la información necesaria para crear las urls
      urls.forEach((url) => {
        console.log(url);
        axios.post("http://localhost:8080/url/add", {
          id_model: modelId,
          url: url,
        }).catch((error) => {
          console.log(error);
        });
      });

    // files.forEach((file) => {
    //   formData.append("file", file);
    //   axios
    //     .post("http://localhost:8080/aws/upload", formData)
    //     .then((response) => {
    //       // handle the response
    //       alert("File uploaded successfully");
    //       console.log(response);
    //       const uploadedFileName = file.name;
    //       console.log(uploadedFileName);
    //       axios
    //         .get("http://localhost:8080/aws/getFileUrl", {
    //           params: {
    //             key: uploadedFileName,
    //           },
    //         })
    //         .then((urlResponse) => {
    //           // Maneja la respuesta con la URL del archivo
    //           console.log("File URL:", urlResponse.data);
    //           url = urlResponse.data;
    //           axios
    //             .post("http://localhost:8080/models/add", {
    //               category: "1",
    //               description: description,
    //               tags: "whatever",
    //               title: title,
    //               author_id: 10,
    //               print_setting_id: null,
    //             })
    //             .then((response) => {
    //               axios
    //                 .get("http://localhost:8080/models/getLastModelId", {})
    //                 .then((response) => {
    //                   modelId = response.data;
    //                   axios.post("http://localhost:8080/url/add", {
    //                     id_model: modelId,
    //                     url: url,
    //                   });
    //                 })
    //                 .catch((error) => {
    //                   console.log(error);
    //                 });
    //             })
    //             .catch((error) => {
    //               console.log(error);
    //             });
    //         })
    //         .catch((urlError) => {
    //           // Maneja errores en la obtención de la URL
    //           console.error("Error getting file URL", urlError);
    //         });
    //     })
    //     .catch((error) => {
    //       // handle errors
    //       alert("Error uploading file");
    //       console.log(error);
    //     });
    //   console.log(formData.get("file"));
    //   formData.delete("file");
    // });
  };

  return (
    <>
      <button onClick={uploadFiles}>Subir Archivos</button>
    </>
  );
}

export default ButtonUploadFiles;
