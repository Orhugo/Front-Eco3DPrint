import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TutorialHandler() {
    const [tutorialDetails, setTutorialDetails] = useState({});
    const [tutorialLikes, setTutorialLikes] = useState(0);
    const [likedTutorials, setLikedTutorials] = useState([]);
    const [modal, setModal] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    const tutorialId = parseInt(useParams().id);
    const userFromLocalStorage = localStorage.getItem("user");
    const userId = userFromLocalStorage ? JSON.parse(userFromLocalStorage).id : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tutorialDetailsResponse, likeCountResponse, userLikeStatusResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/tutorials/getDetails/${tutorialId}`),
                    axios.get(`http://localhost:8080/tutorials/likeCount/${tutorialId}`),
                    axios.get(`http://localhost:8080/tutorials/liked/${userId}`)
                ]);

                setTutorialDetails(tutorialDetailsResponse.data);
                setTutorialLikes(likeCountResponse.data);
                setLikedTutorials(userLikeStatusResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [tutorialId, userId]);

    const likeTutorial = async () => {
        try {
            await axios.post(`http://localhost:8080/tutorials/like/${tutorialId}?userId=${userId}`)
            .then(() => {
                setLikedTutorials([...likedTutorials, tutorialId]);
                setTutorialLikes(tutorialLikes + 1);
            });
        } catch (error) {
            console.error("Error liking tutorial:", error);
        }
    };

    const dislikeTutorial = async (tutorialId) => {
        try {
            await axios.delete(`http://localhost:8080/tutorials/dislike/${tutorialId}?userId=${userId}`)
            .then(() => {
                setLikedTutorials(likedTutorials.filter((id) => id !== tutorialId));
                setTutorialLikes(tutorialLikes - 1);
            });
        } catch (error) {
            console.error("Error unliking tutorial:", error);
        }
    };

    const fetchLikedUsers = async (tutorialId) => {
        try {
            const response = await axios.get(`http://localhost:8080/tutorials/userInteractions/${tutorialId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching liked users:", error);
            return [];
        }
    };

    const toggleModal = async () => {
        if (modal) {
            setModal(!modal);
            return;
        }
        try {
            const likedUsersData = await fetchLikedUsers(tutorialId);
            setModal(!modal);
            setLikedUsers(likedUsersData);
        } catch (error) {
            console.error("Error fetching liked users:", error);
        }
    };

    return (
        <>
            <div className='main-content'>
                <h1>{tutorialDetails.title}</h1>
                <p>{tutorialDetails.content}</p>
                {tutorialDetails.user && (
                    <p>Author: {tutorialDetails.user.name} {tutorialDetails.user.lastname}</p>
                )}
                <br />
            </div>
            <div className="tutorial-likes-container">
                <button onClick={() => { if (tutorialLikes > 0) { toggleModal(); } }}>
                    Like Counter: {tutorialLikes}
                </button>

                <br />

                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-bg">
                            <div className="Header">
                                <p>{tutorialLikes} Tutorial likes</p>
                            </div>
                            <div className="modal-content">
                                <ul>
                                    {likedUsers.map((user) => (
                                        <li key={user.id}>{user.name} {user.lastname}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className="close-modal" onClick={toggleModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {userId !== 0 && likedTutorials.includes(tutorialId) ? (
                    <button onClick={() => dislikeTutorial(tutorialId)}>Dislike</button>
                ) : userId !== 0 && (
                    <button onClick={() => likeTutorial(tutorialId)}>Like</button>
                )}
            </div>
        </>
    );
}

export default TutorialHandler;
