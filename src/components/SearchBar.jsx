import ToggleButtonVolume from "./ToggleButtonVolume.jsx";
import React, { useEffect, useState } from "react";
import CatalogItem from "./CatalogItem.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function SearchBar(){
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const drawerOpen = "translate-y-72"
    const blurCatalog = "blur-sm"
    const openDrawer = ()=>{
        setDrawerIsOpen(true)
        handleDrawer()
    }

    const closeDrawer = ()=>{
        setDrawerIsOpen(false)
        handleDrawer()
    }

    const handleDrawer = ()=>{
        blurOnSearch()
        if(drawerIsOpen){
            return drawerOpen
        }
    }

    const blurOnSearch = ()=>{
        if(drawerIsOpen){
            return blurCatalog
        }
    }

    const [catalogModels, setAllModels] = useState([]);
    const [shownModels, setShownModels] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const [accesoriosToggled, setAccesorios] = useState(false);
    const [herramientasToggled, setHerramientas] = useState(false);
    const [complementosToggled, setComplementos] = useState(false);
    const [juguetesToggled, setJuguetes] = useState(false);
    const [figurasToggled, setFiguras] = useState(false);
    const [mecanismosToggled, setMecanismos] = useState(false);
    

    const handleToggle = (toggledValue, label) => {
        
        if(label == "Accesorios"){
            setAccesorios(toggledValue);
        } else if(label == "Figuras"){
            setFiguras(toggledValue);
        }else if(label == "Herramientas"){
            setHerramientas(toggledValue);
        }else if(label == "Complementos"){
            setComplementos(toggledValue);
        }else if(label == "Juguetes"){
            setJuguetes(toggledValue);
        }else if(label == "Mecanismos"){
            setMecanismos(toggledValue);
        }
    }

    const toggleAllDisabled = !(accesoriosToggled || herramientasToggled || complementosToggled || juguetesToggled || figurasToggled || mecanismosToggled);
  
    
      function handleKeyPress(e) {
        if (e.key === "Enter") {
            closeDrawer();
            if ((searchTerm == null || searchTerm == "")) {
                if(toggleAllDisabled){
                    setShownModels(catalogModels);
                } else {
                    let categoryModels = [];
                    let shownModels = [];

                    if(accesoriosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Accesorios"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    } 
                    if(herramientasToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Herramientas"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(complementosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Complementos"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(juguetesToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Juguetes"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(figurasToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Figuras"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(mecanismosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Mecanismos"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    setShownModels(shownModels);
                }
            } else {
                if(toggleAllDisabled){
                    const searchModels = catalogModels.filter((model) => 
                       model.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setShownModels(searchModels);
                } else {
                    let categoryModels = [];
                    let shownModels = [];

                    if(accesoriosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Accesorios"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    } 
                    if(herramientasToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Herramientas"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(complementosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Complementos"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(juguetesToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Juguetes"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(figurasToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Figuras"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }
                    if(mecanismosToggled){
                        categoryModels = catalogModels.filter(
                            (model) => model.category == "Mecanismos"
                        );
                        shownModels = shownModels.concat(categoryModels);
                    }

                    const searchModels = shownModels.filter((model) => 
                       model.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setShownModels(searchModels);
                }
            }
        }
                
      }

    const navigate = useNavigate();

    const handleModelClick = (model) => {
        console.log("id:  ", model.id);
        if (model.mainUrl == null) {
          navigate("/Volume/visualizarSTL", {
            state: "thinker.stl",
          });
        } else if (model.mainUrl.length < 1) {
          navigate("/Volume/visualizarSTL", {
            state: "thinker.stl",
          });
        } else {
          navigate("/Volume/visualizarSTL", {
            state: {
              modelID: model.id,
              modelName: model.title,
            },
          });
        }
    };

        
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonClick = (buttonNumber) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Agrega un desplazamiento suave
        });
        setSelectedButton(buttonNumber);
    };

    const [numMod, setNumMod] = useState(10);
    
    const setNumModMostrados = (event) => {
        setNumMod(event.target.value);
        handleButtonClick(1);
    };

    const getButtonStyle = (buttonNumber) => {
        return {
        backgroundColor: selectedButton === buttonNumber ? '#4D82DF' : 'white'
        };
    };

    const [pagesButtons, setPagesButtons] = useState([]);
 

    useEffect(() => {
        axios
        .get("http://localhost:8080/models/getAll")
        .then((response) => {

            const filteredModels = response.data;
            setAllModels(filteredModels);
            if(shownModels.length == 0){
                setShownModels(filteredModels);
            }
        })
        .catch((error) => {
            console.error("Error fetching models data:", error);
        });

        const lista = [];

        const long = Math.ceil(shownModels.length / numMod);;
        for (let i = 1; i <= long; i++) {
            lista.push(i);
        }
        setPagesButtons(lista);

    }, [shownModels, numMod]);

    return(
        <div className="overflow-y-hidden mt-12">
            <div onMouseLeave={closeDrawer}>
                <div className="flex items-center gap-8 bg-pinkVolume p-4 relative z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <div className="w-full">
                        <input 
                            placeholder="Buscar en Volume" 
                            onClick={openDrawer}  
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-transparent text-2xl placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-transparent"/>
                    </div>
                </div>
                <div id="catalogDrawer" className={`${handleDrawer()} w-full bg-pinkVolume flex justify-center p-8 transition relative z-10 duration-300 -mt-72 mb-52 drop-shadow-dark`}>
                    <div className="grid grid-cols-3 p-4 gap-10 w-[70%] pb-16">
                        <div>
                            <ToggleButtonVolume label={"Accesorios"} onToggle={handleToggle}/>
                            
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Herramientas"} onToggle={handleToggle}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Complementos"} onToggle={handleToggle}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Juguetes"} onToggle={handleToggle}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Figuras"} onToggle={handleToggle}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Mecanismos"} onToggle={handleToggle}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="catalogItemsContainer" className={`${blurOnSearch()} -mt-32 transition duration-300 relative z-0`}>
                Número de modelos:
            <select className="mb-4 ml-2" value={numMod} onChange={setNumModMostrados}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
            </select>

                <div id="catalogGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {shownModels.slice(numMod*(selectedButton-1), numMod*selectedButton).map((model, index) => (
                        <CatalogItem
                            key={model.id}
                            onClick={() => handleModelClick(model)}
                            modelName={model.title}
                            modelImage={model.imageUrl}
                            modelAuthor={model.author}
                        />
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-center">
                    {pagesButtons.map((buttonNumber) => (
                        <button className="w-8 h-8 mx-2 rounded-full border border-black"
                        key={buttonNumber}
                        style={getButtonStyle(buttonNumber)}
                        onClick={() => handleButtonClick(buttonNumber)}
                        >
                        {buttonNumber}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}