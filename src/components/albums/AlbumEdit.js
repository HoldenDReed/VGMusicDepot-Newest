import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import "./Albums.css"
import Button from "react-bootstrap/Button";
export const AlbumEdit = () => {
    const navigate = useNavigate();
    const { albumId } = useParams()

    const [album, update] = useState({
        albumTitle: "",
        albumImg: "",
        albumInfo: "",
        albumUrl: "",
        gameTypeId: "",
    });

    useEffect(
        () => {
            const fetchAlbum = async () => {
                const response = await fetch(`http://localhost:8088/albums/${albumId}`)
                const albumObject = await response.json()
                update(albumObject)
            }
            fetchAlbum()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const form = document.getElementById(`albumEdit`)


        const albumToSendToAPI = {
            albumTitle: album.albumTitle,
            albumImg: album.albumImg,
            albumInfo: album.albumInfo,
            albumUrl: album.albumUrl,
            gameTypeId: album.gameTypeId,
        };
        if (form.checkValidity()) {
            const sendAlbum = async () => {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(albumToSendToAPI)
                }
                await fetch(`http://localhost:8088/albums/${albumId}`, options)
                navigate(`/albums/${albumId}`)
            }
            sendAlbum()
        } else {
            window.alert("Please fill out the entire form")
        }
    }
    return (
        <Container className="d-grid h-100, centerItems">
            <Form style={{ color:"white" }} className="text-center formBackground" id="albumEdit">
                <h2 className="albumDetailsTitle">Edit Album</h2>

                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="type">Enter album Type:</Form.Label>
                    <Form.Select
                        required
                        autoFocus
                        value={album.gameTypeId}
                        onChange={(evt) => {
                            const copy = { ...album };
                            copy.gameTypeId = parseInt(evt.target.value);
                            update(copy);
                        }}
                    >
                        <option>Video Game Catagories</option>
                        <option value="1">Adventure</option>
                        <option value="2">Retro</option>
                        <option value="3">FPS</option>
                        <option value="4">Story/RPG</option>
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Enter album title:</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type="text"
                        placeholder="Album Title"
                        value={album.albumTitle}
                        onChange={(evt) => {
                            const copy = { ...album };
                            copy.albumTitle = evt.target.value;
                            update(copy);
                        }}
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Enter album description:</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        as="textarea"
                        placeholder="Album Description"
                        value={album.albumInfo}
                        onChange={(evt) => {
                            const copy = { ...album };
                            copy.albumInfo = evt.target.value;
                            update(copy);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="photoUrl">Enter photo URL:</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type="url"
                        value={album.albumImg}
                        name="photoUrl"
                        id="url"
                        placeholder="https://example.com"
                        pattern="https://.*"
                        size="30"
                        onChange={(evt) => {
                            const copy = { ...album };
                            copy.albumImg = evt.target.value;
                            update(copy);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="playlistUrl">Enter playlist URL:</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type="url"
                        value={album.albumUrl}
                        name="playlistUrl"
                        id="url"
                        placeholder="https://example.com"
                        pattern="https://.*"
                        size="30"
                        onChange={(evt) => {
                            const copy = { ...album };
                            copy.albumUrl = evt.target.value;
                            update(copy);
                        }}
                    />
                </Form.Group >
                <div className="formButtons">
                    <Button className="glow-on-hover"
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        variant="dark"
                    >
                        Submit Edit
                    </Button >
                    <Button className="glow-on-hover"
                        onClick={() => { navigate(`/`); }}
                        variant="dark"
                    >
                        Cancel
                    </Button  >
                </div>
            </Form>
        </Container>
    );
    
};
