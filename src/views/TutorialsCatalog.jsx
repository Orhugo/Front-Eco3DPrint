import ToggleButtonVolume from "../components/ToggleButtonVolume.jsx";
import React, { useEffect, useState } from "react";
import CatalogItem from "../components/CatalogItem.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Tutorial from "../components/Tutorial.jsx";

export default function SearchBar(){
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const drawerOpen = "translate-y-72"
    const blurCatalog = "blur-sm"

    const loading = '../loading.gif';

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

    const [catalogTutorials, setAllTutorials] = useState([]);
    const [shownTutorials, setShownTutorials] = useState([]);
    
    
    const navigate = useNavigate();

    const handleTutorialClick = (tutorial) => {
        navigate(`/Volume/tutorials/${tutorial.id}`);
    };

        
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonClick = (buttonNumber) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Agrega un desplazamiento suave
        });
        setSelectedButton(buttonNumber);
    };

    const [numMod, setNumMod] = useState(8);
    
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
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(shownTutorials.length == 0){
            setIsLoading(true);
        }

        axios
        .get("http://localhost:8080/tutorials/getAll")
        .then((response) => {

            const filteredTutorials = response.data;
            setAllTutorials(filteredTutorials);
            if(shownTutorials.length == 0){
                setShownTutorials(filteredTutorials);
            }
        })
        .catch((error) => {
            console.error("Error fetching tutorials data:", error);
        })
        .finally(() => {
            setIsLoading(false); 
        });

        const lista = [];

        const long = Math.ceil(shownTutorials.length / numMod);;
        for (let i = 1; i <= long; i++) {
            lista.push(i);
        }
        setPagesButtons(lista);

    }, [shownTutorials, numMod]);

    return(
        <div className="w-[80%] animate-fade">
            <div onMouseLeave={closeDrawer}>
                <div id="catalogDrawer" className={`${handleDrawer()} w-full flex justify-center p-36 transition relative z-10 duration-300 -mt-72 mb-52 drop-shadow-dark`}>
                </div>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center mb-2">
                    <img className="w-32 h-32" src={loading} />
                </div>
            ) : (
            <div id="catalogItemsContainer" className={`${blurOnSearch()} -mt-32 transition duration-300 relative z-0`}>
                Número de tutorialos:
            <select className="mb-4 ml-2" value={numMod} onChange={setNumModMostrados}>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
            </select>

                <div id="catalogGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {shownTutorials.slice(numMod*(selectedButton-1), numMod*selectedButton).map((tutorial, index) => (
                        <Tutorial
                            key={tutorial.id}
                            onClick={() => handleTutorialClick(tutorial)}
                            tutorialName={tutorial.title}
                            tutorialImage={tutorial.mainPhoto}
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
            )}
        </div>
    )
}