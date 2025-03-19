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
    console.log(data);
    allMovies = data.movies;
    console.log(allMovies);

    renderMovies(allMovies);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderMovies(movies) {
  const container = document.getElementsByClassName("moviesContainer")[0];
  container.innerHTML = "";

  if (!Array.isArray(movies)) {
    console.error('"movies" not array:', movies);
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movieCard";

    const imgEl = document.createElement("img");
    imgEl.src = movie.img;

    const movieTitle = document.createElement("div");
    movieTitle.className = "movieTitle";
    movieTitle.innerHTML = `${movie.title}`;

    const movieYear = document.createElement("div");
    movieYear.className = "movieInfo";
    movieYear.innerHTML = `<strong>Year:</strong> ${movie.year}`;

    const movieGenre = document.createElement("div");
    movieGenre.className = "movieInfo";
    movieGenre.innerHTML = `<strong>Genre:</strong> ${movie.genre.join(", ")}`;

    const movieImdb = document.createElement("div");
    movieImdb.className = "movieInfo";
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
    .getElementsByClassName("searchInput")[0]
    .value.toLowerCase();
  const filtered = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput)
  );
  renderMovies(filtered);
}

fetchMovies();

document
  .getElementsByClassName("search")[0]
  .addEventListener("click", filterMovies);
document.addEventListener("keydown", function (event) {
  if (event === "Enter") {
    filterMovies();
  }
});
