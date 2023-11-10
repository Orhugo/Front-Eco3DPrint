import React, {useState} from 'react';
import './Models.css'
import {StlViewer} from "react-stl-viewer";

const Model = ({onClick, modelName, modelUrl}) => {
    const [hovered, setHovered] = useState(false);

    const handleModelInfoEnter = () => {
        setHovered(true)
    }
    const handleModelInfoLeave = () => {
        setHovered(false)
    }
    return (

        <div className="w-[18%] m-[1%] aspect-square hover:cursor-pointer transition hover:scale-[1.03] duration-300"
             onClick={onClick} onMouseEnter={handleModelInfoEnter} onMouseLeave={handleModelInfoLeave}>
            <div className="w-full h-[70%] rounded-t-[15px] bg-white">
                <StlViewer
                    orbitControls={false}
                    url={modelUrl}
                    modelProps={{
                        color: "#0a6bc1",
                        scale: 1.5
                    }}
                />
            </div>
            <div className="w-full h-[30%] rounded-b-[15px] bg-gray-400">
                <div className="w-full flex px-[10px] pt-[10px]"> {modelName} </div>
                <div></div>
            </div>
        </div>
    );
};

export default Model;