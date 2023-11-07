import React, { useState, useEffect } from 'react';
import '../styles/Models.css'

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
        <div style={modelStyle} onClick={onClick} className='modelClass' onMouseEnter={handleModelInfoEnter} onMouseLeave={handleModelInfoLeave}>
            <div style={imgModelStyle}></div>
            <div style={infoModelStyle} className='infoModelClass'>
                <div style={infoModelTitleBar}> {modelName} </div>
                <div></div>
            </div>
        </div>
    );
};

export default Model;