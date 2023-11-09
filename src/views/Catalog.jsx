import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import Models from "../components/Models";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function showCatalog() {

const [catalogModels, setModels] = useState([]);

const [urlList, setUrls] = useState([]);

const [showLoaderPrompt, setLoaderPrompt] = useState(true);

const { state } = useLocation();
const nameSearch = state;
const [modelUrlFinded, setModelUrlFinded] = useState(null);

    useEffect(() => {
     axios.get('http://localhost:8080/models/getAll')
       .then((response) => {
        if(nameSearch == null){
            const filteredModels = response.data;
            setModels(filteredModels);
        } else {
            const filteredModels = response.data.filter((model) => model.title.toLowerCase().includes(nameSearch.toLowerCase()));
            setModels(filteredModels);
        }
      })
       .catch((error) => {
         console.error('Error fetching models data:', error);
      });


      axios.get('http://localhost:8080/url/getAll')
       .then((response) => {
            const urlList = response.data;
            setUrls(urlList);
            //Optimizar cogiendo solo las url que se muestren en el catalogo 
      })
       .catch((error) => {
         console.error('Error fetching urls data:', error);
      });

      const timer = setTimeout(() => {
        setLoaderPrompt(false);
    }, 1500);
    return () => clearTimeout(timer);
    
   }, [nameSearch]);

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', 
      };

    const modelStyle = {
        width: '30%', 
        marginBottom: '20px',
    };

    const navigate = useNavigate();
    


    const handleModelClick = (modelId) => {
        //const idUrl = urlList[1].id_model;
        const finded = urlList.find((url) => url.id_model === modelId);
        
        //console.log(`Model ${modelId}`);
        //console.log(`Model-URL ${idUrl}`);
        if(finded == null){
            navigate("/Front-Eco3DPrint/visualizarSTL", {
            state: finded
            });
        } else {
            //console.log(`URL ${finded.url}`);
            navigate("/Front-Eco3DPrint/visualizarSTL", {
            state: finded.url
            });
        }
      
    }

    const [cathegory, setCathegory] = React.useState('');

    const handleChange = (event) => {
        setCathegory(event.target.value);
        
    };

    //console.log(`Hola ${cathegory}`);

    const pickerStyle = {
        width: '170px', 
        marginBottom: '20px',
        marginLeft: '47px'
    };

  return (
    


    <div className="w-[60%] h-screen inline-block justify-start">
        {showLoaderPrompt?(
            <div className="w-full h-full flex items-center text-center justify-center">
                <div className="w-[200px] h-fit flex items-center justify-center">
                    <CircularProgress variant="plain"/>
                </div>
            </div>
            
        ):(
            <div>
            <div style={pickerStyle}>
                <Box >
                    <FormControl fullWidth>
                        <InputLabel id="select-id">Categoria</InputLabel>
                        <Select labelId="select-id" id="select-id" value={cathegory} label="Categoria" onChange={handleChange} >
                            <MenuItem value={"Arte"}>Arte</MenuItem>
                            <MenuItem value={"Herramientas"}>Herramientas</MenuItem>
                            <MenuItem value={"Complementos"}>Complementos</MenuItem>
                            <MenuItem value={"Juguetes"}>Juguetes</MenuItem>
                            <MenuItem value={"Figuras"}>Figuras</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
             </div>

            <div className="w-full h-fit mt-[6%] flex flex-wrap box-border animate-fade">
                {catalogModels.map((model, index) => (
                    <Models key={model.id} onClick={() => handleModelClick(model.id)} modelName={model.title}/>
                ))}
            </div>
            </div>
        )}

        </div>
  );
}

export default showCatalog;