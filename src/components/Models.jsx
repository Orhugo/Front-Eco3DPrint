import React, {useState} from 'react';
import '../styles/Models.css'

const Model = ({onClick, modelName, modelImage}) => {
    
    return (

        <div className="w-[18%] m-[1%] aspect-square hover:cursor-pointer transition hover:scale-[1.03] duration-300" onClick={onClick}>
            <div className="w-full h-[70%] rounded-t-[15px] bg-white">
               
                <img src={modelImage} alt="Imagen Thinker" className="w-full h-full object-cover rounded-t-[15px]" />
            </div>
            <div className="w-full h-[30%] rounded-b-[15px] bg-gray-400">
                <div className="w-full flex px-[10px] pt-[10px]"> {modelName} </div>
                <div></div>
            </div>
        </div>
    );
};

export default Model;