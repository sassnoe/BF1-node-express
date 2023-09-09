// ========== IMPORTS ========== //
import express from "express";
import cors from "cors";
import { getArtists, getArtistsID, postArtists, putArtist, deleteArtist } from "./controllers.js";

const app = express();
const port = 3333;

// express().listen/get/post/put/delete functionality
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("yahuu");
});

app.get("/artists", getArtists);

app.get("/artists/:id", getArtistsID);

app.post("/artists", postArtists);

app.put("/artists/:id", putArtist);

app.delete("/artists/:id", deleteArtist);
