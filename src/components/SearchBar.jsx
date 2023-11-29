import ToggleButtonVolume from "./ToggleButtonVolume.jsx";
import {useState} from "react";
import CatalogItem from "./CatalogItem.jsx";

export default function SearchBar(){
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const drawerOpen = "translate-y-72"
    const blurCatalog = "blur-sm"
    const openDrawer = ()=>{
        setDrawerIsOpen(true)
        handleDrawer()
    }

    const closeDrawer = ()=>{
        setDrawerIsOpen(false)
        handleDrawer()
    }

    const handleDrawer = ()=>{
        blurOnSearch()
        if(drawerIsOpen){
            return drawerOpen
        }
    }

    const blurOnSearch = ()=>{
        if(drawerIsOpen){
            return blurCatalog
        }
    }

    return(
        <div className="overflow-y-hidden mt-12">
            <div onMouseLeave={closeDrawer}>
                <div className="flex items-center gap-8 bg-pinkVolume p-4 relative z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <div className="w-full">
                        <input placeholder="Buscar en Volume" onClick={openDrawer}  className="w-full bg-transparent text-2xl placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-transparent"/>
                    </div>
                </div>
                <div id="catalogDrawer" className={`${handleDrawer()} w-full bg-pinkVolume flex justify-center p-8 transition relative z-10 duration-300 -mt-72 mb-52 drop-shadow-dark`}>
                    <div className="grid grid-cols-3 p-4 gap-10 w-[70%] pb-16">
                        <div>
                            <ToggleButtonVolume label={"Todo"}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Herramientas"}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Complementos"}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Juguetes"}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Figuras"}/>
                        </div>
                        <div>
                            <ToggleButtonVolume label={"Mecanismos"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="catalogItemsContainer" className={`${blurOnSearch()} -mt-44 transition duration-300 relative z-0`}>
                <div id="catalogGrid" className="grid grid-cols-4 gap-4 px-8 justify-between">
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                </div>
            </div>
        </div>
    )
}