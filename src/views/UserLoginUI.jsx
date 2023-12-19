import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function UserLoginUI(){
    const [isWarningHidden, setWarningHidden] = useState(true)
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [data, setData] = useState(null)
    const [loginError, setLoginError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0,0)
    }, []);

    const handleClick = ()=>{
        navigate('/volume/userregistration')
    }
    const updateEmailValue = (event)=>{
        setEmailValue(event.target.value)
    }
    const updatePasswordValue = (event)=>{
        setPasswordValue(event.target.value)
    }

    function checkFields(event) {
        if(emailValue.length < 1 || passwordValue.length < 1){
            setWarningHidden(false)
            warningVisibility()
        }else{
            console.log("Email: " + emailValue + " Password: " + passwordValue)
            setWarningHidden(true)
            warningVisibility()
            login(event)
        }
    }

    const warningVisibility = ()=>{
        if(isWarningHidden){
            return "hidden"
        }else{
            return "block animate-fade"
        }
    }

    const closeWarning = ()=>{
        setWarningHidden(true)
        warningVisibility()
    }

    const handleEnter = (event)=>{
        if(event.key === 'Enter'){
            console.log("enter")
            checkFields(event)
        }
    }

    async function login(event) {
        event.preventDefault();

        const data = {
            email: emailValue,
            password: passwordValue,
        };

        try {
            const response = await axios.post('http://localhost:8080/users/login', data);

            if (response.status === 200) {
                const { message, status, user } = response.data;

                if (status) {
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn', true);
                    navigate('/volume', {state: {user: user}});
                } else {
                    setLoginError('Mail or/and password incorrect. Try again');
                }
            } else {
                console.log('Login failed:', response.data);
                setLoginError('Mail or/and password incorrect');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('Mail or/and password incorrect');
        }
    }

    return(
        <div id="loginContainer" className="mt-12 w-[80%]" onKeyPress={handleEnter}>
            <div id="mainLabelContainer">
                <p className="LoosFont w-full text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                    Iniciar sesión
                </p>
            </div>
            <div id="inputFieldsContainer" className="flex flex-col justify-center w-fit mx-auto">
                <div className="w-fit mx-auto">
                    <div className="mt-12 w-fit">
                        <div>
                            <p className="LoosFont text-xl">
                                Email
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <input type="email" value={emailValue} onChange={updateEmailValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="email@email.com"/>
                        </div>
                    </div>
                    <div className="mt-12 w-fit">
                        <div>
                            <p className="LoosFont text-xl">
                                Contraseña
                            </p>
                        </div>
                        <div>
                            <input type="password" value={passwordValue} onChange={updatePasswordValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="**********"/>
                        </div>
                    </div>
                </div>
                <div id="warning" className={`${warningVisibility()} mt-6 transition animate-fade`}>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-[600px]" role="alert">
                        <strong className="font-bold">Ups! </strong>
                        <span className="block sm:inline">Por favor asegurate de rellenar todos los campos</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={closeWarning} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center max-w-md mx-auto">
                    <button onClick={checkFields} className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Entrar</button>
                </div>
                <div className="mt-8 flex flex-col justify-center max-w-md mx-auto gap-4">
                    <p className="text-center">
                        Aún no tienes una cuenta? <span className="hover:underline cursor-pointer"
                                                        onClick={handleClick}>Regístrate</span>
                    </p>
                    <p className="text-center">
                        Has olvidado tu contraseña? <span className="hover:underline cursor-pointer"
                                                        onClick={handleClick}>Recuperar</span>
                    </p>
                </div>
            </div>

        </div>
    )
}