import React from "react";
import CatalogItem from "../components/CatalogItem.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserCatalog({ username }) {
  const [catalogModels, setAllModels] = useState([]);
  const [shownModels, setShownModels] = useState([]);
  const [numMod, setNumMod] = useState(10);
  const [pagesButtons, setPagesButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);

  const setNumModMostrados = (event) => {
    setNumMod(event.target.value);
    handleButtonClick(1);
  };

  const handleButtonClick = (buttonNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Agrega un desplazamiento suave
    });
    setSelectedButton(buttonNumber);
  };

  const getButtonStyle = (buttonNumber) => {
    return {
      backgroundColor: selectedButton === buttonNumber ? "#4D82DF" : "white",
    };
  };

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/models/getAuthorModels", {
        params: {
          author: username,
        },
      })
      .then((response) => {
        const filteredModels = response.data;
        setAllModels(filteredModels);
        if (shownModels.length == 0) {
          setShownModels(filteredModels);
        }
      })
      .catch((error) => {
        console.error("Error fetching models data:", error);
      });

    const lista = [];

    const long = Math.ceil(shownModels.length / numMod);
    for (let i = 1; i <= long; i++) {
      lista.push(i);
    }
    setPagesButtons(lista);
  }, [shownModels, numMod]);

  return (
    <div
      id="catalogItemsContainer"
      className={"-mt-32 transition duration-300 relative z-0"}
    >
      Número de modelos:
      <select
        className="mb-4 ml-2"
        value={numMod}
        onChange={setNumModMostrados}
      >
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>
      <div
        id="catalogGrid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {shownModels
          .slice(numMod * (selectedButton - 1), numMod * selectedButton)
          .map((model, index) => (
            <CatalogItem
              key={model.id}
              onClick={() => handleModelClick(model)}
              modelName={model.title}
              modelImage={model.imageUrl}
              modelAuthor={model.author}
            />
          ))}
      </div>
      <div className="mt-8 mb-8 flex items-center justify-center">
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
  );
}

export default UserCatalog;
