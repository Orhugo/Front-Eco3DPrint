import React, { useState, useEffect } from "react";
import axios from "axios";

function Comment(){
    const userId = 12;
    const modelId = 2;
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [updatedComment, setUpdatedComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleUpdatedCommentChange = (e) => {
        setUpdatedComment(e.target.value);
    };

    const postComment = () => {
        console.log("userId", userId);
        console.log("modelId", modelId);
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
        .put(`http://localhost:8080/comments/update/${commentId}`, { updatedContent: updatedComment })
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

    useEffect(() => {
        axios
        .get("http://localhost:8080/comments/getAll")
        .then((response) => {
            setComments(response.data);
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
        });
    }, []); 

    return (
        <div className="comment-container">
            <h2>Add Comment</h2>
            <textarea
            rows="4"
            cols="50"
            placeholder="Enter your comment here..."
            value={comment}
            onChange={handleCommentChange}
            />
            <button onClick={postComment}>Post Comment</button>
    
            <h2>Comments</h2>
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
                    <p>{c.content}</p>
                )}
                <button onClick={() => editComment(c.id)}>Edit</button>
                <button onClick={() => deleteComment(c.id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default Comment;
