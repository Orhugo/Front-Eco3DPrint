import { useState, useEffect } from "react";
import React from "react";
import { StlViewer } from "react-stl-viewer";
import { useLocation } from 'react-router-dom';
import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: 'TU_ACCESS_KEY_ID',
//   secretAccessKey: 'TU_SECRET_ACCESS_KEY',
// });

// const s3 = new AWS.S3();

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export function VisualizarSTL() {

  const { state } = useLocation();
  const url = state ? state + ".stl" : "Face.stl";
  // const [url, setUrl] = useState(null);
  
  // useEffect(() => {
  //   // Nombre del archivo en S3
  //   const s3FileName = "1697792052233_Face.stl";

  //   // Nombre del bucket en S3
  //   const s3BucketName = "stl-models-bucket";

  //   // Llama a getObject para obtener el archivo desde S3
  //   s3.getObject({ Bucket: s3BucketName, Key: s3FileName }, (err, data) => {
  //     if (err) {
  //       console.error("Error al obtener el archivo desde S3:", err);
  //     } else {
  //       // URL del archivo en S3
  //       const s3FileUrl = data.Location;
  //       setUrl(s3FileUrl);
  //     }
  //   });
  // }, []);

  // if (!url) {
  //   return <div>Cargando...</div>;
  // }

  return (
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
  );
}

export default VisualizarSTL;