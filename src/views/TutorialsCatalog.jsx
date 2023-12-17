import React, { useEffect, useState } from "react";
import axios from "axios";
import Tutorial from "../components/Tutorial.jsx";
import { useNavigate } from "react-router-dom";

export default function TutorialsCatalog() {
    const [shownTutorials, setShownTutorials] = useState([]);
    const [numMod, setNumMod] = useState(8);
    const [selectedButton, setSelectedButton] = useState(1);
    const [pagesButtons, setPagesButtons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const handleTutorialClick = (tutorial) => {
        navigate(`/volume/tutorials/${tutorial.id}`);
    };

    const handleButtonClick = (buttonNumber) => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
        setSelectedButton(buttonNumber);
    };

    const setNumModMostrados = (event) => {
        setNumMod(event.target.value);
        handleButtonClick(1);
    };

    const getButtonStyle = (buttonNumber) => {
        return {
        backgroundColor: selectedButton === buttonNumber ? "#4D82DF" : "white",
        };
    };

    useEffect(() => {
        if (shownTutorials.length === 0) {
        setIsLoading(true);
        }

        axios
        .get("http://localhost:8080/tutorials/getAll")
        .then((response) => {
            const filteredTutorials = response.data;
            setShownTutorials(filteredTutorials);
        })
        .catch((error) => {
            console.error("Error fetching tutorials data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });

        const lista = [];

        const long = Math.ceil(shownTutorials.length / numMod);
        for (let i = 1; i <= long; i++) {
        lista.push(i);
        }
        setPagesButtons(lista);
    }, [shownTutorials, numMod]);

    return (
        <div className="overflow-y-hidden mt-12">
        {isLoading ? (
            <div className="flex items-center justify-center mb-2">
            <img className="w-32 h-32" src="../loading.gif" alt="Loading" />
            </div>
        ) : (
            <div id="catalogItemsContainer">
            Número de tutoriales:
            <select
                className="mb-4 ml-2"
                value={numMod}
                onChange={setNumModMostrados}
            >
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
            </select>

            <div id="catalogGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {shownTutorials.slice(numMod * (selectedButton - 1), numMod * selectedButton).map((tutorial) => (
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
                <button
                    className="w-8 h-8 mx-2 rounded-full border border-black"
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
    );
}
