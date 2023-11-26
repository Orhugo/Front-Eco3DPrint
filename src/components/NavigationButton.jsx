export default function NavigationButton({name}){
    return(
        <div className="cursor-pointer hover:text-cyan-800 hidden lg:block">
            {name}
        </div>
    )
}