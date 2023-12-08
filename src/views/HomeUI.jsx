import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function HomeUI(){
    const navigate = useNavigate()
    useEffect(() => {
        window.scroll(0,0)
    }, []);

    const navigateTutorials = ()=>{
        navigate('/volume/tutorials')
    }

    const navigateCatalog = ()=>{
        navigate('/volume/catalogo')
    }

    const navigateUpload = ()=>{
        navigate('/volume/subirarchivo')
    }

    return(
        <div id="mainHomeUIContainer" className="md:w-[80%] w-full mt-14 font-loos">
            <div id="landingContainer" className="max-w-[1340px] md:p-0 p-6 mx-auto animate-fade animate-delay-200">
                <img src="../../public/VolumeLanding.svg" draggable={false}/>
                <p className="w-full text-center lg:text-5xl text-3xl mt-3.5">Dale vida a tus objetos</p>
            </div>
            <div id="secondSectionContainer" className="w-full relative mt-72 sm:mt-52 2xl:mt-72 px-6 md:px-0">
                <img className="absolute max-h-[400px] top-52 blur-sm w-auto hidden 2xl:block" src="../../public/LeftJarron.png" alt="Jarron Izq"/>
                <img className="absolute max-h-[400px] top-52 blur-sm end-0 w-auto hidden 2xl:block" src="../../public/RightJarron.png" alt="Jarron Der"/>
                <div id="modelOfTheDayContainer" className="flex items-start justify-center">
                    <div className="w-fit sm:flex 2xl:grid grid-cols-3">
                        <img className="w-full mx-auto sm:mx-0 xl:w-fit max-w-[300px] xl:max-w-[400px] h-auto object-contain col-start-2 hover:drop-shadow-2xl transition duration-300" src="../../public/3DModelPreview.png" alt="3D Model Preview"/>
                        <div className="w-fit p-8 col-start-3 mx-auto sm:mx-0">
                            <div className="flex gap-4 items-center">
                                <div className="bg-neutral-400 rounded-full w-12 h-12"></div>
                                <p className="text-2xl">
                                    orhugo
                                </p>
                            </div>
                            <p className="text-5xl md:text-6xl lg:text-8xl max-w-sm LoosFont font-[900] hover:text-azulVolume cursor-pointer transition duration-300">
                                Diseño Jarrones
                            </p>
                            <div className="flex gap-4 mt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <p>
                                    4,6/5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="thirdSectionContainer" className="w-full mt-72">
                <div id="aprendeDesdeCeroDiv" className="relative bg-marronPocho px-6 pt-2 pb-8 mx-3 lg:hover:scale-105 transition duration-300 cursor-pointer font-loos text-3xl xl:z-10 xl:hover:z-50" onClick={navigateTutorials}>
                    <p className="LoosFont font-[550]">
                        Aprende desde cero
                    </p>
                </div>
                <div id="buscaDiseñoDiv" className="relative bg-greenFooter p-6 pb-8 -mt-7 md:-mt-5 mx-3 lg:hover:scale-105 transition duration-300 cursor-pointer font-loos text-3xl xl:z-10 xl:hover:z-50" onClick={navigateCatalog}>
                    <p className="LoosFont font-[550]">
                        Busca el diseño hecho para ti
                    </p>
                </div>
                <div id="hazRealidadDiv" className="relative bg-azulVolume p-6 pt-10 pb-12 -mt-10 md:-mt-7 lg:hover:scale-105 transition duration-300 cursor-pointer font-loos text-3xl xl:z-10 xl:hover:z-50" onClick={navigateUpload}>
                    <p className="LoosFont font-[550]">
                        Haz realidad tu creacion
                    </p>
                    <div className="flex justify-end mt-16">
                        <div>
                            <img className="w-full max-w-[578px]" src="../../public/Solicita%20una.svg" alt="Solicita una" draggable={false}/>
                            <img className="w-full max-w-[578px] mt-6 lg:ml-20 ml-0" src="../../public/impresión%203D.svg" alt="Impresion 3D" draggable={false}/>
                            <p className="text-2xl lg:ml-20 ml-0 mt-6">
                                ¡Piénsalo y créalo!
                            </p>
                            <p className="text-base lg:ml-20 ml-0 flex max-w-[500px] mt-6">
                                Volume tiene habilitado un servicio de impresión y envío. Descarga o compra el modelo hecho para ti y te lo enviamos a casa.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}