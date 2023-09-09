// ========== GLOBAL VARIABLES ========== //
const endpoint = "http://localhost:3333";
let selectedArtist;
let favoriteList = [];

// ========== INIT APP ========== //
window.addEventListener("load", initApp);

async function initApp() {
  const artists = await readArtists();
  // Initialize grid view with artists
  updateArtistsGrid(artists);
  // Eventlisteners
  document.querySelector("#form-create").addEventListener("submit", createArtist);
  document.querySelector("#form-update").addEventListener("submit", updateArtist);
  document.querySelector("#genreFilter").addEventListener("change", () => genreFilter(artists));
  document.querySelector("#sortBy").addEventListener("change", () => chooseSort(artists));
  document.querySelector("#allArtists").addEventListener("click", () => displayArtists(artists));
  document.querySelector("#favoritedArtists").addEventListener("click", () => displayArtists(favoriteList));
}

// ========== READ ========== //
async function updateArtistsGrid(artists) {
  displayArtists(artists);
}

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

function displayArtists(list) {
  document.querySelector("#artists-grid").innerHTML = "";

  for (const artist of list) {
    document.querySelector("#artists-grid").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
            <article>
                <img src="${artist.image}">
                <h2>${artist.name}</h2>
                <p>Born ${artist.birthdate}</p>
                <p>Active since: ${artist.activeSince}</p>
                <p>Genres: ${artist.genres}</p>
                <p>Artist labels: ${artist.labels}</p>
                <p>Artist website: ${artist.website}</p>
                <br/>
                <p>${artist.shortDescription}</p>
                 <div class="btns">
                    <button class="btn-update-artist">Update</button>
                    <button class="btn-delete-artist">Delete</button>
                    <button class="btn-favorite-artist">Favorite</button>

                </div>
            </article>
        `
    );
    document.querySelector("#artists-grid article:last-child .btn-delete-artist").addEventListener("click", () => deleteArtist(artist.id));
    document.querySelector("#artists-grid article:last-child .btn-update-artist").addEventListener("click", () => selectArtist(artist));
    document.querySelector("#artists-grid article:last-child .btn-favorite-artist").addEventListener("click", () => addToFavorites(artist));
  }
}

// ========== CREATE ========== //
async function createArtist(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const genres = event.target.genres.value;
  const birthdate = event.target.birthdate.value;
  const image = event.target.image.value;

  // Add a new artist
  const newArtist = { name, genres, birthdate, image };
  const artistAsJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistAsJson,
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // if success, update the artists grid
    updateArtistsGrid();
    // and scroll to top
    scrollToTop();
  }
}

// ========== UPDATE ========== //
function selectArtist(artist) {
  // Set global variables
  selectedArtist = artist;
  const form = document.querySelector("#form-update");

  form.name.value = artist.name;
  form.birthdate.value = artist.birthdate;
  form.genres.value = artist.genres;
  form.image.value = artist.image;
  form.scrollIntoView({ behavior: "smooth" });
}

async function updateArtist(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const birthdate = event.target.birthdate.value;
  const genres = event.target.genres.value;
  const image = event.target.image.value;

  // Update artist
  const artistToUpdate = { name, birthdate, genres, image };
  const artistAsJson = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: artistAsJson,
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    // if success, update the artists grid
    updateArtistsGrid();
    // and scroll to top
    scrollToTop();
  }
}

// ========== DELETE ========== //
async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // if success, update the artists grid
    updateArtistsGrid();
  }
}

// ========== EVENTS ========== //
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========== SORT & FILTER ========== //
function genreFilter(artists) {
  const selectedGenre = document.querySelector("#genreFilter").value;
  console.log(artists);
  console.log(selectedGenre);
  if (selectedGenre == "all") {
    displayArtists(artists);
  } else {
    let filteredArtists = artists.filter((artist) => artist.genres.toLowerCase().includes(selectedGenre.toLowerCase()));
    displayArtists(filteredArtists);
    console.log(filteredArtists);
  }
}

function chooseSort(artists) {
  const selectedSort = document.querySelector("#sortBy").value;
  switch (selectedSort) {
    case "oldest":
      artists.sort(sortByActiveSince);
      displayArtists(artists);
      break;
    case "newest":
      artists.sort(sortByActiveSince).reverse();
      displayArtists(artists);
      break;
  }
}

function sortByActiveSince(a, b) {
  return a.activeSince - b.activeSince;
}

// ========== FAVORITE ========== //
function addToFavorites(artist) {
  let favoriteString = JSON.stringify(favoriteList);
  if (favoriteString.includes(artist.id)) {
    alert("Artist is already on favorite list!");
  } else {
    favoriteList.push(artist);
    alert("Artist added to favorite list.");
  }
  console.log(favoriteList);
}
