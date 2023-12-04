import React, { useState } from "react";
import Dropzone from "./Dropzone";
import { createClient } from '@supabase/supabase-js';

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


  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const supabaseUrl = 'https://ohjmhtpmzrwhleemxqgr.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oam1odHBtenJ3aGxlZW14cWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMzA0NjQsImV4cCI6MjAxNDYwNjQ2NH0.a8yTP4L8J_qPPzOBasqmFjMuftpA279n4fgRoLWQgW8';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const path = `public/${file.name}`;
      const { data, error } = await supabase.storage.from('test').upload(path, file);

      if (error) {
        console.error('Error al subir la imagen:', error.message);
      } else {
        const imageUrl = `${supabaseUrl}/storage/v1/object/public/test/${path}`;
      
        setImageUrl(imageUrl);

        console.log('Imagen subida con éxito:', data);
        console.log('URL de la imagen:', imageUrl);
      }
    } finally {
      setUploading(false);
    }
  };
  const modelImage = "https://ohjmhtpmzrwhleemxqgr.supabase.co/storage/v1/object/public/test/public/face.jpg";
  return (
    <div className="mx-auto">
      <Dropzone info={info}/>
      <h1 className="font-extrabold text-3xl mt-[10px]">File details</h1>
      <div className="fileDetails">
        Title (required){" "}
        <input
          type="text"
          id="resolucion"
          className="w-full p-2 border rounded mb-4"
          onBlur={handleOnBlurTitle}
        />
      </div>
      <div className="fileDetails">
        Description (required){" "}
        <input
          type="text"
          id="resolucion"
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
        <select defaultValue="" id="resolucion" onChange={handleResolucion}>
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

      <div>
        <h1 className="font-extrabold text-3xl mt-[10px] my-4"> Image </h1>
          <div className="w-36 h-36 border-2 border-black mb-4 overflow-hidden">
            {<img className="w-full h-full object-cover" src={imageUrl || "./stl_icon.png"} alt="Uploaded" />}
          </div>
        <input className=" border-2 border-black  rounded" type="file" onChange={handleFileChange} />
        <button className="w-36 h-12 ml-2 border-2 border-black bg-green-300 rounded" onClick={handleUpload} disabled={uploading}>
          Subir Imagen
        </button>

        {uploading && <p>Subiendo...</p>}
        {/* {imageUrl && <p>URL de la imagen: {imageUrl}</p>} */}
      </div>
      
    </div>
  );
        
}

export default PrintSettings;
