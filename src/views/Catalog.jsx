import { useState } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import Models from "../components/Models";
import { useNavigate } from 'react-router-dom';

export function showCatalog() {
//   const { state } = useLocation();
//   const url = state ? state + ".stl" : "thinker.stl";
  //const [catalogModels, setModels] = useState([]);

// useEffect(() => {
//     axios.get('/models/getAll')
//       .then((response) => {
//         setModels(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

    const catalogModels = [];
    for (let i = 0; i < 3; i++) {
        catalogModels.push(<Models key={i} />);
    }

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', // Alinea los elementos en la última fila hacia la izquierda
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
             <Models key={model.id} style={modelStyle} onClick={() => handleModelClick(index)} />
        ))}
        </div>
     </div>
  );
}

export default showCatalog;