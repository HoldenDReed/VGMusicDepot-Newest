import { VGMusicDepot } from "./components/VGMusicDepot";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app"; // Import Firebase!!
import { firebaseConfig } from "./apiKeys"; // Import Your Config!!
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
firebase.initializeApp(firebaseConfig);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <VGMusicDepot />
  </BrowserRouter>
);
