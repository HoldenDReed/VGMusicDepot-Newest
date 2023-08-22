import { useEffect } from "react";
import { useState } from "react";
import { Album } from "./Album";
import { RadioButton } from "./RadioButton";
import Konami from "konami";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gameboy from '../pictures/gameboy.png'
import "./Albums.css"


export const AlbumList = ({ searchTermState, setterFunction }) => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [catagorie, setCatagorie] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(
                    `http://localhost:8088/albums?_expand=gameType&_sort=albumTitle`
                );
                const albumsArray = await response.json();
                setAlbums(albumsArray);
            };
            fetchData();
        },
        []
    );

    useEffect(
        () => {
            setFilteredAlbums(albums)
        },
        [albums]
    );

    useEffect(
        () => {
            const searchedAlbums = albums.filter(album => {
                return album.albumTitle.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredAlbums(searchedAlbums)
        },
        [searchTermState]
    );

    useEffect(
        () => {
            if(catagorie === "all") {
                setFilteredAlbums(albums)
            } else {
               const newCatagorie = parseInt(catagorie)
            const catagorizedAlbums = albums.filter(album => {
                return album.gameType.id === newCatagorie})
                setFilteredAlbums(catagorizedAlbums)
            }
        },
    [catagorie]
    );

    const radioChangeHandler = (e) => {
        setCatagorie(e.target.value);
      };

      useEffect(()=>{    
        const easterEgg = new Konami(() => handleShow())
      },[])

    return <>
   <div className="radio-btn-container">
        <RadioButton
          changed={radioChangeHandler}
          id="1"
          isSelected={catagorie === "Adventure"}
          label="Adventure"
          value="1"
        />

        <RadioButton
          changed={radioChangeHandler}
          id="2"
          isSelected={catagorie === "Retro"}
          label="Retro"
          value="2"
        />

        <RadioButton
          changed={radioChangeHandler}
          id="3"
          isSelected={catagorie === "FPS"}
          label="FPS"
          value="3"
        />

        <RadioButton
          changed={radioChangeHandler}
          id="4"
          isSelected={catagorie === "Story/RPG"}
          label="Story/RPG"
          value="4"
        />  
        <RadioButton
          changed={radioChangeHandler}
          id="5"
          isSelected={catagorie === "Show All"}
          label="Show all"
          value="all"
        />  
      </div>

        <div className="albums">
            {
                filteredAlbums.map(album => <Album key={`album--${album.id}`}
                    id={album.id}
                    title={album.albumTitle}
                    img={album.albumImg}
                    info={album.albumInfo}
                    url={album.albumUrl} />)
            }
        </div>

        <Modal 
            size="lg" 
            show={show} 
            onHide={handleClose} 
            backdrop="static" 
            keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Secret GameBoy!</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="gameBoyContainer"><iframe src="https://www.retrogames.cc/embed/42882-pokemon-inclement-emerald-1-13.html" width="637" height="440" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" className="pacMan"></iframe><img className="gameBoy" src={gameboy}/>
        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
};