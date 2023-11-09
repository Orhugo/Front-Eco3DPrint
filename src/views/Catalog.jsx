import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import Models from "../components/Models";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from 'axios';

export function showCatalog() {

const [catalogModels, setModels] = useState([]);
const [showLoaderPrompt, setLoaderPrompt] = useState(true);
const { state } = useLocation();
const name = state;

    useEffect(() => {
     axios.get('http://localhost:8080/models/getAll')
       .then((response) => {
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaderPrompt(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

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
    <div className="w-[60%] h-screen inline-block justify-start">
        {showLoaderPrompt?(
            <div className="w-full h-full flex items-center text-center justify-center">
                <div className="w-[200px] h-fit flex items-center justify-center">
                    <CircularProgress variant="plain"/>
                </div>
            </div>

        ):(
            <div className="w-full h-fit mt-[6%] flex flex-wrap box-border animate-fade">
                {catalogModels.map((model, index) => (
                    <Models key={model.id} onClick={() => handleModelClick(index)} modelName={model.title}/>
                ))}
            </div>
        )}
     </div>
  );
}

export default showCatalog;