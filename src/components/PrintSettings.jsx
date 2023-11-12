import React from "react";

function PrintSettings() {
  return (
    <div>
      <div class="mb-4">
        <label for="marcaFilamento" class="block">
          Marca del Filamento
        </label>
        <select id="marcaFilamento" class="w-full p-2 border rounded">
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="colorFilamento" class="block">
          Color del Filamento
        </label>
        <select id="colorFilamento" class="w-full p-2 border rounded">
          <option value="color1">Color 1</option>
          <option value="color2">Color 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="materialFilamento" class="block">
          Material del Filamento
        </label>
        <select id="materialFilamento" class="w-full p-2 border rounded">
          <option value="material1">Material 1</option>
          <option value="material2">Material 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="relleno" class="block">
          Relleno
        </label>
        <input type="number" id="relleno" class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label for="marcaImpresora" class="block">
          Marca de la Impresora
        </label>
        <select id="marcaImpresora" class="w-full p-2 border rounded">
          <option value="marca1">Marca 1</option>
          <option value="marca2">Marca 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="modeloImpresora" class="block">
          Modelo de la Impresora
        </label>
        <select id="modeloImpresora" class="w-full p-2 border rounded">
          <option value="modelo1">Modelo 1</option>
          <option value="modelo2">Modelo 2</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="resolucion" class="block">
          Resolución
        </label>
        <input
          type="number"
          id="resolucion"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label class="block">Soportes</label>
        <input type="radio" id="soportesSi" name="soportes" value="si" />
        <label for="soportesSi" class="mr-2">
          Sí
        </label>
        <input type="radio" id="soportesNo" name="soportes" value="no" />
        <label for="soportesNo">No</label>
      </div>
    </div>
  );
}

export default PrintSettings;
