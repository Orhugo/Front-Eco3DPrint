import Carousel from "../components/Carousel.jsx";
import LinearProgress from '@mui/material/LinearProgress';
import ProgressBarReview from "../components/ProgressBarReview.jsx";
import CommentItem from "../components/CommentItem.jsx";
import {useNavigate} from "react-router-dom";

export default function ModelViewUI(){
    const navigate = useNavigate()
    const navigateProfile = ()=>{
        navigate("/Volume/Profile")
    }

    return(
        <div id="mainModelViewUIContainer" className="md:w-[80%] w-full mt-14 font-loos animate-fade">
            <div id="mainLabelContainer" className="w-full">
                <p className="LoosFont text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
                    Titulo del modelo
                </p>
            </div>
            <div className="w-full px-32">
                <div id="modelStatsContainer" className="flex gap-6 p-2">
                    <div id="likes" className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <p>248</p>
                    </div>
                    <div id="views" className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>2,6k</p>
                    </div>
                </div>
                <div id="carrouselContainer" className="h-[400px] w-full mx-auto inline-block bg-slate-300">

                </div>
                <div id="modelInfoMainContainer" className="flex justify-between mt-4">
                    <div className="w-fit max-w-md">
                        <div id="userInfoContainer" className="flex gap-4 items-center">
                            <div className="flex gap-4 items-center" onClick={navigateProfile}>
                                <div className="w-8 h-8 rounded-full bg-slate-400 hover:drop-shadow-slim cursor-pointer transition duration-300"></div>
                                <p className="LoosFont text-xl hover:underline cursor-pointer transition duration-300">orhugo</p>
                            </div>
                            <button className="rounded-full px-10 py-[0.5px] border-2 border-black text-lg hover:bg-black hover:text-white transition duration-300">Seguir</button>
                        </div>
                        <div id="modelDescription" className="mt-4">
                            <p className="text-sm">Jarrón con Diseño Exclusivo. Es posible la modificación del color y el tamaño.
                                El archivo ya contiene el STL.</p>
                        </div>
                        <div id="cathegoryContainer" className="flex flex-wrap gap-2 mt-4">
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Hogar</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Decoración</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Moda</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">STL</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Sostenible</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Para pintar</p>
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300">Diseño</p>
                        </div>
                    </div>
                    <div>
                        <div id="iconsContainer" className="flex gap-6 justify-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto hover:fill-black cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p className="text-xs mt-2">1000</p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto hover:fill-black cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                </svg>
                                <p className="text-xs mt-2">Compartir</p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto hover:fill-black cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <p className="text-xs mt-2">Guardar</p>
                            </div>
                        </div>
                        <div id="buttonsContainer" className="flex flex-col gap-4 mt-8">
                            <button className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Descargar Modelo</button>
                            <button className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Solicitar Impresión</button>
                        </div>
                    </div>
                </div>
                <div id="columnContainer" className="max-w-xl">
                    <div id="makeCommentContainer" className="flex items-center mt-8 gap-2">
                        <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
                        <div id="commentTextField" className="w-fit flex-grow">
                            <input className="px-4 py-2 bg-pinkVolume placeholder-neutral-500 w-full rounded-full focus:outline-none focus:ring focus:ring-pink-200" placeholder="Escribe un comentario..."/>
                        </div>
                    </div>
                    <div id="reviewsContainer" className="mt-24">
                        <div id="label">
                            <p className="text-4xl">Valoraciones y reseñas</p>
                        </div>
                    </div>
                    <div id="reviewPointContainer" className="flex">
                        <div id="number">
                            <p className="text-6xl mt-5 text-center">4,6</p>
                            <div className="flex mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </div>
                        </div>
                        <div id="bars" className="w-full p-4">
                            <div className="flex w-full items-center">
                                <p className="w-4 text-end">5</p>
                                <ProgressBarReview value={70}/>
                            </div>
                            <div className="flex w-full items-center">
                                <p className="w-4 text-end">4</p>
                                <ProgressBarReview value={20}/>
                            </div>
                            <div className="flex w-full items-center">
                                <p className="w-4 text-end">3</p>
                                <ProgressBarReview value={10}/>
                            </div>
                            <div className="flex w-full items-center">
                                <p className="w-4 text-end">2</p>
                                <ProgressBarReview value={0}/>
                            </div>
                            <div className="flex w-full items-center">
                                <p className="w-4 text-end">1</p>
                                <ProgressBarReview value={0}/>
                            </div>
                        </div>
                    </div>
                    <div id="commentsContainer" className="gap-12 flex flex-col mt-14">
                        <CommentItem name="carlos"/>
                        <CommentItem name="fer"/>
                        <CommentItem name="iván"/>
                        <CommentItem name="orhugo"/>
                        <CommentItem name="carla"/>
                        <CommentItem name="elena"/>
                    </div>
                </div>
                <div id="exploreContainer" className="mt-24">
                    <div id="exploreLabel">
                        <p className="text-4xl">Explora más esta categoría</p>
                    </div>
                    <div id="galeryContainer" className="grid grid-cols-4 gap-4 w-full mt-4">
                        <img className="hover:drop-shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer" src="../../public/GaleryItem1.svg"/>
                        <img className="hover:drop-shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer" src="../../public/GaleryItem2.svg"/>
                        <img className="hover:drop-shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer" src="../../public/GaleryItem3.svg"/>
                        <img className="hover:drop-shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer" src="../../public/GaleryItem4.svg"/>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="LoosFont px-10 py-1 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}