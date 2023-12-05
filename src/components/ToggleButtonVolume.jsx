import {useState} from "react";

export default function ToggleButtonVolume({label, onToggle}){
    
    const toggleFalse = "text-black "
    const toggleTrue = "text-white bg-black"

    const [isToggled, setToggled] = useState(false)
    const handleClick = ()=>{
        setToggled(!isToggled)

        onToggle(!isToggled, label);
    }

    const toggle = ()=>{
        if(isToggled){
            return toggleTrue;
        }else{
            return toggleFalse;
        }
    }

    return(
        <div className="flex justify-start">
            <button className={`${toggle()} transition duration-300 px-8 py-2 w-52 border-[1px] border-black rounded-full text-md`} onClick={handleClick}>{label}</button>
        </div>
    )
}
