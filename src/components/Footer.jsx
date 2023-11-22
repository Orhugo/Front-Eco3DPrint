import {useNavigate} from "react-router-dom";

function Footer(){
    const navigate = useNavigate();
    const handleOnClick = ()=>{
        navigate("/Volume/AboutUs");
    }

    return(
        <div className="w-full h-full mt-[5%] mb-[5%] flex justify-center">
            <div className="w-[70%] border-t-[0.5px] border-grey">
                <div className="w-full flex items-center pt-[2%] justify-between px-[2%]">
                    <div className="w-fit flex items-center">
                        <img src="../../public/VolumeLogo.png" alt="Volume Logo" className="w-[70px] h-auto object-cover"/>
                        <div className="h-fit">
                            © 2023 Volume, Inc.
                        </div>
                    </div>
                    <div className="flex">
                        <a className="w-fit mx-2 hover:text-white transition cursor-pointer duration-[200]">Contact</a>
                        <a className="w-fit mx-2 hover:text-white transition cursor-pointer duration-[200]">Blog</a>
                        <a className="w-fit mx-2 hover:text-white transition cursor-pointer duration-[200]" onClick={handleOnClick}>About Us</a>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer;