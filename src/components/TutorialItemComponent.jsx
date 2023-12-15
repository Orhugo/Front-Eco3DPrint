import React, { useState } from 'react';
import '../styles/Models.css'; // Make sure to import your styles

const TutorialItemComponent = ({ onClick, tutorialName, tutorialImage }) => {
    const [infoDeployed, setInfoDeployed] = useState(false)
    const deployInfo = "-translate-y-full"
    const openInfo = ()=>{
        setInfoDeployed(true)
        handleInfo()
    }

    const closeInfo = ()=>{
        setInfoDeployed(false)
        handleInfo()
    }

    const handleInfo = ()=>{
        if(infoDeployed){
            return deployInfo
        }else{
            return ""
        }
    }
    return (
        <div className="w-60 mx-auto flex relative overflow-y-hidden cursor-pointer cursor-pointer" onMouseEnter={openInfo} onMouseLeave={closeInfo} onClick={onClick}>
            <div className="w-full h-[100%] rounded-t-[15px] bg-white">
                <img
                    src={tutorialImage}
                    alt="Tutorial Image"
                    className="w-full h-full object-cover rounded-t-[15px]"
                />
            </div>
            <div id="infoDrawer" className={`${handleInfo()} w-full bg-white px-4 py-2 absolute top-full transition duration-300`}>
                <p className="LoosFont">{tutorialName}</p>
            </div>
        </div>
    );
};

export default TutorialItemComponent;
