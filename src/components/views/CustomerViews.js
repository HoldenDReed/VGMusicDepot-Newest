import { Outlet, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AlbumDetails } from "../albums/AlbumsDetails";
import { AlbumContainer } from "../albums/AlbumContainer";
import "./views.css"
import { NavBar } from "../nav/NavBar";
import { Favorites } from "../favorites/Favorites";
import { RandomAlbum } from "../albums/RandomAlbum";
export const CustomerView = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

    return (


        <Routes>
            <Route
                path="/"
                element={

                    <>
                    <NavBar />
                    <header className="header"> 
                        <h2 className="headerText">Welcome, <br></br>{userObject.displayName}</h2>
                        <div className="titleLogo">
                        <h1 className="title">VG Music Depot</h1>
                        <img className="inline" src="https://i0.wp.com/pixelartmaker.com/art/453f8420077d7ab.png?resize=160,120"></img>
                        </div>
                        </header>
                        
                        <Outlet />
     
                    </>

                }>
                    
                <Route path="/" element={<AlbumContainer />} />
                <Route path="albums/:albumId" element={<AlbumDetails/> } />
                <Route path="/favorites" element={<Favorites/> } />
                <Route path="/random" element={<RandomAlbum/> } />
            </Route>
        </Routes>
    );
};