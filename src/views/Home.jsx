import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <h1>Página de inicio</h1>
      <button onClick={() => {navigate('/subirArchivo')}}>Subir Archivo</button>
      <button onClick={() => {navigate('/visualizarSTL')}}>Visualizar STL</button>
      <button onClick={() => {navigate('/UserRegistration')}}>Registrate</button>
      <button onClick={() => {navigate('/ProfileConfig')}}>ModifyProfile</button>
    </div>
    </>
  );
}

export default Home;
