import Carousel from "../components/Carousel.jsx";
import LinearProgress from '@mui/material/LinearProgress';
import ProgressBarReview from "../components/ProgressBarReview.jsx";
import CommentItem from "../components/CommentItem.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import React, { useState, useEffect } from "react";
import { StlViewer } from "react-stl-viewer";
import { WidthFull } from "@mui/icons-material";

const style = {
    width: "972.8px",
    height: "400px",
};

export default function ModelViewUI(){
    const navigate = useNavigate()
    const navigateProfile = ()=>{
        navigate('/volume/profile', {
            state: {
                user: authorUsername
            },
        })
    }

    const { state, setState } = useLocation();
    const objectID = state ? state.modelID : "1";
    const [modelCategory, setModelCategory] = useState('');
    const [modelDescription, setModelDescription] = useState('');
    const [modelLikes, setModelLikes] = useState(0);
    const [authorUsername, setAuthorUsername] = useState('');
    const [authorID, setAuthorID] = useState('');
    const [modelViews, setModelViews] = useState(0);

    const [currentSTL, setCurrentSTL] = useState(state ? state.modelSTL : "");
    const [URLindex, setURLindex] = useState(0);
    const numURLs = state.modelURLs.length;

    const userFromLocalStorage = localStorage.getItem("user");
    const loggedUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage).id : 0;    

    const extractSTLName = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1].replace('.stl', '');
    };
    const [STLname, setSTLname] = useState(extractSTLName(currentSTL));

    const handleNext = () => {
        if (numURLs === 0) { return; }

        let newIndex = (URLindex + 1) % numURLs;
        setURLindex(newIndex);

        const newSTL = state.modelURLs[newIndex];
        setCurrentSTL(newSTL);
        setSTLname(extractSTLName(newSTL));
        
    };

    const handlePrev = () => {
        if (numURLs === 0) { return; }

        let newIndex = URLindex - 1;
        if (newIndex < 0) { newIndex = 0; }
        setURLindex(newIndex);

        const newSTL = state.modelURLs[newIndex];
        setCurrentSTL(newSTL);
        setSTLname(extractSTLName(newSTL));
        
    };

    const GetModelInfo = async () => {
        try {
            //Make a GET request to fetch model information
            const response = await axios.get(`http://localhost:8080/models/getModel?id=${objectID}`);
            const { imageUrl, description, category, tags, likeCounter, author, views } = response.data;
    
            //Get the informsation needed and save them in the variables
            setModelCategory(category);
            setModelDescription(description);
            setModelLikes(likeCounter);
            setAuthorUsername(author.username);
            setAuthorID(author.id);
            setModelViews(views);
    
        } catch (error) {
            console.error('Error fetching model information:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comments/get/${objectID}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(
                `http://localhost:8080/models/enter/${objectID}`
            );
            await GetModelInfo();
            await fetchComments();
        };

        fetchData();
    }, []);    

    const downloadModel = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/url/getByModel?idModel=${objectID}`);      
            const urls = response.data;
            const zip = new JSZip();
      
            const downloadPromises = urls.map(async (url, index) => {
                const fileResponse = await axios.get(url);
                const fileName = `file_${index}.stl`; 
                zip.file(fileName, fileResponse.data);
            });
      
            await Promise.all(downloadPromises);
      
            const zipBlob = await zip.generateAsync({ type: 'blob' });
      
            saveAs(zipBlob, 'model_files.zip'); 

        } catch (error) {

            console.error('Error downloading the file:', error);
        }
    };

    const likeModel = async (modelId, userId) => {
        try {
            const response = await axios.post(`http://localhost:8080/models/like/${modelId}?userId=${userId}`);
            console.log('Model liked!', response.data);
        } catch (error) {
            console.error('Error liking model:', error);
        }
    };

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const postComment = async (comment) => {
        try {
            const response = await axios.post("http://localhost:8080/comments/create", {
                user: { id: loggedUser },
                model: { id: objectID },
                content: comment,
            });
    
            setComments([...comments, response.data]);
            setComment("");
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return(
        <div id="mainModelViewUIContainer" className="md:w-[80%] w-full mt-14 font-loos animate-fade">
            <div id="mainLabelContainer" className="w-full">
                <p className="LoosFont text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
                    {state.modelName}          
                </p>
            </div>
            <div className="w-full px-32">
                <div id="modelStatsContainer" className="flex gap-6 p-2">
                    <div id="likes" className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <p> {modelLikes} </p>
                    </div>
                    <div id="views" className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>{modelViews}</p>
                    </div>
                </div>
                <div className="h-[400px] w-full mx-auto inline-flex bg-slate-300 justify-center items-center relative">
                <div id="carrouselContainer" className="h-[400px] w-full mx-auto inline-flex bg-slate-300 justify-center items-center border border-slate-600">
                <StlViewer
                    style={style}
                    orbitControls
                    shadows
                    url={currentSTL}
                    modelProps={{
                        color: "#0a6bc1",
                        positionX: 0,
                        positionY: 0,
                    }}
                />
                </div>
                <div className="LoosFont absolute top-2 left-1/2 transform text-2xl -translate-x-1/2 px-4 py-2 rounded-md">
                    {STLname}
                </div>
                    <button
                        className="LoosFont absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 text-2xl hover:text-white hover:bg-black rounded-full transistion duration-300"
                        onClick={handlePrev}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" data-slot="icon" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                        </svg>
                    </button>
                    <button
                        className="LoosFont absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-2 text-2xl hover:text-white hover:bg-black rounded-full transistion duration-300"
                        onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <div className="LoosFont absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md">
                    {URLindex + 1} / {numURLs}
                </div>
                </div>
                <div id="modelInfoMainContainer" className="flex justify-between mt-4">
                    <div className="w-fit max-w-md">
                        <div id="userInfoContainer" className="flex gap-4 items-center">
                            <div className="flex gap-4 items-center" onClick={navigateProfile}>
                                <div className="w-8 h-8 rounded-full bg-slate-400 hover:drop-shadow-slim cursor-pointer transition duration-300"></div>
                                <p className="LoosFont text-xl hover:underline cursor-pointer transition duration-300"> {authorUsername} </p>
                            </div>
                            <button className="rounded-full px-10 py-[0.5px] border-2 border-black text-lg hover:bg-black hover:text-white transition duration-300">Seguir</button>
                        </div>
                        <div id="modelDescription" className="mt-4">
                            <p className="text-sm"> {modelDescription} </p>
                        </div>
                        <div id="cathegoryContainer" className="flex flex-wrap gap-2 mt-4">
                            <p className="w-fit text-black text-md bg-pinkVolume rounded-full px-8 py-2 hover:bg-pinkDarkVolume hover:text-white cursor-pointer transition duration-300"> {modelCategory} </p>
                        </div>
                    </div>
                    <div>
                        <div id="iconsContainer" className="flex gap-6 justify-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto hover:fill-black cursor-pointer" onClick={() => likeModel(objectID, loggedUser)} >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p className="text-xs mt-2">Like</p>
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
                            <button onClick={downloadModel} className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Descargar Modelo</button>
                            <button className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300">Solicitar Impresión</button>
                        </div>
                    </div>
                </div>
                <div id="columnContainer" className="max-w-xl">
                    {loggedUser !== 0 && (
                        <div id="makeCommentContainer" className="flex items-center mt-8 gap-2">
                        <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
                        <div id="commentTextField" className="w-fit flex-grow">
                            <input
                            className="px-4 py-2 bg-pinkVolume placeholder-neutral-500 w-full rounded-full focus:outline-none focus:ring focus:ring-pink-200"
                            placeholder="Escribe un comentario..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                postComment(e.target.value);
                                setComment("");
                                e.target.value = "";
                                }
                            }}
                            />
                        </div>
                        </div>
                    )}
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
                        {comments.map((comment, index) => (
                            <CommentItem key={comment.id} name={comment.user.name} content={comment.content} index={index} lastname={comment.user.lastname}/>
                        ))}
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

