export default function NotificationItem({text}){
    const bgNumber = Math.floor(Math.random() * 3);
    const bgBlue = 'bg-azulVolume'
    const bgGreen = 'bg-greenFooter'
    const bgPink = 'bg-pinkVolume'

    const choosenBg = () =>{
        if(bgNumber == 1){
            return bgBlue;
        }else if(bgNumber == 2){
            return bgGreen;
        }else{
            return bgPink;
        }
    }

    return(
        <div className={`${choosenBg()} px-4 py-2 rounded-xl max-w-xl mt-2 hover:drop-shadow-lg transition duration-300`}>
            <div className="flex justify-between">
                <p className="text-slate-600 text-sm">Figura Marvel</p>
                <p className="text-slate-600 text-sm">21 Nov</p>
            </div>
            <div className="">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}