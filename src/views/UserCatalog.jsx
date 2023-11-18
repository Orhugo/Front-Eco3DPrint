import React, { useEffect, useState } from "react";
import axios from "axios";
import Models from "../components/Models";
import { useNavigate } from "react-router-dom";

function UserCatalog({ username }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    console.log("username: ", username);
    axios
      .get("http://localhost:8080/models/getAuthorModels", {
        params: {
          author: username,
        },
      })
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching models data:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleModelClick = (model) => {
    console.log("Url: ", model);
    if(model.mainUrl == null){
        navigate("/Volume/visualizarSTL", {
            state: "thinker.stl"
        });
    }else if(model.mainUrl.length < 1){
        navigate("/Volume/visualizarSTL", {
            state: "thinker.stl"
        });
    }else{
        navigate("/Volume/visualizarSTL", {
            state: {
              mainUrl: model.mainUrl,
              modelName: model.title
            }
        });
    }
}

  return (
    <>
      <div>
        <div className="w-full h-fit mt-[6%] flex flex-wrap box-border animate-fade">
          {models.map((model, index) => (
            <Models
              key={model.id}
              onClick={() => handleModelClick(model)}
              modelName={model.title}
              modelUrl={model.mainUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserCatalog;
