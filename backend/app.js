// ========== IMPORTS ========== //
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

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
  console.log(uuidv4());
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);
  response.json(artists);
});

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  // installed dependency called UUID that can generate unique ID's
  newArtist.id = uuidv4();
  console.log(newArtist);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  console.log(newArtist);
  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(newArtist);
});

app.put("/artists/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  let artistsToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  console.log(body);
  artistsToUpdate.image = body.image;
  artistsToUpdate.name = body.name;
  artistsToUpdate.birthdate = body.birthdate;
  artistsToUpdate.genres = body.genres;

  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const artistToDelete = artists.filter((artist) => artist.id == id);
  if (!artistToDelete) {
    response.status(404).json({ error: "404: Page not found!" });
  } else {
    const position = artists.indexOf(artistToDelete);
    artists.splice(position, 1);

    fs.writeFile("data.json", JSON.stringify(artists));

    response.json(artists);
  }
});
