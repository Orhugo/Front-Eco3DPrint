import React, { useState, useEffect } from 'react';

const Model = ({ onClick }) => {
    const colors = ['red', 'blue', 'green', "orange", "black", "gray"]; // Define los colores que deseas utilizar.
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

    const modelStyle = {
        width: '300px', 
        height: '300px', 
        backgroundColor: backgroundColor, 
        margin: '10px' };

  return (
    <div style={modelStyle} onClick={onClick} >
    </div>
  );
};

export default Model;