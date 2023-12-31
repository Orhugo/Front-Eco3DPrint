import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Models from "../components/Models";
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function showCatalog() {
  const [catalogModels, setAllModels] = useState([]);
  const [categoryModels, setCategoryModels] = useState([]);

  const [urlList, setUrls] = useState([]);

  const [showLoaderPrompt, setLoaderPrompt] = useState(true);

  const { state } = useLocation();
  const nameSearch = state;
  const [modelUrlFinded, setModelUrlFinded] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/models/getAll")
      .then((response) => {
        if (nameSearch == null) {
          const filteredModels = response.data;
          setAllModels(filteredModels);
          setCategoryModels(filteredModels);
        } else {
          const filteredModels = response.data.filter((model) =>
            model.title.toLowerCase().includes(nameSearch.toLowerCase())
          );
          setAllModels(filteredModels);
          setCategoryModels(filteredModels);
        }
      })
      .catch((error) => {
        console.error("Error fetching models data:", error);
      });
    const timer = setTimeout(() => {
      setLoaderPrompt(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [nameSearch]);

  const navigate = useNavigate();

  const handleModelClick = (model) => {
    console.log("Url: ", model.mainUrl);
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
          mainUrl: model.mainUrl,
          modelName: model.title,
        },
      });
    }
  };

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    if (selectedCategory == "Todo") {
      setCategoryModels(catalogModels);
    } else {
      setCategoryModels(catalogModels);
      const categoryModels = catalogModels.filter(
        (model) => model.category == selectedCategory
      );
      setCategoryModels(categoryModels);
    }
  };

  const boxStyle = {
    marginTop: "75px",
    width: "150px",
    marginBottom: "20px",
  };

  const pickerStyle = {
    backgroundColor: "white",
    border: "1px solid black",
  };

  return (
    <div className="w-[60%] h-screen inline-block justify-start">
      {showLoaderPrompt ? (
        <div className="w-full h-full flex items-center text-center justify-center">
          <div className="w-[200px] h-fit flex items-center justify-center">
            <CircularProgress variant="plain" />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Box style={boxStyle}>
              <FormControl fullWidth>
                <InputLabel id="select-id">Categoria</InputLabel>
                <Select
                  labelId="select-id"
                  id="select-id"
                  value={category}
                  label="Categoria"
                  onChange={handleChange}
                  style={pickerStyle}
                >
                  <MenuItem value={"Todo"}>Todo</MenuItem>
                  <MenuItem value={"Herramientas"}>Herramientas</MenuItem>
                  <MenuItem value={"Complementos"}>Complementos</MenuItem>
                  <MenuItem value={"Juguetes"}>Juguetes</MenuItem>
                  <MenuItem value={"Figuras"}>Figuras</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="w-full h-fit mt-[6%] flex flex-wrap box-border animate-fade">
            {categoryModels.map((model, index) => (
              <Models
                key={model.id}
                onClick={() => handleModelClick(model)}
                modelName={model.title}
                modelImage={model.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default showCatalog;
