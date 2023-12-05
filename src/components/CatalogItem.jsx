import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CatalogItem({onClick, modelName, modelImage, modelAuthor}){
    const [infoDeployed, setInfoDeployed] = useState(false)
    const deployInfo = "-translate-y-16"
    const navigate = useNavigate()
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

    modelImage = modelImage ?? "./default_image.png";
    modelAuthor = modelAuthor ?? "nullUser";

    return(
        <div className="w-full max-w-[330px] mx-auto h-96  flex flex-shrink flex-col relative overflow-y-hidden cursor-pointer  border border-gray-800" onMouseEnter={openInfo} onMouseLeave={closeInfo} onClick={onClick}>
            <div id="imageContainer" className="w-full h-full  flex items-center justify-center">

            <img src={modelImage} alt="Error" className="w-full h-full object-cover" />

            </div>
            <div id="infoDrawer" className={`${handleInfo()} w-full bg-white px-4 py-2 absolute -bottom-16 transition duration-300`}>
                <p className="LoosFont">{modelName}</p>
                <div id="autorInfo" className="flex gap-2 items-center">
                    <div id="autorImg" className="w-6 h-6 rounded-full bg-slate-400">

                    </div>
                    <p className="LoosFont">{modelAuthor.username}</p>
                </div>
            </div>
        </div>
    )
}