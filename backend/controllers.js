import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

async function getArtists(request, response) {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);
  response.json(artists);
}

async function getArtistsID(request, response) {
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const id = request.params.id;
  let artist = artists.find((artist) => artist.id === id);

  response.json(artist);
}

async function postArtists(request, response) {
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
}

async function putArtist(request, response) {
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
}

async function deleteArtist(request, response) {
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
}

export { getArtists, getArtistsID, postArtists, putArtist, deleteArtist };
