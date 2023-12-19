import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {StlViewer} from "react-stl-viewer";
import * as THREE from "three";
import {STLLoader} from "three/addons/loaders/STLLoader.js";
import axios from "axios";

const densidades = {
    PLA: 1.24,
    ABS: 1.04,
    PETG: 1.27,
    TPU: 1.21,
    Carbon: 1.3,
    Nylon: 1.52,
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

const precioPorCalidad = {
    0.2: 2,
    0.4: 1.5,
    0.8: 1,
    1: 0.5,
};

const precioPorAcabado = {
    Sin: 0,
    Bajo: 2,
    Medio: 4,
    Alto: 6,
};

function Budget() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [modelDimensions, setModelDimensions] = useState(null);
    const [modelVolume, setModelVolume] = useState(null);
    const [modelScale, setModelScale] = useState(1);
    const [originalDimensions, setOriginalDimensions] = useState(null);
    const [originalVolume, setOriginalVolume] = useState(null);

    const [material, setMaterial] = useState(null);
    const [quality, setQuality] = useState(null);
    const [finish, setFinish] = useState(null);

    const [price, setPrice] = useState(null);

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
                setOriginalDimensions(dimensions);
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
        setOriginalVolume(response.data.volume / 1000);
    }

    const getDimensions = (geometry) => {
        const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
        const size = box.getSize(new THREE.Vector3());
        return size;
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setModelScale(newScale);
        const newDimensions = {
            x: originalDimensions.x * newScale,
            y: originalDimensions.y * newScale,
            z: originalDimensions.z * newScale,
        };
        setModelDimensions(newDimensions);
        const newVolume = originalVolume * newScale;
        setModelVolume(newVolume);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {"model/stl": [".stl"]},
    });

    const handleMaterial = (e) => {
        const mat = e.target.value;
        setMaterial(mat);
    };

    const handleQuality = (e) => {
        const qual = e.target.value;
        setQuality(qual);
    };

    const handleFinish = (e) => {
        const fin = e.target.value;
        setFinish(fin);
    };

    const handleCalculate = () => {
        const precioMaterial = calculatePrice(material, modelVolume);
        const precioCalidad = precioPorCalidad[quality];
        const precioAcabado = precioPorAcabado[finish];
        const precio = precioMaterial + precioCalidad + precioAcabado;
        setPrice(precio);
    };

    return (
        <div id="mainBudgetContainer" className="flex w-[90%] mt-5 gap-4">
            <div id="leftSidePanel" className="border border-slate-600 bg-azulVolume pb-4">
                <div id="stlViewerContainer">
                    {uploadedFiles.length > 0 && (
                        <div className="p-6">
                            <StlViewer
                                className="w-[350px] h-[350px] border border-black bg-slate-100"
                                url={URL.createObjectURL(uploadedFiles[0])}
                                orbitControls
                                modelProps={{
                                    color: "#0a6bc1",
                                    positionX: 0,
                                    positionY: 0,
                                    scale: modelScale,
                                }}
                            />
                        </div>
                    )}
                </div>

                {uploadedFiles.length > 0 && modelDimensions && (
                    <div className="flex flex-col items-center gap-4 w-full mx-auto">
                        <p className="LoosFont text-xl">Información del modelo</p>
                        <div className="flex flex-col gap-4 w-[80%]">
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10" src="../../public/width.png"/>
                                <p className="LoosFont text-lg flex w-full">ANCHURA:<p className="text-end LoosFont w-full">{modelDimensions.x.toFixed(2)}mm</p></p>
                            </div>
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10" src="../../public/heigth.png"/>
                                <p className="LoosFont text-lg flex w-full">ALTURA:<p className="text-end LoosFont w-full">{modelDimensions.y.toFixed(2)}mm</p></p>
                            </div>
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10" src="../../public/depth.png"/>
                                <p className="LoosFont text-lg flex w-full">PROFUNDIDAD:<p className="text-end LoosFont w-full">{modelDimensions.z.toFixed(2)}mm</p></p>
                            </div>
                            {modelVolume !== null && (
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10" src="../../public/volume.png"/>
                                    <p className="LoosFont text-lg flex w-full">VOLUMEN:<p
                                        className="text-end LoosFont w-full"> {modelVolume.toFixed(2)}mm<sup>3</sup></p></p>
                                </div>
                                )}
                        </div>


                        <div className="LoosFont flex flex-col items-center">
                            Cambiar tamaño:
                            <input
                                type="number"
                                step="0.01"
                                value={modelScale}
                                onChange={handleScaleChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col h-[700px] w-[1400px] bg-greenFooter justify-center items-center rounded-xl">
                <div {...getRootProps()} className="w-[550px] h-[75px] mb-10">
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
                <div>Material</div>
                <div className="flex justify-center items-center mb-[50px]">
                    <div className="flex flex-col items-center mr-5">
                        <button
                            value="PLA"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            PLA
                        </button>
                        <button
                            value="ABS"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            ABS
                        </button>
                    </div>
                    <div className="flex flex-col items-center mr-5">
                        <button
                            value="PETG"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            PETG
                        </button>
                        <button
                            value="TPU"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            TPU
                        </button>
                    </div>
                    <div className="flex flex-col items-center mr-5">
                        <button
                            value="Carbon"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Carbon
                        </button>
                        <button
                            value="Nylon"
                            onClick={handleMaterial}
                            className="inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Nylon
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mb-[50px]">
                    Calidad
                    <div className="flex-col">
                        <button
                            value="0.2"
                            onClick={handleQuality}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            0.2
                        </button>
                        <button
                            value="0.4"
                            onClick={handleQuality}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            0.4
                        </button>
                        <button
                            value="0.8"
                            onClick={handleQuality}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            0.8
                        </button>
                        <button
                            value="1"
                            onClick={handleQuality}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            1
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mb-[60px]">
                    Acabado
                    <div className="flex-col">
                        <button
                            value="Sin"
                            onClick={handleFinish}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Sin Procesar
                        </button>
                        <button
                            value="Bajo"
                            onClick={handleFinish}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Procesado Bajo
                        </button>
                        <button
                            value="Medio"
                            onClick={handleFinish}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Procesado Medio
                        </button>
                        <button
                            value="Alto"
                            onClick={handleFinish}
                            className="mr-5 inline-block w-[200px] rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                            Procesado Alto
                        </button>
                    </div>
                </div>
                <button onClick={handleCalculate} className="bg-blue-500">
                    Calcular
                </button>
                {price != null && <p>Precio: {price.toFixed(2)}</p>}
            </div>
        </div>
    );
}

export default Budget;
