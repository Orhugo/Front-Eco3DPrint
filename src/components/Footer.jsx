import { useNavigate } from "react-router-dom";

export default function Footer(){
    const navigate = useNavigate()
    const navigateCatalog = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Agrega un desplazamiento suave
        });
        navigate('/volume/catalogo')
    }

    const navigateTutorials = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Agrega un desplazamiento suave
        });
        navigate('/volume/tutorials')
    }

    const mailToTech = ()=>{
        const direccion = "volumetecnico@gmail.com"
        const asunto = "Asistencia técnica"
        const enlaceMailto = "mailto:" + direccion + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent("");
        window.location.href = enlaceMailto;
    }

    const mailToJobs = ()=>{
        const direccion = "volumetecnico@gmail.com"
        const asunto = "Empleo"
        const enlaceMailto = "mailto:" + direccion + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent("");
        window.location.href = enlaceMailto;
    }

    const navigate = useNavigate();

    return(
        <div id="footerClipContainer" className="bg-greenFooter pt-32 px-12 pb-12">
            <div className="grid grid-cols-2 gap-14 lg:flex justify-between md:px-20 mt-40">
                <div className="order-2 lg:order-1">
                    <p className="hover:underline cursor-pointer w-fit text-md md:text-xl" onClick={() => navigate("/volume/catalogo")}>
                        Catálogo
                    </p>
                    <p className="hover:underline cursor-pointer mt-2 w-fit text-md md:text-xl" onClick={() => navigate("/volume/tutorials")}>
                        Tutoriales
                    </p>
                    <p className="hover:underline cursor-pointer mt-2 w-fit text-md md:text-xl hidden">
                        Foro
                    </p>
                </div>
                <div className="order-1 lg:order-2">
                    <p className="text-xl md:text-2xl">
                        Servicio Técnico
                    </p>
                    <p className="max-w-[240px] mt-2 text-sm text-slate-600">
                        Ponle fin a los problemas tecnicos sobre tu impresora 3D
                    </p>
                    <p onClick={mailToTech} className="hover:underline cursor-pointer mt-2 w-fit text-sm md:text-base">
                        volumetecnico@gmail.com
                    </p>
                </div>
                <div className="order-4 lg:order-3">
                    <p className="text-xl md:text-2xl max-w-[270px]">
                        Siguenos en nuestras redes sociales
                    </p>
                    <p className="mt-2 hover:underline cursor-pointer w-fit">
                        Instagram
                    </p>
                    <p className="mt-2 hover:underline cursor-pointer w-fit">
                        Twitter
                    </p>
                    <p className="mt-2 hover:underline cursor-pointer w-fit">
                        Tik Tok
                    </p>
                </div>
                <div className="order-3 lg:order-4">
                    <p className="text-xl md:text-2xl">
                        Trabaja con nosotros
                    </p>
                    <p className="mt-2">
                        Contacto de información
                    </p>
                    <p className="hover:underline cursor-pointer mt-2 w-fit">
                        900 676 283
                    </p>
                    <p onClick={mailToJobs} className="hover:underline cursor-pointer mt-2 w-fit text-sm md:text-base">
                        volume@gmail.com
                    </p>
                </div>
            </div>
            <div className="sm:flex items-end gap-10 mt-24">
                <img className="max-w-[747px] w-full object-contain" src="../../VolumeLogoXL.svg" alt="Volume logo"/>
                <div className="flex md:flex-row flex-col  w-full justify-between">
                    <p className="cursor-pointer hover:underline hidden sm:block" onClick={() => navigate("/volume")}>
                        Back to menu
                    </p>
                    <p className="text-xs mt-4 sm:mt-0">
                        Copyright © Volume 2023
                    </p>
                </div>
            </div>

        </div>
    )
}