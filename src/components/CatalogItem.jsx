import {useState} from "react";

export default function CatalogItem(){
    const [infoDeployed, setInfoDeployed] = useState(false)
    const deployInfo = "-translate-y-16"
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
        <div className="w-full max-w-xs mx-auto h-72 bg-slate-400 flex flex-shrink flex-col relative overflow-y-hidden cursor-pointer" onMouseEnter={openInfo} onMouseLeave={closeInfo}>
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