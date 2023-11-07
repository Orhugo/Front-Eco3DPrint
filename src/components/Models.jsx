import React, { useState, useEffect } from 'react';
import './Models.css'

const Model = ({ onClick, modelName }) => {
    const [hovered, setHovered] = useState(false);

    const modelStyle = {
        width: '300px',
        height: '300px',

        margin: '10px',
        borderRadius: '15px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.7)',
        transition: 'transform 0.3s'
    }

    const imgModelStyle = {
        width: parent,
        height: '70%',
        borderRadius: '15px 15px 0px 0px',
        backgroundColor: 'rgba(255,255,255,1)'
    }

    const infoModelStyle={
        width: parent,
        height: '30%',
        borderRadius: '0px 0px 15px 15px',
        backgroundColor: hovered ? 'rgba(230,230,230,1)':'rgba(200,200,200,1)',
        transition: 'background-color 0.3s',

    }

    const infoModelTitleBar ={
        width: parent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 10px 0px 10px'
    }

    const handleModelInfoEnter = ()=> {
        setHovered(true)
    }
    const handleModelInfoLeave = ()=> {
        setHovered(false)
    }

    return (
        <div className="w-[18%] m-[1%] aspect-square hover:cursor-pointer transition hover:scale-[1.03] duration-300" onClick={onClick} onMouseEnter={handleModelInfoEnter} onMouseLeave={handleModelInfoLeave}>
            <div className="w-full h-[70%] rounded-t-[15px] bg-white"></div>
            <div className="w-full h-[30%] rounded-b-[15px] bg-gray-400">
                <div className="w-full flex px-[10px] pt-[10px]"> {modelName} </div>
                <div></div>
            </div>
        </div>
    );
};

export default Model;