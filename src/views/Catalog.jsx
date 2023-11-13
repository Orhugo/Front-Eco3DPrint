import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Models from "../components/Models";
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

    const {state} = useLocation();
    const nameSearch = state;
    const [modelUrlFinded, setModelUrlFinded] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/models/getAll').then((response) => {
            if (nameSearch == null) {
                const filteredModels = response.data;
                setModels(filteredModels);
            } else {
                const filteredModels = response.data.filter((model) => model.title.toLowerCase().includes(nameSearch.toLowerCase()));
                setModels(filteredModels);
            }
        }).catch((error) => {
            console.error('Error fetching models data:', error);
        });
        const timer = setTimeout(() => {
            setLoaderPrompt(false);
        }, 1000);
        return () => clearTimeout(timer);

    }, [nameSearch]);

    const navigate = useNavigate();

    const handleModelClick = (mainUrl) => {
        if(mainUrl == null){
            navigate("/Volume/visualizarSTL", {
                state: "thinker.stl"
            });
        }else if(mainUrl.length < 1){
            navigate("/Volume/visualizarSTL", {
                state: "thinker.stl"
            });
        }else{
            navigate("/Volume/visualizarSTL", {
                state: mainUrl
            });
        }
    }

    const [cathegory, setCathegory] = React.useState('');

    const handleChange = (event) => {
        setCathegory(event.target.value);

    };

    const pickerStyle = {
        width: '170px',
        marginBottom: '20px',
        marginLeft: '47px'
    };

    return (
        <div className="w-[60%] h-screen inline-block justify-start">
            {showLoaderPrompt ? (
                <div className="w-full h-full flex items-center text-center justify-center">
                    <div className="w-[200px] h-fit flex items-center justify-center">
                        <CircularProgress variant="plain"/>
                    </div>
                </div>
            ):(
                <div>
                    <div style={pickerStyle}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="select-id">Categoria</InputLabel>
                                <Select labelId="select-id" id="select-id" value={cathegory} label="Categoria"
                                        onChange={handleChange}>
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
                            <Models key={model.id} onClick={() => handleModelClick(null)} modelName={model.title} modelUrl={model.mainUrl}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default showCatalog;