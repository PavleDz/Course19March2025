const URL = "https://jsonblob.com/api/jsonBlob/1351950892655632384/";
let allMovies = [];

async function fetchMovies() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(
        `Error in fetching: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    allMovies = data.movies;

    renderMovies(allMovies);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderMovies(movies) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (!Array.isArray(movies)) {
    console.error('"movies" not array:', movies);
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const imgEl = document.createElement("img");
    imgEl.src = movie.img || "";

    const movieTitle = document.createElement("div");
    movieTitle.className = "movieTitle";
    movieTitle.innerHTML = `${movie.title}`;

    const movieYear = document.createElement("div");
    movieYear.className = "movie-info";
    movieYear.innerHTML = `<strong>Year:</strong> ${movie.year}`;

    const movieGenre = document.createElement("div");
    movieGenre.className = "movie-info";
    movieGenre.innerHTML = `<strong>Genre:</strong> ${movie.genre.join(", ")}`;

    const movieImdb = document.createElement("div");
    movieImdb.className = "movie-info";
    movieImdb.innerHTML = `<strong>IMDB rating:</strong> ${movie.imdb_rating}`;

    card.appendChild(imgEl);
    card.appendChild(movieTitle);
    card.appendChild(movieYear);
    card.appendChild(movieGenre);
    card.appendChild(movieImdb);

    container.appendChild(card);
  });
}

function filterMovies() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filtered = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput)
  );
  renderMovies(filtered);
}

fetchMovies();

document.getElementById("searchBtn").addEventListener("click", filterMovies);
