import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Comment } from "../comments/Comments"
import { useNavigate } from "react-router-dom"
export const AlbumDetails = () => {
    const navigate = useNavigate()
    const { albumId } = useParams()
    const [album, updateAlbum] = useState({})
    const [comments, updateComments] = useState([])
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);
    let [newAlbumId, setAlbumId] = useState({})
    useEffect(
      () => {
        setAlbumId(albumId)
      },
      [albumId]
    )

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/albums/${albumId}`)
                const singleAlbum = await response.json()
                updateAlbum(singleAlbum)
            }
            fetchData()
            console.log(album)
        },
        [albumId]
    )

    useEffect(
        () => {
          fetch(`http://localhost:8088/comments?albumId=${albumId}`)
            .then (response => response.json())
            .then ((response) => {
            const commentArray = response
                updateComments(commentArray)
              
            })
        },
        [albumId]
      )
      const [newComment, update] = useState({
        datePosted: "",
        comment: "",
        albumId: `${albumId}`,
      });

      const handleSaveButtonClick = (event) => {
        event.preventDefault();
    
        const DateStamp = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        const TimeStamp = new Date().toLocaleTimeString("en-US");
        const DateTimeStamp = DateStamp + " " + TimeStamp
    
        const commentToSendToAPI = {
          uid: userObject.uid,
          albumId: parseInt(newComment.albumId),  
          datePosted: DateTimeStamp,
          comment: newComment.comment,
          displayName: userObject.displayName
        };
    
        return fetch(`http://localhost:8088/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentToSendToAPI),
        })
          .then((response) => response.json())
          .then(() => {
            window.location.reload(false);
          });
      };
      // const increment = () => {
      //   newAlbumId++
      //   navigate(`/albums/${newAlbumId}`)
      // }

    return <section>
      {/* <button onClick={increment}></button> */}
        <h2 className="albumDetailsTitle">{album?.albumTitle}</h2>
        <section className="albumDetails">
        <div className="detailsColum">
            <div className="albumDetails"><img src={album?.albumImg} className="albumCover"></img></div>
            <div className="albumInfo">{album?.albumInfo}</div>
        </div>

        <div className="detailsColum">
            <div className="albumDetails"><iframe width="576" height="330" src={album?.albumUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
            <div className="albumInfo">
                <div className="centerItems">Comment Section</div>
                <form>
      <fieldset>
          <div className="form-group centerItems">
            <textarea
              className="descriptionBox"
              required
              autoFocus
              type="text-area"
              placeholder="Comment"
              value={newComment.comment}
              onChange={(evt) => {
                const copy = { ...newComment };
                copy.comment = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        </form>
<div className="flex">
      <button 
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-dark glow-on-hover"
        >
          Submit New Comment
        </button>
        </div>
      <footer>
        <div className="comment-section">
          {comments.map((comment) => (
            <Comment
              key={`comment--${comment.id}`}
              id={comment.id}
              datePosted={comment.datePosted}
              displayName={comment.displayName}
              comment={comment.comment}
              uid={comment.uid}
              
            />
          ))}
        </div>
      </footer></div>
        </div>
        </section>
    </section>
}