import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { StlViewer } from "react-stl-viewer";
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import axios from "axios";

const densidades = {
  PLA: 1.24,
  ABS: 1.04,
  PETG: 1.27,
  TPU: 1.21,
  Carbon: 1.3,
  Nylon: 1.52,
};

//En metros
const metrosEnKilo = {
  PLA: 330,
  ABS: 400,
  PETG: 328,
  TPU: 344,
  Carbon: 320,
  Nylon: 274,
};

//En euros
const precioPorKilo = {
  PLA: 20,
  ABS: 22,
  PETG: 25,
  TPU: 30,
  Carbon: 35,
  Nylon: 40,
};

//En cm^3
const volumenPorKilo = {
  PLA: 805,
  ABS: 962,
  PETG: 789,
  TPU: 827,
  Carbon: 770,
  Nylon: 660,
};

function Budget() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [modelDimensions, setModelDimensions] = useState(null);
  const [modelVolume, setModelVolume] = useState(null);
  const [modelScale, setModelScale] = useState(1);

  const calculatePrice = (material, volumen) => {
    const precio =
      (volumen / 1000) * densidades[material] * precioPorKilo[material];
    return precio;
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);

    const loader = new STLLoader();
    loader.load(URL.createObjectURL(acceptedFiles[0]), (geometry) => {
      if (geometry) {
        const dimensions = getDimensions(geometry);
        setModelDimensions(dimensions);
        console.log("Dimensiones del modelo:", dimensions);
      }
      processStl(acceptedFiles[0]);
    });
  }, []);

  async function processStl(file) {
    let formData = new FormData();
    formData.append("file", file);
    let response = await axios.post(
      "http://127.0.0.1:5000/process-stl",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.volume);
    setModelVolume(response.data.volume / 1000);
  }

  const getDimensions = (geometry) => {
    const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
    const size = box.getSize(new THREE.Vector3());
    return size;
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setModelScale(newScale);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "model/stl": [".stl"] },
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
                  color: "gray",
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
              <p>Ancho: {modelDimensions.x.toFixed(2)}</p>
              <p>Alto: {modelDimensions.y.toFixed(2)}</p>
              <p>Profundidad: {modelDimensions.z.toFixed(2)}</p>
            </div>

            {modelVolume !== null && (
              <p>Volumen del modelo: {modelVolume.toFixed(2)}</p>
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

      <div className="flex w-[1400px] h-[700px] bg-red-500 justify-center flex-col items-center">
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
        <div>
          Material
          <div>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              PLA
            </button>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              ABS
            </button>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              PETG
            </button>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              TPU
            </button>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              Carbon
            </button>
            <button className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              Nylon
            </button>
          </div>
        </div>
        <div>Calidad</div>
        <div>Acabado</div>
      </div>
    </div>
  );
}

export default Budget;
