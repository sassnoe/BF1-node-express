// ========== GLOBAL VARIABLES ========== //
const endpoint = "http://localhost:3333";
let selectedArtist;

// ========== INIT APP ========== //
window.addEventListener("load", initApp);

function initApp() {
  // Initialize grid view with artists
  updateArtistsGrid();
  // Eventlisteners
  document.querySelector("#form-create").addEventListener("submit", createArtist);
  document.querySelector("#form-update").addEventListener("submit", updateArtist);
}

// ========== READ ========== //
async function updateArtistsGrid() {
  const artists = await readArtists();
  displayArtists(artists);

  genreFilter(artists);
}

function genreFilter(artists) {
  const selectedGenre = document.querySelector("#genreFilter").value;
  let filteredArtists = artists;
  if (selectedGenre !== "all") {
    filteredArtists = filteredArtists.filter((artist) => (artist.genre = selectedGenre));
  }

  document.querySelector("#btnFilterSort").addEventListener("change", updateArtistsGrid);
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
                <p>Genres: ${artist.genres}</p>
                 <div class="btns">
                    <button class="btn-update-artist">Update</button>
                    <button class="btn-delete-artist">Delete</button>
                </div>
            </article>
        `
    );
    document.querySelector("#artists-grid article:last-child .btn-delete-artist").addEventListener("click", () => deleteArtist(artist.id));
    document.querySelector("#artists-grid article:last-child .btn-update-artist").addEventListener("click", () => selectArtist(artist));
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

// ========== SORT ========== //

// async function showSortedArtist() {
//   const listOfProperties = await readArtists();
//   sortByProperty(listOfProperties);
// }

// function sortByProperty(listOfProperties) {
//   const sortedArtists = listOfProperties.sort(sortActiveSince);
// }

// function sortActiveSince(a, b) {
//   return a.activeSince.localeCompare(b.activeSince);
// }

function sortingTest() {}
