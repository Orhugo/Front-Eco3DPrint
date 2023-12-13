import { useParams, useNavigate } from "react-router-dom";
import TutorialItemComponent from "../components/TutorialItemComponent.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TutorialsUI() {
    const [tutorialDetails, setTutorialDetails] = useState({});
    const [mostPopularTutorials, setMostPopularTutorials] = useState([]);
    const tutorialId = parseInt(useParams().id);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const tutorialDetailsResponse = await axios.get(
            `http://localhost:8080/tutorials/getDetails/${tutorialId}`
            );
            await axios.post(
            `http://localhost:8080/tutorials/enter/${tutorialId}`
            );
            setTutorialDetails(tutorialDetailsResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData();
    }, [tutorialId]);

    useEffect(() => {
        const fetchMostPopularTutorials = async () => {
        try {
            const response = await axios.get(
            "http://localhost:8080/tutorials/mostPopular"
            );
            setMostPopularTutorials(response.data);
            console.log(m)
        } catch (error) {
            console.error("Error fetching most popular tutorials:", error);
        }
        };

        fetchMostPopularTutorials();
    }, []); // Empty dependency array ensures it runs only once on component mount

    const navigate = useNavigate();
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const handleTutorialClick = (tutorial) => {
        navigate(`/Volume/tutorials/${tutorial.id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return(        
        <div id="mainTutorialsViewContainer" className="max-w-4xl animate-fade">
            <div id="mainLabelContainer" className="mt-12">
                <p className="LoosFont max-w-4xl text-8xl">
                    {tutorialDetails.title}
                </p>
                <p className="LoosFont text-2xl mt-4">
                    Vistas: {tutorialDetails.views}
                </p>
            </div>
            <div className="mt-8">
                <div id="tutorialsFirstDiv" className="bg-azulVolume px-14 py-10">
                    {tutorialDetails.subtitle1 && <p className="LoosFont text-3xl">1</p>}
                    <p className="LoosFont text-2xl">{tutorialDetails.subtitle1}</p>
                    <p className="LoosFont text-sm max-w-xs mt-8">{tutorialDetails.content1}</p>
                </div>
                <div id="tutorialsSecondDiv" className="bg-greenFooter px-14 pb-20 pt-16 flex justify-end -my-20">
                    <div className="w-fit">
                        {tutorialDetails.subtitle2 && <p className="LoosFont text-3xl">2</p>}
                        <p className="LoosFont text-2xl">{tutorialDetails.subtitle2}</p>
                        <p className="LoosFont text-sm max-w-xs mt-4">{tutorialDetails.content2}</p>
                    </div>
                </div>
                <div id="tutorialsThirdDiv" className="bg-marronPocho px-14 pt-14 pb-20 -my-28">
                    {tutorialDetails.subtitle3 && <p className="LoosFont text-3xl">3</p>}
                    <p className="LoosFont text-2xl">{tutorialDetails.subtitle3}</p>
                    <p className="LoosFont text-sm max-w-xs mt-8">{tutorialDetails.content3}</p>
                </div>
                <div id="tutorialsFourthDiv" className="px-14 pt-10 pb-16 flex justify-end bg-pinkVolume">
                    <div className="w-fit">
                        {tutorialDetails.subtitle4 && <p className="LoosFont text-3xl">4</p>}
                        <p className="LoosFont text-2xl">{tutorialDetails.subtitle4}</p>
                        <p className="mt-4 max-w-xs">{tutorialDetails.content4}</p>
                    </div>
                </div>
                <div id="tutorialsFifthDiv" className="bg-azulVolume px-14 py-10 -my-10">
                    {tutorialDetails.subtitle5 && <p className="LoosFont text-3xl">5</p>}
                    <p className="LoosFont text-2xl max-w-md">{tutorialDetails.subtitle5}</p>
                    <p className="LoosFont text-sm max-w-xs mt-8">{tutorialDetails.content5}</p>    
                </div>
            </div>

            {/* TODO: Do better styling */}
            {tutorialDetails.photo1 && <img src={tutorialDetails.photo1} className="max-w-full mt-4"/>}
            {tutorialDetails.photo2 && <img src={tutorialDetails.photo2} className="max-w-full mt-4" />}
            {tutorialDetails.photo3 && <img src={tutorialDetails.photo3} className="max-w-full mt-4" />}

            {mostPopularTutorials.length > 0 && (
                <div className="mt-8 py-8" >
                <h2 className="LoosFont text-4xl mt-12">Continua aprendiendo</h2>
                <h3 className="LoosFont text-2xl mt-12">Los tutoriales más populares</h3>
                <div className="flex w-full gap-4 overflow-x-auto py-8">
                {mostPopularTutorials.slice(0, 4).map((tutorial) => (
                        <TutorialItemComponent
                        key={tutorial.id}
                        onClick={() => handleTutorialClick(tutorial)}
                        tutorialName={tutorial.title}
                        tutorialImage={tutorial.mainPhoto}
                        />
                    ))}
                </div>
                </div>
            )}
        </div>
    )
}