import VolumeLogoSm from "./VolumeLogoSm.jsx";
import NavigationButton from "./NavigationButton.jsx";

export default function VolumeNavBar(){
    return(
        <div id="navigationBar" className="w-[60%] min-w-[216px] lg:w-[935px] sticky top-0 px-8 py-2 flex border-[1px] border-black rounded-full items-center justify-between animate-fade-down animate-delay-200">
            <div>
                <div id="logoContainer" className="flex items-center gap-12">
                    <VolumeLogoSm/>
                    <svg id="menuLgIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden sm:block lg:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <NavigationButton name="Catalogo"/>
                    <NavigationButton name="3D Of the day"/>
                    <NavigationButton name="Tutoriales"/>
                    <NavigationButton name="Foro"/>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:text-cyan-600 cursor-pointer hidden sm:block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <div id="profileImgContainer" className="w-10 h-10 rounded-full bg-slate-800 hidden sm:block cursor-pointer hover:drop-shadow-slim transition duration-300">

                </div>
                <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 sm:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    )
}