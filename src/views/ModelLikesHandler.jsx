import { useState, useEffect } from "react";
import axios from "axios";

function ModelLikesHandler(props) {
    const [modelLikes, setModelLikes] = useState(0);
    const [likedModels, setLikedModels] = useState([]);
    const [userLikedModel, setUserLikedModel] = useState(false);
    const [modal, setModal] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    const modelId = props.modelId;
    const userFromLocalStorage = localStorage.getItem("user");
    const userId = userFromLocalStorage ? JSON.parse(userFromLocalStorage).id : 0;

    // Fetch initial like count and user's like status when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [likeCountResponse, userLikeStatusResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/models/likeCount/${modelId}`),
                    axios.get(`http://localhost:8080/models/liked/${userId}`)
                ]);
    
                setModelLikes(likeCountResponse.data);
                setLikedModels(userLikeStatusResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [modelId, userId]);
    

    const likeModel = async (modelId) => {
        try {
            await axios.post(`http://localhost:8080/models/like/${modelId}?userId=${userId}`)
            .then((response) => {
                setLikedModels([...likedModels, modelId]);
                setModelLikes(modelLikes + 1);
            });
        } catch (error) {
            console.error("Error liking model:", error);
        }
    };

    const dislikeModel = async (modelId) => {
        try {
            await axios.delete(`http://localhost:8080/models/dislike/${modelId}?userId=${userId}`)
            .then((response) => {
                setLikedModels(likedModels.filter((id) => id !== modelId));
                setModelLikes(modelLikes - 1);
            });
        } catch (error) {
            console.error("Error unliking model:", error);
        }
    };

    const fetchLikedUsers = async (modelId) => {
        try {
            const response = await axios.get(`http://localhost:8080/models/userInteractions/${modelId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching liked users:", error);
            return [];
        }
    };

    const toggleModal = async (modelId) => {
        if (modal) {
            setModal(!modal);
            return;
        }
        try {
            const likedUsersData = await fetchLikedUsers(modelId);
            setModal(!modal);
            setLikedUsers(likedUsersData);
        } catch (error) {
            console.error("Error fetching liked users:", error);
        }
    };

    return (
        <div className="model-likes-container">
            <button onClick={() => {
                if (modelLikes > 0) {
                    toggleModal(modelId);
                }
            }}>Like Counter: {modelLikes}</button>

            <br />

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-bg">
                        <div className="Header">
                            <p>{modelLikes} Model likes</p>
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
            {userId !== 0 && likedModels.includes(modelId) ? (
                <button onClick={() => dislikeModel(modelId)}>Dislike</button>
            ) : userId !== 0 && (
                <button onClick={() => likeModel(modelId)}>Like</button>
            )}

        </div>
    );
}

export default ModelLikesHandler;
