import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";

export default function UserRegistrationUI(){
    const [isWarningHidden, setWarningHidden] = useState(true)
    //References
    const [nameValue, setNameValue] = useState("")
    const [lastnameValue, setLastnameValue] = useState("")
    const [usernameValue, setUsernameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmpasswordValue, setConfirmPasswordValue] = useState("")
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate('/volume/userLogin')
    }
    //ChangeHandlers
    const updateNameValue = (event)=>{
        setNameValue(event.target.value)
    }
    const updateLastnameValue = (event)=>{
        setLastnameValue(event.target.value)
    }
    const updateUsernameValue = (event)=>{
        setUsernameValue(event.target.value)
    }
    const updateEmailValue = (event)=>{
        setEmailValue(event.target.value)
    }
    const updatePasswordValue = (event)=>{
        setPasswordValue(event.target.value)
    }
    const updateConfirmPasswordValue = (event)=>{
        setConfirmPasswordValue(event.target.value)
    }


    function checkFields(event) {
        if(nameValue.length < 1 || lastnameValue.length < 1 || usernameValue.length < 1 || emailValue.length < 1 || passwordValue.length < 1 || confirmpasswordValue.length < 1){
            setWarningHidden(false)
            warningVisibility()
        }else{
            setWarningHidden(true)
            warningVisibility()
            save(event)
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

    async function save(event) {
        event.preventDefault();
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert("Please enter a valid email address");
            return;
        }

        // Check password length
        if (passwordValue.length < 7) {
            alert("Password must be at least 7 characters long");
            return;
        }

        const data = {
            username: usernameValue,
            name: nameValue,
            lastname: lastnameValue,
            email: emailValue,
            password: passwordValue
        };

        try {
            const response = await axios.post('http://localhost:8080/users/add', data);
            if (response.status === 200) {
                alert("Registration successful");
                navigate('/volume/userlogin');
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed");
        }
    }

    return(
        <div id="loginContainer" className="mt-12 w-[80%]">
            <div id="mainLabelContainer">
                <p className="LoosFont w-full text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
                    Crea una cuenta
                </p>
            </div>
            <div id="inputFieldsContainer" className="flex flex-col justify-center w-fit mx-auto">
                <div className="mt-12 w-fit flex gap-4">
                    <div>
                        <p className="LoosFont text-xl">
                            Nombre
                        </p>
                        <div className="flex justify-center">
                            <input type="text" value={nameValue} onChange={updateNameValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="Nombre"/>
                        </div>
                    </div>
                    <div>
                        <p className="LoosFont text-xl">
                            Apellidos
                        </p>
                        <div className="flex justify-center">
                            <input type="text" value={lastnameValue} onChange={updateLastnameValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="Apellidos"/>
                        </div>
                    </div>
                </div>
                <div className="mt-12 w-fit flex gap-4">
                    <div>
                        <p className="LoosFont text-xl">
                            Nombre de usuario
                        </p>
                        <div className="flex justify-center">
                            <input type="text" value={usernameValue} onChange={updateUsernameValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="Nombre de usuario"/>
                        </div>
                    </div>
                    <div>
                        <p className="LoosFont text-xl">
                            Email
                        </p>
                        <div className="flex justify-center">
                            <input type="email" value={emailValue} onChange={updateEmailValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="email@email.com"/>
                        </div>
                    </div>
                </div>
                <div className="mt-12 w-fit flex gap-4">
                    <div>
                        <p className="LoosFont text-xl">
                            Contraseña
                        </p>
                        <div className="flex justify-center">
                            <input type="password" value={passwordValue} onChange={updatePasswordValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="********"/>
                        </div>
                    </div>
                    <div>
                        <p className="LoosFont text-xl">
                            Confirmar contraseña
                        </p>
                        <div className="flex justify-center">
                            <input type="password" value={confirmpasswordValue} onChange={updateConfirmPasswordValue} className="px-8 py-2 border-[1px] border-slate-400 w-full max-w-md" placeholder="********"/>
                        </div>
                    </div>
                </div>
                <div id="warning" className={`${warningVisibility()} px-12 mt-6 transition animate-fade`}>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
                <div className="mt-6 flex justify-center">
                    <button onClick={checkFields} className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Registrarse</button>
                </div>
                <div className="mt-8 flex justify-center">
                    <p>
                        ¿Ya tienes una cuenta? <span className="hover:underline cursor-pointer" onClick={handleClick}>Inicia sesión</span>
                    </p>
                </div>
            </div>
        </div>
    )
}