import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { StlViewer } from 'react-stl-viewer';
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

function Budget() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [modelDimensions, setModelDimensions] = useState(null);
  const [modelVolume, setModelVolume] = useState(null);
  const [modelScale, setModelScale] = useState(1);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);

    const loader = new STLLoader();
    loader.load(URL.createObjectURL(acceptedFiles[0]), (geometry) => {
      if (geometry) {
        const dimensions = getDimensions(geometry);
        setModelDimensions(dimensions);
        console.log('Dimensiones del modelo:', dimensions);

        const volume = calculateVolume(geometry);
        setModelVolume(volume);
        console.log('Volumen del modelo:', volume);
      } else {
        console.error('Error al cargar la geometría del modelo.');
      }
    });
  }, []);

  const getDimensions = (geometry) => {
    const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
    const size = box.getSize(new THREE.Vector3());
    return size;
  };

  const calculateVolume = (geometry) => {
    const position = geometry.attributes.position;

    const vertices = [];
    const count = position.count;

    for (let i = 0; i < count; i++) {
      const vertex = new THREE.Vector3(
        position.getX(i),
        position.getY(i),
        position.getZ(i)
      );
      vertices.push(vertex);
    }

    let volume = 0;

    for (let i = 0; i < vertices.length; i += 3) {
      const v0 = vertices[i];
      const v1 = vertices[i + 1];
      const v2 = vertices[i + 2];

      const v0v1 = v1.clone().sub(v0);
      const v0v2 = v2.clone().sub(v0);

      const tetrahedronVolume = v0v1.cross(v0v2).length() / 6;
      volume += tetrahedronVolume;
    }

    const scaledVolume = volume * Math.pow(modelScale, 3);
    return scaledVolume;
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setModelScale(newScale);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'model/stl': ['.stl'] },
  });

  return (
    <div className="flex h-screen w-[90%] pt-[7%]">
      <div className="w-[600px] h-[700px] bg-blue-400 mr-5">
        <div className="mt-5">
          {uploadedFiles.length > 0 && (
            <div className="w-[512px] h-[400px] bg-white">
              <StlViewer
                className="w-[512px] h-[400px]"
                url={URL.createObjectURL(uploadedFiles[0])}
                orbitControls
                modelProps={{
                  color: 'gray',
                  positionX: 0,
                  positionY: 0,
                  scale: modelScale,
                }}
              />
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && modelDimensions && (
          <div>
            <p>Información del modelo:</p>
            <div>
              <p>Ancho: {modelDimensions.x}</p>
              <p>Alto: {modelDimensions.y}</p>
              <p>Profundidad: {modelDimensions.z}</p>
            </div>

            {modelVolume !== null && (
              <p>Volumen del modelo: {modelVolume}</p>
            )}

            <label>
              Cambiar tamaño:
              <input
                type="number"
                step="0.1"
                value={modelScale}
                onChange={handleScaleChange}
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex w-[1400px] h-[700px] bg-red-500 justify-center">
        <div {...getRootProps()} className="w-[550px] h-[75px]">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="bg-blue-200 rounded w-[550px] h-[75px] border-4 border-dashed border-blue-500">
              Drop the files here ...
            </p>
          ) : (
            <p className="bg-white w-[550px] h-[75px] rounded border-4 border-dashed border-gray-600">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Budget;
