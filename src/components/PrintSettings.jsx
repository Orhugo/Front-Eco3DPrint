import React, { useState } from "react";
import Dropzone from "./Dropzone";

function PrintSettings() {
  const [info, setInfo] = useState({
    title: "",
    description: "",
    marcaFilamento: "",
    colorFilamento: "",
    materialFilamento: "",
    relleno: "",
    marcaImpresora: "",
    modeloImpresora: "",
    resolucion: "",
    soportes: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marcaFilamento, setMarcaFilamento] = useState("");
  const [colorFilamento, setColorFilamento] = useState("");
  const [materialFilamento, setMaterialFilamento] = useState("");
  const [relleno, setRelleno] = useState("");
  const [marcaImpresora, setMarcaImpresora] = useState("");
  const [modeloImpresora, setModeloImpresora] = useState("");
  const [resolucion, setResolucion] = useState("");
  const [soportes, setSoportes] = useState("");

  const handleOnBlurTitle = (event) => {
    const titulo = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, title: titulo }));
  };

  const handleOnBlurDescription = (event) => {
    const desc = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, description: desc }));
  };

  const handleMarcaFilamento = (event) => {
    const marcaFil = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, marcaFilamento: marcaFil }));
  };

  const handleColorFilamento = (event) => {
    const color = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, colorFilamento: color }));
  };

  const handleMaterialFilamento = (event) => {
    const material = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, materialFilamento: material }));
  };

  const handleRelleno = (event) => {
    const rell = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, relleno: rell }));
  };

  const handleMarcaImpresora = (event) => {
    const marcaImp = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, marcaImpresora: marcaImp }));
  };

  const handleModeloImpresora = (event) => {
    const modelo = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, modeloImpresora: modelo }));
  };

  const handleResolucion = (event) => {
    const res = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, resolucion: res }));
  };

  const handleSoportes = (event) => {
    const supports = event.target.value === "si" ? true : false;
    setInfo((prevInfo) => ({ ...prevInfo, soportes: supports }));
  };

  return (
    <div>
      <Dropzone info={info} />
      <h1 className="font-extrabold text-3xl mt-[10px]">File details</h1>
      <div className="fileDetails">
        Title (required){" "}
        <input
          type="text"
          id="resolucion"
          className="w-full p-2 border rounded mb-[4px]"
          onBlur={handleOnBlurTitle}
        />
      </div>
      <div className="fileDetails">
        Description (required){" "}
        <input
          type="text"
          id="resolucion"
          className="w-full p-2 border rounded mb-[4px]"
          onBlur={handleOnBlurDescription}
          variant="outlined"
        />
      </div>
      <div className="mb-4">
        <label for="marcaFilamento" className="block">
          Marca del Filamento
        </label>
        <select
          id="marcaFilamento"
          className="w-full p-2 border rounded"
          onChange={handleMarcaFilamento}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label for="colorFilamento" className="block">
          Color del Filamento
        </label>
        <select
          id="colorFilamento"
          className="w-full p-2 border rounded"
          onChange={handleColorFilamento}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="color1">Color 1</option>
          <option value="color2">Color 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label for="materialFilamento" className="block">
          Material del Filamento
        </label>
        <select
          id="materialFilamento"
          className="w-full p-2 border rounded"
          onChange={handleMaterialFilamento}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="material1">Material 1</option>
          <option value="material2">Material 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label for="relleno" className="block">
          Relleno
        </label>
        <input
          type="number"
          id="relleno"
          className="w-full p-2 border rounded"
          max={100}
          onChange={handleRelleno}
        />
      </div>

      <div className="mb-4">
        <label for="marcaImpresora" className="block">
          Marca de la Impresora
        </label>
        <select
          id="marcaImpresora"
          className="w-full p-2 border rounded"
          onChange={handleMarcaImpresora}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label for="modeloImpresora" className="block">
          Modelo de la Impresora
        </label>
        <select
          id="modeloImpresora"
          className="w-full p-2 border rounded"
          onChange={handleModeloImpresora}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="modelo1">Modelo 1</option>
          <option value="modelo2">Modelo 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label for="resolucion" className="block">
          Resolución
        </label>
        <select id="resolucion" onChange={handleResolucion}>
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="0.2">0.2</option>
          <option value="0.4">0.4</option>
          <option value="0.8">0.8</option>
          <option value="1">1</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block">Soportes</label>
        <input
          type="radio"
          id="soportesSi"
          name="soportes"
          value="si"
          onChange={handleSoportes}
        />
        <label for="soportesSi" className="mr-2">
          Sí
        </label>
        <input type="radio" id="soportesNo" name="soportes" value="no" />
        <label for="soportesNo">No</label>
      </div>
    </div>
  );
}

export default PrintSettings;
