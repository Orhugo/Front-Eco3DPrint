import {useNavigate} from "react-router-dom";
import React from 'react'

export default function NavigationButton({name, urlNavigate}){
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(urlNavigate)
    }

    return(
        <div className="cursor-pointer hover:text-cyan-800 hidden lg:block" onClick={handleClick}>
            {name}
        </div>
    )
}