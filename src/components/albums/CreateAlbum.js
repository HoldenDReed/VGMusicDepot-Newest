import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import "./Albums.css"
import Button from "react-bootstrap/Button";
export const CreateAlbum = () => {
  const [newAlbum, update] = useState({
    albumTitle: "",
    albumImg: "",
    albumInfo: "",
    albumUrl: "",
    gameTypeId: 1,
  });

  const navigate = useNavigate();

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const form = document.getElementById(`albumCreate`)

    const albumToSendToAPI = {
      albumTitle: newAlbum.albumTitle,
      albumImg: newAlbum.albumImg,
      albumInfo: newAlbum.albumInfo,
      albumUrl: newAlbum.albumUrl,
      gameTypeId: newAlbum.gameTypeId,
    };
    if (form.checkValidity()) {
      return fetch(`http://localhost:8088/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumToSendToAPI),
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/`);
        });
    } else {
      window.alert("Please fill out the entire form")
    }
  }
  return (
    <Container className="d-grid h-100, centerItems">
      <Form style={{ color:"white" }} className="text-center formBackground" id="albumCreate">
        <h2 className="albumDetailsTitle">New Album Form</h2>

        <Form.Group className="mb-3" >
          <Form.Label htmlFor="type">Enter album Type:</Form.Label>
          <Form.Select
            required
            autoFocus
            value={newAlbum.gameTypeId}
            onChange={(evt) => {
              const copy = { ...newAlbum };
              copy.gameTypeId = parseInt(evt.target.value);
              update(copy);
            }}
          >
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
            value={newAlbum.albumTitle}
            onChange={(evt) => {
              const copy = { ...newAlbum };
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
            value={newAlbum.albumInfo}
            onChange={(evt) => {
              const copy = { ...newAlbum };
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
            value={newAlbum.albumImg}
            name="photoUrl"
            id="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
            onChange={(evt) => {
              const copy = { ...newAlbum };
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
            value={newAlbum.albumUrl}
            name="playlistUrl"
            id="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
            onChange={(evt) => {
              const copy = { ...newAlbum };
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
            Submit New Album
          </Button >
          <Button className="glow-on-hover"
            onClick={() => {
              navigate(`/`);
            }}
            variant="dark"
          >
            Cancel
          </Button  >
        </div>
      </Form>
    </Container>
  );
};
