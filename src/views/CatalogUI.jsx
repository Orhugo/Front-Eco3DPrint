import SearchBar from "../components/SearchBar.jsx";
import {useEffect, useState} from "react";

export default function CatalogUI(){
    useEffect(() => {
        window.scroll(0,0)
    }, []);

    return(
        <div className="w-[80%] animate-fade">
            <SearchBar/>
        </div>
    )
}