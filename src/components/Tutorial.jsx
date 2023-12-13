import React, {useState} from 'react';
import '../styles/Models.css'


const Tutorial = ({onClick, tutorialName, tutorialImage}) => {
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

    return(
        <div className="w-full mx-auto h-96  flex flex-shrink flex-col relative overflow-y-hidden cursor-pointer  border border-gray-400" onMouseEnter={openInfo} onMouseLeave={closeInfo} onClick={onClick}>
            <div id="imageContainer" className="w-full h-full  flex items-center justify-center">

            <img src={tutorialImage} className="w-full h-full object-cover" />

            </div>
            <div id="infoDrawer" className={`${handleInfo()} w-full bg-white px-4 py-2 absolute top-full transition duration-300`}>
                <p className="LoosFont">{tutorialName}</p>
            </div>
        </div>
    )
};

export default Tutorial;