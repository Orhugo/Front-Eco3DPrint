export default function CommentItem({name}){
    const rotationNumber = Math.floor(Math.random() * 2);
    const bgNumber = Math.floor(Math.random() * 3);
    const bgBlue = 'bg-azulVolume'
    const bgGreen = 'bg-greenFooter'
    const bgPink = 'bg-pinkVolume'
    const rotation = 'rotate-6'
    const rotationNeg = '-rotate-6'
    const choosenBg = () =>{
        if(bgNumber == 1){
            return bgBlue;
        }else if(bgNumber == 2){
            return bgGreen;
        }else{
            return bgPink;
        }
    }

    const choosenRotation = ()=>{
        if(rotationNumber == 0){
            return rotation;
        }else{
            return rotationNeg;
        }
    }


    return(
        <div className="bg-marronPocho w-96 h-52 rounded-2xl">
            <div className={`${choosenBg()} w-full h-full p-6 rounded-2xl transform ${choosenRotation()}`}>
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                    <div className="text-2xl">{name}</div>
                </div>
                <div className="text-sm mt-2">
                    Si tu archivo del modelo no está en formato STL. Es tan sencillo commo ir al menú del software que está utilizando y clique en “Guardar Como...” o “Exportar” y elegir STL.
                </div>
            </div>
        </div>

    )
}