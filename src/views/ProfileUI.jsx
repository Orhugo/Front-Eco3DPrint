import CatalogItem from "../components/CatalogItem.jsx";
import NotificationItem from "../components/NotificationItem.jsx";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {createClient} from "@supabase/supabase-js";
import CircularProgress from "@mui/material-next/CircularProgress";

export default function ProfileUI() {
    const selfUser = JSON.parse(localStorage.getItem('user'));
    const {state} = useLocation();
    const user = state.user;
    const [catalogModels, setAllModels] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [defaultImage, setdefaultImage] = useState("../default_image.png");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (catalogModels.length === 0) {
            setIsLoading(true);
        }
        window.scroll(0, 0);
        axios
            .get("http://localhost:8080/models/getAuthorModels", {
                params: {
                    author: user,
                },
            })
            .then((response) => {
                const filteredModels = response.data
                console.log(filteredModels)
                setAllModels(filteredModels)
            })
            .catch((error) => {
                console.error("Error fetching models data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleModelClick = async (model) => {
        console.log("id:  ", model.id);
        if (model.mainUrl == null) {
            navigate("/volume/visualizarstl", {
                state: "thinker.stl",
            });
        } else if (model.mainUrl.length < 1) {
            navigate("/volume/visualizarstl", {
                state: "thinker.stl",
            });
        } else {
          const response = await axios.get(`http://localhost:8080/url/getByModel?idModel=${model.id}`);
          const urls = response.data;

          //Use the fetched data in the navigation state
          navigate("/volume/visualizarSTL", {
              state: {
                  modelID: model.id,
                  modelName: model.title,
                  modelSTL: model.mainUrl,
                  modelURLs: urls,
              },
          });
        }
    };

    const supabaseUrl = 'https://ohjmhtpmzrwhleemxqgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oam1odHBtenJ3aGxlZW14cWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMzA0NjQsImV4cCI6MjAxNDYwNjQ2NH0.a8yTP4L8J_qPPzOBasqmFjMuftpA279n4fgRoLWQgW8';

    const supabase = createClient(supabaseUrl, supabaseKey);

    function extractPathFromUrl(url) {
        // Extraer la parte de la ruta del archivo de la URL
        const pathRegex = /\/object\/public\/test\/(.+?)(\?|$)/;
        const match = url.match(pathRegex);
        return match ? match[1] : null;
    }

    const uploadProfileImage = async (image) => {
        const path = `public/profiles/${image.name}`;
        const {data, error} = await supabase.storage.from('test').upload(path, image);

        if (error) {
            console.error('Error al subir la imagen:', error.message);
            return "Error";
        } else {
            const localImageUrl = `${supabaseUrl}/storage/v1/object/public/test/${path}`;
            console.log('Imagen subida con éxito:', localImageUrl);

            const imagePath = extractPathFromUrl(selfUser.imageUrl);
            const {data, error} = await supabase.storage.from('test').remove([imagePath]);

            if (error) {
                console.error('Error al eliminar la imagen:', error.message);
                return "Error";
            }

            try {
                const response = await axios.patch(`http://localhost:8080/users/${selfUser.id}/updateProfileImage`, localImageUrl, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });

                selfUser.imageUrl = localImageUrl;

                localStorage.setItem('user', JSON.stringify(selfUser));

                console.log('Imagen de perfil actualizada con éxito', response.data);
            } catch (error) {
                console.error('Error al actualizar la imagen de perfil', error);
            }
            window.location.reload();
        }
    };

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setdefaultImage(null);

        if (e.target.files && e.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setdefaultImage(imageUrl);

            uploadProfileImage(image);
        }
    };

    return (
        <div className="flex w-[80%] mt-12 gap-6 h-full animate-fade">
            <div id="sideBarContainer" className="max-w-sm flex flex-col">
                <div id="profilePicContainer" className="group relative w-32 h-32 bg-slate-400 rounded-full mx-auto">
                    <label htmlFor="filePicker" className="cursor-pointer block w-full h-full">
                        <img className="w-32 h-32 rounded-full group-hover:opacity-50"
                             src={selfUser.imageUrl || defaultImage}/>
                        <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full hidden group-hover:flex">
                            <img src="./lapiz.png" alt="Edit" className="h-6 w-6"/>
                        </div>
                    </label>
                    <input
                        id="filePicker"
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>


                <div id="profileNameContainer" className="mt-8">
                    <p className="LoosFont text-4xl text-center">{user}</p>
                </div>
                <div id="statsContainer" className="flex gap-6 mt-8 justify-between">
                    <div>
                        <p className="LoosFont text-center">{catalogModels.length}</p>
                        <p className="LoosFont text-center text-sm">Modelos</p>
                    </div>
                    <div>
                        <p className="LoosFont text-center">670</p>
                        <p className="LoosFont text-center text-sm">Seguidores</p>
                    </div>
                    <div>
                        <p className="LoosFont text-center">1120</p>
                        <p className="LoosFont text-center text-sm">Siguiendo</p>
                    </div>
                </div>
                <div id="buttonsContainer" className="flex justify-center gap-6 mt-8">
                    {selfUser.username === user && (<button
                        className="LoosFont w-44 px-8 py-2 text-md border-[1px] border-black rounded-full bg-transparent hover:bg-black hover:text-white cursor-pointer transition duration-300">
                        Editar
                    </button>)}
                    <button
                        className="LoosFont w-44 px-8 py-2 text-md border-[1px] border-black rounded-full bg-transparent hover:bg-black hover:text-white cursor-pointer transition duration-300">
                        Compartir
                    </button>
                </div>
                <div>
                    {selfUser.username === user && (<div className="mt-3">
                        <p>Descripción</p>
                        <p>Soy un diseñador 3D que le gusta hacer modelos de todo tipo</p>
                    </div>)}
                </div>
                <div className="flex">
                    <p className="text-sm mt-8 relative">
                        Notificaciones
                        {/* <div className="absolute w-2 h-2 rounded-full bg-red-500 top-0 -end-2"></div> */}
                    </p>
                </div>
                <div
                    id="notificationsContainer"
                    className="mt-2 flex flex-col flex-1 overflow-y-scroll overflow-x-visible max-h-[370px] no-scrollbar justify-start"
                >
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                    <NotificationItem text="Oye tienes un comprador "/>
                </div>
            </div>
            <div id="profileCatalogContainer" className="w-full">
                <div className="flex items-center gap-8 bg-pinkVolume p-4 relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <div className="w-full">
                        <input
                            placeholder="Buscar"
                            className="w-full bg-transparent text-2xl placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-transparent"
                        />
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 hover:rotate-90 transition duration-300 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <div className="flex justify-between px-20 mt-6">
                    <p className="LoosFont text-xl hover:underline cursor-pointer">
                        Favoritos
                    </p>
                    <p className="LoosFont text-xl hover:underline cursor-pointer">
                        Tus diseños
                    </p>
                    <p className="LoosFont text-xl hover:underline cursor-pointer">
                        Colecciones
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex h-[50%] items-center justify-center mb-2">
                        <CircularProgress color="secondary"/>
                    </div>
                ) : (
                    <div id="catalogProfileGrid" className="grid grid-cols-3 gap-4 mt-6">
                        {catalogModels.map((model) => (
                            <CatalogItem
                                key={model.id}
                                onClick={() => handleModelClick(model)}
                                modelName={model.title}
                                modelImage={model.imageUrl}
                                modelAuthor={model.author}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
