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
    //Material button references group
    const [plaToggled, setPla] = useState(false)
    const [absToggled, setAbs] = useState(false)
    const [petgToggled, setPetg] = useState(false)
    const [tpuToggled, setTpu] = useState(false)
    const [carbonToggled, setCarbon] = useState(false)
    const [nylonToggled, setNylon] = useState(false)

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

    const handlePLA = (e)=>{
        if(plaToggled){
            setPla(!plaToggled)
            handlePLAToggle()
        }else{
            handleMaterialGroupToggle()
            setPla(!plaToggled)
            handlePLAToggle()
        }
        handleMaterial(e)
    }

    const handlePLAToggle = () =>{
        if(plaToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handleABS = (e)=>{
        if(absToggled){
            setAbs(!absToggled)
            handleAbsToggle()
        }else{
            handleMaterialGroupToggle()
            setAbs(!absToggled)
            handleAbsToggle()
        }
        handleMaterial(e)
    }

    const handleAbsToggle = () => {
        if(absToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handlePETG = (e)=>{
        if(petgToggled){
            setPetg(!petgToggled)
            handlePetgToggle()
        }else{
            handleMaterialGroupToggle()
            setPetg(!petgToggled)
            handlePetgToggle()
        }
        handleMaterial(e)
    }

    const handlePetgToggle = ()=>{
        if(petgToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handleTPU = (e)=>{
        if(tpuToggled){
            setTpu(!tpuToggled)
            handleTpuToggle()
        }else{
            handleMaterialGroupToggle()
            setTpu(!tpuToggled)
            handleTpuToggle()
        }
        handleMaterial(e)
    }

    const handleTpuToggle = ()=>{
        if(tpuToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handleCarbon = (e)=>{
        if(carbonToggled){
            setCarbon(!carbonToggled)
            handleCarbonToggle()
        }else{
            handleMaterialGroupToggle()
            setCarbon(!carbonToggled)
            handleCarbonToggle()
        }
        handleMaterial(e)
    }

    const handleCarbonToggle = ()=>{
        if(carbonToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handleNylon = (e)=>{
        if(nylonToggled){
            setNylon(!nylonToggled)
            handleNylonToggle()
        }else{
            handleMaterialGroupToggle()
            setNylon(!nylonToggled)
            handleNylonToggle()
        }
        handleMaterial(e)
    }

    const handleNylonToggle = ()=>{
        if(nylonToggled){
            return "bg-black text-white"
        }else{
            return ""
        }
    }

    const handleMaterialGroupToggle = ()=>{
        setPla(false)
        setAbs(false)
        setPetg(false)
        setTpu(false)
        setCarbon(false)
        setNylon(false)
    }

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
                                <p className="LoosFont text-lg flex w-full">ANCHURA:<p
                                    className="text-end LoosFont w-full">{modelDimensions.x.toFixed(2)}mm</p></p>
                            </div>
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10" src="../../public/heigth.png"/>
                                <p className="LoosFont text-lg flex w-full">ALTURA:<p
                                    className="text-end LoosFont w-full">{modelDimensions.y.toFixed(2)}mm</p></p>
                            </div>
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10" src="../../public/depth.png"/>
                                <p className="LoosFont text-lg flex w-full">PROFUNDIDAD:<p
                                    className="text-end LoosFont w-full">{modelDimensions.z.toFixed(2)}mm</p></p>
                            </div>
                            {modelVolume !== null && (
                                <div className="flex items-center gap-4">
                                    <img className="w-10 h-10" src="../../public/volume.png"/>
                                    <p className="LoosFont text-lg flex w-full">VOLUMEN:<p
                                        className="text-end LoosFont w-full"> {modelVolume.toFixed(2)}mm<sup>3</sup></p>
                                    </p>
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

            <div id="rightSidePanel" className="flex flex-col w-full bg-greenFooter justify-center items-center border border-slate-600 py-4">
                <div {...getRootProps()} className="w-[550px] h-[75px]">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>
                            Drop the files here ...
                        </p>
                    ) : (
                        <p className="bg-white h-full mx-auto border-2 border-dotted border-slate-600 text-center items-center">
                            Drag 'n' drop some files here, or click to select files
                        </p>
                    )}
                </div>
                <div>
                    <p className="LoosFont text-2xl text-center mt-4">Material</p>
                    <div className="border border-black w-full"></div>
                    <div className="grid grid-cols-3 justify-center items-center gap-4 mt-4">
                        <button
                            value="PLA"
                            onClick={handlePLA}
                            className={`${handlePLAToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            PLA
                        </button>
                        <button
                            value="ABS"
                            onClick={handleABS}
                            className={`${handleAbsToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            ABS
                        </button>
                        <button
                            value="PETG"
                            onClick={handlePETG}
                            className={`${handlePetgToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            PETG
                        </button>
                        <button
                            value="TPU"
                            onClick={handleTPU}
                            className={`${handleTpuToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            TPU
                        </button>
                        <button
                            value="Carbon"
                            onClick={handleCarbon}
                            className={`${handleCarbonToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            CARBON
                        </button>
                        <button
                            value="Nylon"
                            onClick={handleNylon}
                            className={`${handleNylonToggle()} LoosFont border border-black w-44 py-1 transition duration-300`}
                        >
                            NYLON
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="LoosFont text-2xl mt-4">Calidad</p>
                    <div className="border border-black w-full"></div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button
                            value="0.2"
                            onClick={handleQuality}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            0.2
                        </button>
                        <button
                            value="0.4"
                            onClick={handleQuality}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            0.4
                        </button>
                        <button
                            value="0.8"
                            onClick={handleQuality}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            0.8
                        </button>
                        <button
                            value="1"
                            onClick={handleQuality}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            1
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <p className="LoosFont text-2xl">Acabado</p>
                    <div className="border border-black w-full"></div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button
                            value="Sin"
                            onClick={handleFinish}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            Sin Procesar
                        </button>
                        <button
                            value="Bajo"
                            onClick={handleFinish}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            Procesado Bajo
                        </button>
                        <button
                            value="Medio"
                            onClick={handleFinish}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            Procesado Medio
                        </button>
                        <button
                            value="Alto"
                            onClick={handleFinish}
                            className="LoosFont border border-black w-44 py-1 hover:bg-slate-400 transition duration-300"
                        >
                            Procesado Alto
                        </button>
                    </div>
                </div>
                <button onClick={handleCalculate}
                        className="LoosFont bg-azulVolume px-12 py-1 border border-black mt-4 hover:bg-pinkVolume transition duration-300">
                    Calcular
                </button>
                <div className="mt-4">
                    {price != null && <p className="LoosFont text-xl">Precio: {price.toFixed(2)}€</p>}
                </div>
            </div>
        </div>
    );
}

export default Budget;
