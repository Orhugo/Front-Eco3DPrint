import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Comment(props){

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [updatedComment, setUpdatedComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [newReply, setNewReply] = useState("");
    const [repliesForCommentId, setRepliesForCommentId] = useState(null);
    const [likedComments, setLikedComments] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const location = useLocation();
    // const modelId = urlParams.get('id');
    const modelId = props.modelId;
    const userFromLocalStorage = localStorage.getItem("user");
    const userId = userFromLocalStorage ? JSON.parse(userFromLocalStorage).id : 0;    
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleUpdatedCommentChange = (e) => {
        setUpdatedComment(e.target.value);
    };

    const handleNewReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const postComment = () => {
        axios
        .post("http://localhost:8080/comments/create", {
            user: { id: userId },
            model: { id: modelId },
            content: comment,
        })
        .then((response) => {
            setComments([...comments, response.data]);
            setComment("");
        });
    };

    const editComment = (commentId) => {
        setIsEditing(true);
        setEditCommentId(commentId); // Set the comment being edited
        setUpdatedComment(comments.find((c) => c.id === commentId).content);
    };

    const updateComment = (commentId) => {
        axios
        .put(`http://localhost:8080/comments/update/${commentId}`, {
            content: updatedComment,
        })
        .then((response) => {
            const updatedComments = comments.map((c) =>
            c.id === commentId ? { ...c, content: response.data.content } : c
            );
            setComments(updatedComments);
            setUpdatedComment("");
            setIsEditing(false);
            setEditCommentId(null);
        });
    };

    const deleteComment = (commentId) => {
        axios.delete(`http://localhost:8080/comments/delete/${commentId}`)
            .then((response) => {
                if (response.data) {
                    const filteredComments = comments.filter((c) => c.id !== commentId);
                    setComments(filteredComments);
                }
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });
    };
    

    const likeComment = (commentId) => {
        axios.post(`http://localhost:8080/comments/like/${commentId}?userId=${userId}`)
        .then((response) => {
            setLikedComments([...likedComments, commentId]);
        })
        .catch((error) => {
            console.error("Error liking comment:", error);
        });
    };

    const dislikeComment = (commentId) => {
        axios.delete(`http://localhost:8080/comments/dislike/${commentId}?userId=${userId}`)
        .then((response) => {
            setLikedComments(likedComments.filter((id) => id !== commentId));
        })
        .catch((error) => {
            console.error("Error disliking comment:", error);
        });
    };

    const toggleReplies = (commentId) => {
        if (repliesForCommentId === commentId) {
            setRepliesForCommentId(null); // Close the replies
        } else {
            axios
                .get(`http://localhost:8080/comments/replies/${commentId}`)
                .then((response) => {
                    const updatedComments = comments.map((c) => {
                        if (c.id === commentId) {
                            return { ...c, replies: response.data };
                        }
                        return c;
                    });
                    setComments(updatedComments);
                    setRepliesForCommentId(commentId); // Open the replies
                })
                .catch((error) => {
                    console.error("Error fetching replies:", error);
                });
        }
    };

    const getReplies = (parentCommentId) => {
        return comments.filter((c) => c.parentComment && c.parentComment.id === parentCommentId);
    };

    const addReply = (parentCommentId) => {
        axios.post(`http://localhost:8080/comments/reply/${parentCommentId}`, {
            user: { id: userId },
            model: { id: modelId },
            content: newReply,
        })
        .then((response) => {
            const updatedComments = comments.map((c) => {
                if (c.id === parentCommentId) {
                    return {
                        ...c,
                        replies: [...(c.replies || []), response.data],
                    };
                }
                return c;
            });
            setComments(updatedComments);
            setNewReply("");
        })
        .catch((error) => {
            console.error("Error adding reply:", error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/comments/get/${modelId}`);
                const jsonData = response.data;
                const rootComments = jsonData.filter((comment) => comment.parentComment === null);
                setModelData(jsonData);
    
                axios.get(`http://localhost:8080/comments/liked/${userId}`)
                    .then((likedResponse) => {
                        setLikedComments(likedResponse.data);
    
                        const updatedComments = rootComments.map((comment) => {
                            const isLiked = likedResponse.data.includes(comment.id);
                            return { ...comment, isLiked };
                        });
    
                        setComments(updatedComments);
                    })
                    .catch((error) => {
                        console.error("Error fetching liked comments:", error);
                    });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [modelId, userId]);    
    

    return (
        <div className="comment-container">
            <h1>Comments</h1>
            <h2>Add Comment</h2>
            <textarea
            rows="4"
            cols="50"
            placeholder="Enter your comment here..."
            value={comment}
            onChange={handleCommentChange}
            />
            <button onClick={postComment}>Post Comment</button>

            <ul>
                {comments.map((c) => (
                    <li key={c.id}>
                        {isEditing && editCommentId === c.id ? (
                            <div>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    value={updatedComment}
                                    onChange={handleUpdatedCommentChange}
                                />
                                <button onClick={() => updateComment(c.id)}>Update</button>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    <strong>{c.user.name}</strong>&nbsp;
                                    <strong>{c.user.lastname}</strong>
                                    <br />
                                    {c.content}
                                </p>
                                <p>Like Counter: {c.likeCounter}</p>

                            </div>
                        )}
                        {userId === c.user.id && (
                        <div>
                            <button onClick={() => editComment(c.id)}>Edit</button>
                            <button onClick={() => deleteComment(c.id)}>Delete</button>
                        </div>
                        )}
                        <button onClick={() => toggleReplies(c.id)}>
                            {repliesForCommentId === c.id ? "Hide Replies" : "View Replies"}
                        </button>
                        {!likedComments.includes(c.id) ? (
                            <button onClick={() => likeComment(c.id)}>Like</button>
                        ) : (
                            <button onClick={() => dislikeComment(c.id)}>Dislike</button>
                        )}
                        {repliesForCommentId === c.id && (
                            <div>
                                {c.replies && c.replies.length > 0 && (
                                    <div>
                                        {c.replies.map((reply) => (
                                            <div key={reply.id}>
                                                <p>
                                                    <strong>{reply.user.name}</strong>&nbsp;
                                                    <strong>{reply.user.lastname}</strong>
                                                    <br />
                                                    {reply.content}
                                                </p>
                                                {userId === reply.user.id && (
                                                <div>
                                                    <button onClick={() => deleteComment(reply.id)}>Delete Reply</button>
                                                </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <textarea
                                    rows="4"
                                    cols="50"
                                    placeholder="Enter your reply here..."
                                    value={newReply}
                                    onChange={handleNewReplyChange}
                                />
                                <button onClick={() => addReply(c.id)}>Add Reply</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Comment;
