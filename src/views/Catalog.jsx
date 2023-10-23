import { useState } from "react";
import React from "react";
import { useLocation } from 'react-router-dom';
import Models from "../components/Models";

export function showCatalog() {
//   const { state } = useLocation();
//   const url = state ? state + ".stl" : "thinker.stl";
  const [models, setModels] = useState([]);

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
    for (let i = 0; i < 29; i++) {
        catalogModels.push(<Models key={i} style={{color:'blue'}} />);
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

  return (
    <div>
        <div style={containerStyle}>
            {catalogModels.map((model) => (
             <Models key={model.id} style={modelStyle} />
        ))}
        </div>
     </div>
  );
}

export default showCatalog;