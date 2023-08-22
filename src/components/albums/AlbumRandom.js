import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import './randomAlbum.css';
const localUser = localStorage.getItem("capstone_user");
const userObject = JSON.parse(localUser);


export const AlbumRandom = ({ id, title, img }) => {
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(false)
    const [favoritesId, setFavoritesId] = useState("")
   

    useEffect(
        () => {
            const checkIfFavorite = async () => {
                const response = await fetch(`http://localhost:8088/favorites?uid=${userObject.uid}&albumId=${id}`)
                const responseJSON = await response.json()
                const responseLength = await responseJSON.length
                    setFavoritesId(responseJSON[0])
                if (await responseLength === 0) {
                    setIsFavorite(false)
                } else {
                    setIsFavorite(true)
                }
            }
            checkIfFavorite()
        },
        [id]
    )

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`/albumEdit/${id}`)
    };

    return <section className="randomAlbum">
        <div className="glowDiv">
            <Link  className="glow-on-hover" to={`/albums/${id}`}><h1 className="glow-on-hover, randomAlbumTitle">{title}</h1></Link>
        </div>
        
        <div className="randomAlbums">
            <Link to={`/albums/${id}`}>
                <img src={img} className="randomAlbumCover"></img>
            </Link>
        </div>
        <div className="randomAlbumButton">
            {
                userObject.isStaff
                    ? <>
                    <button className="albumEdit, glow-on-hover" onClick={submitHandler}>
                    <BsPencilFill />
                    </button>
                        <button className="deleteButton, glow-on-hover" onClick={async () => {
                            if (window.confirm("Are you sure you want to delete?")) {
                                fetch(`http://localhost:8088/albums/${id}`, {
                                    method: "DELETE"
                                })
                                    .then(window.location.reload(false))
                            } else {

                            }
                        }}
                        > <BsXLg /> </button>
                    </>
                    : ""
            }
        </div>
        <div className="randomAlbumButton">
            {
                userObject.isStaff
                    ? ""
                    : <>
                        {
                            isFavorite
                                ? <button className="deleteButton, glow-on-hover"
                                    onClick={() => {
                                      if  (window.confirm("Are you sure?")) {
                                             fetch(`http://localhost:8088/favorites/${favoritesId.id}`, {
                                                method: "DELETE" 
                                            })
                                            .then(window.location.reload(false))
                                        } else {
                                            
                                        }
                                    }}
                                    
                                ><BsCheckCircleFill/></button>
                                : <button className="deleteButton, glow-on-hover" onClick={async () => {
                                    await fetch(`http://localhost:8088/favorites`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            uid: userObject.uid,
                                            albumId: id
                                        })
                                    })
                                    window.location.reload(false)
                                }}
                                > <BsCheckCircle /> </button>
                        }
                    </>
            }
        </div>
        
    </section>
}