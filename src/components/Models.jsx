import React, { useState, useEffect } from 'react';

const Model = ({ onClick, modelName }) => {

    const modelStyle = {
        width: '300px', 
        height: '300px', 
        backgroundColor: "blue", 
        margin: '10px' };

  return (
    <div style={modelStyle} onClick={onClick} >
       <p>{modelName}</p>
    </div>
  );
};

export default Model;