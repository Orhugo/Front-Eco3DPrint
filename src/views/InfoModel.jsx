import React, { useEffect, useState } from "react";
import '../styles/InfoModel.css';

function InfoModel() {
  const [modelData, setModelData] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [printSettingsId, setPrintSettingsId] = useState(null);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/models/getModel?id=${id}`);
        const jsonData = await response.json();
        setModelData(jsonData);
        setAuthorId(jsonData.author_id);
        setPrintSettingsId(jsonData.print_settings_id);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]); 

  return (
    <div className="center">
      {error && <p>Error: {error}</p>}
      {modelData && (
        <div>
          <h1 className="title">{modelData.title}</h1>
          <table className="table">
            <tbody>
              <tr>
                <td><b>Categoría:</b></td>
                <td>{modelData.cathegory}</td>
              </tr>
              <tr>
                <td><b>Descripción:</b></td>
                <td>{modelData.description}</td>
              </tr>
              <tr>
                <td><b>Tags:</b></td>
                <td>{modelData.tags}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InfoModel;
