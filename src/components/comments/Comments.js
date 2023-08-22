import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Comments.css"
export const Comment = ({ id, datePosted, displayName, comment, uid}) => {
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

    const navigate = useNavigate()
    const userId = uid
    return <>
        <div key={`comment--${id}`} className="comment">
            <div>{datePosted}</div>
            <div>{displayName}:</div>
            <div>{comment}</div>
            {/* {
                userObject.uid === userId
                ? <button className="btn btn-dark comment_edit, glow-on-hover"
                    onClick={() => {navigate(`/commentEdit/${id}`)}}>
                    Edit Comment
                </button>
                : ""
            } */}
            {
                userObject.uid === userId
                ? <button className="btn btn-dark glow-on-hover"
                    onClick={() =>
                        {
                            const deleteComment = async () => {
                                await fetch(`http://localhost:8088/comments/${id}`, {method: "DELETE"})
                                window.location.reload(false)
                            }
                            deleteComment()
                        }
                    }
                >Delete Comment</button>
                : ""
            }
    </div>
  </>

}