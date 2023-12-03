import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CatalogItem(){
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

    const navigateModel = ()=>{
        navigate('/Volume/visualizarSTL')
    }

    return(
        <div className="w-full max-w-[330px] mx-auto h-96 bg-slate-400 flex flex-shrink flex-col relative overflow-y-hidden cursor-pointer" onMouseEnter={openInfo} onMouseLeave={closeInfo} onClick={navigateModel}>
            <div id="imageContainer" className="w-full h-full bg-azulVolume">

            </div>
            <div id="infoDrawer" className={`${handleInfo()} w-full bg-white px-4 py-2 absolute -bottom-16 transition duration-300`}>
                <p className="LoosFont">Titulo</p>
                <div id="autorInfo" className="flex gap-2 items-center">
                    <div id="autorImg" className="w-6 h-6 rounded-full bg-slate-400">

                    </div>
                    <p className="LoosFont">Autor</p>
                </div>
            </div>
        </div>
    )
}