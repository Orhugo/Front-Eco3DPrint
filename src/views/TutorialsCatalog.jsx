import React, { useState, useEffect } from "react";
import axios from "axios";
import TutorialHandler from "./TutorialHandler";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Tutorials() {
    const [tutorials, setTutorials] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/tutorials/getAll")
        .then(response => {
            setTutorials(response.data);
        })
        .catch(error => {
            console.error("Error fetching tutorials:", error);
        });
    }, []);

    return (
        <div>
        <h1>All Tutorials</h1>
        <ul>
            {tutorials.map((tutorial) => (
                <li key={tutorial.id}>
                <button onClick={() => navigate(`/Front-Eco3DPrint/tutorials/${tutorial.id}`)}> 
                    {tutorial.title}
                </button>
                </li>
            ))}
        </ul>
        </div>
    );
    }

export default Tutorials;
