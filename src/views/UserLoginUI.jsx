import {useNavigate} from "react-router-dom";

export default function UserLoginUI(){
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/Volume/UserRegistration')
    }

    return(
        <div id="loginContainer" className="mt-12 w-[80%]">
            <div id="mainLabelContainer">
                <p className="LoosFont w-full text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                    Iniciar sesión
                </p>
            </div>
            <div id="inputFieldsContainer" className="flex flex-col justify-center w-fit mx-auto">
                <div className="mt-12 w-fit">
                    <div>
                        <p className="LoosFont text-xl">
                            Email
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <input className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="email@email.com"/>
                    </div>
                </div>
                <div className="mt-12 w-fit">
                    <div>
                        <p className="LoosFont text-xl">
                            Contraseña
                        </p>
                    </div>
                    <div>
                        <input className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="**********"/>
                    </div>
                </div>
                <div className="mt-8 flex justify-center max-w-md">
                    <button className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Entrar</button>
                </div>
                <div className="mt-8 flex justify-center max-w-md">
                    <p>
                        Aún no tienes una cuenta? <span className="hover:underline cursor-pointer" onClick={handleClick}>Regístrate</span>
                    </p>
                </div>
            </div>

        </div>
    )
}