import React, { useState } from "react";

function OnlyPrintSettings() {
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
    categoria: "",
    pago: "",
  });

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

  const handlePago = (event) => {
    const payment = event.target.value === "si" ? true : false;
    setInfo((prevInfo) => ({ ...prevInfo, pago: payment }));
  };

  const handleCategoria = (event) => {
    const categoria = event.target.value;
    setInfo((prevInfo) => ({ ...prevInfo, categoria: categoria }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-3xl mt-[10px]">File details</h1>
      <div className="fileDetails">
        Title (required){" "}
        <input
          type="text"
          id="title"
          data-testid="title"
          className="w-full p-2 border rounded mb-4"
          onBlur={handleOnBlurTitle}
        />
      </div>
      <div className="fileDetails">
        Description (required){" "}
        <input
          type="text"
          id="description"
          data-testid="description"
          className="w-full p-2 border rounded mb-4"
          onBlur={handleOnBlurDescription}
          variant="outlined"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="marcaFilamento" className="block">
          Categoría
        </label>
        <select
          defaultValue=""
          id="categoria"
          data-testid="categoria"
          className="w-full p-2 border rounded"
          onChange={handleCategoria}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="Herramientas">Herramientas</option>
          <option value="Complementos">Complementos</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Figuras">Figuras</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="marcaFilamento" className="block">
          Marca del Filamento
        </label>
        <select
          defaultValue=""
          id="marcaFilamento"
          data-testid="marcaFilamento"
          className="w-full p-2 border rounded"
          onChange={handleMarcaFilamento}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="colorFilamento" className="block">
          Color del Filamento
        </label>
        <select
          defaultValue=""
          id="colorFilamento"
          data-testid="colorFilamento"
          className="w-full p-2 border rounded"
          onChange={handleColorFilamento}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="color1">Color 1</option>
          <option value="color2">Color 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="materialFilamento" className="block">
          Material del Filamento
        </label>
        <select
          defaultValue=""
          id="materialFilamento"
          data-testid="materialFilamento"
          className="w-full p-2 border rounded"
          onChange={handleMaterialFilamento}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="material1">Material 1</option>
          <option value="material2">Material 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="relleno" className="block">
          Relleno
        </label>
        <input
          type="number"
          id="relleno"
          data-testid="relleno"
          className="w-full p-2 border rounded"
          max={100}
          onChange={handleRelleno}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="marcaImpresora" className="block">
          Marca de la Impresora
        </label>
        <select
          defaultValue=""
          id="marcaImpresora"
          data-testid="marcaImpresora"
          className="w-full p-2 border rounded"
          onChange={handleMarcaImpresora}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="modeloImpresora" className="block">
          Modelo de la Impresora
        </label>
        <select
          defaultValue=""
          id="modeloImpresora"
          data-testid="modeloImpresora"
          className="w-full p-2 border rounded"
          onChange={handleModeloImpresora}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="modelo1">Modelo 1</option>
          <option value="modelo2">Modelo 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="resolucion" className="block">
          Resolución
        </label>
        <select defaultValue="" id="resolucion" data-testid="resolucion" onChange={handleResolucion}>
          <option value="" disabled>
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
          data-testid="soportes"
          name="soportes"
          value="si"
          onChange={handleSoportes}
        />
        <label htmlFor="soportesSi" className="mr-2">
          Sí
        </label>
        <input type="radio" id="soportesNo" name="soportes" value="no" onChange={handleSoportes}/>
        <label htmlFor="soportesNo">No</label>
      </div>

      <div className="mb-4">
        <label className="block">Modelo de pago</label>
        <input
          type="radio"
          id="pagoSi"
          data-testid="pago"
          name="pago"
          value="si"
          onChange={handlePago}
        />
        <label htmlFor="pagosSi" className="mr-2">
          Sí
        </label>
        <input type="radio" id="pagoNo" name="pago" value="no" onChange={handlePago}/>
        <label htmlFor="pagoNo">No</label>
      </div>
    </div>
  );
}

export default OnlyPrintSettings;
