import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import Models from "../components/Models";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function showCatalog() {

const [catalogModels, setModels] = useState([]);
const { state } = useLocation();
const name = state;

 useEffect(() => {
     axios.get('http://localhost:8080/models/getAll')
       .then((response) => {
        console.log(name);
        if(name == null){
            const filteredModels = response.data;
            setModels(filteredModels);
        } else {
            const filteredModels = response.data.filter((model) => model.title.toLowerCase().includes(name.toLowerCase()));
            setModels(filteredModels);
        }
      })
       .catch((error) => {
         console.error('Error fetching data:', error);
      });
   }, [name]);

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', 
      };

    const modelStyle = {
        width: '30%', // Asegura que haya tres modelos por fila
        marginBottom: '20px',
    };

    const navigate = useNavigate();

       // console.log(`Model with ID ${modelId} clicked.`);      

    const handleModelClick = (modelId) => {
        if (modelId == 0) {
            navigate("/Front-Eco3DPrint/visualizarSTL", {
            state: "Face"
            });
        }else if(modelId == 1){
            navigate("/Front-Eco3DPrint/visualizarSTL", {
                state: "Graisseur"
            });
        } else{
            navigate("/Front-Eco3DPrint/visualizarSTL", {
                state: "thinker"
            });
        }
    }

  return (
    <div>
        <div style={containerStyle}>
            {catalogModels.map((model, index) => (
             <Models key={model.id} style={modelStyle} onClick={() => handleModelClick(index)} modelName={model.title}/>
        ))}
        </div>
     </div>
  );
}

export default showCatalog;