import { useEffect, useState } from "react";
import { Album } from "../albums/Album";

export const Favorites = () => {
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);




    const [favorites, setFavorites] = useState([])

    useEffect(
        () => {
            const fetchFavorites = async () => {
                const response = await fetch(`http://localhost:8088/favorites?uid=${userObject.uid}&_expand=album`)
                const responseJSON = await response.json()
                setFavorites(responseJSON)
            }
            fetchFavorites()
        },
        []
    )

    return (
        <>
            <div>
                <h2 className="albumDetailsTitle">Favorites Page</h2>
                <article className="albums">
                    {
                    favorites.map((album) =>      
                            <Album
                                key={`album--${album?.album?.id}`}
                                id={album?.album.id}
                                title={album?.album?.albumTitle}
                                img={album?.album?.albumImg}
                                info={album?.album?.albumInfo}
                                url={album?.album?.albumalbumUrl}
                            />
                    )}
                </article>
            </div>
        </>
    );
};