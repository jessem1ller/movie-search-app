"use client";

// import Image from 'next/image';
import { useEffect, useState } from "react";
import Modal from "react-modal";

const API_KEY = "94c6a856";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Director?: string;
  Plot?: string;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#app-modal");
  }, []);

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&page=${currentPage}&apikey=${API_KEY}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      setResults(data.Search);
    } else {
      setResults([]);
    }
  };

  const handleMovieClick = async (imdbID: string) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
    );
    const data = await response.json();
    setSelectedMovie(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    handleSearch();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
      <h1 className="text-3xl text-dark-500">Movie Search</h1>
      <input
        className="shadow-lg text-lg rounded-lg ring ring-purple-200 focus:ring-2 focus:ring-purple-600 box-sizing: content-box ..."
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <input />
      <button
        className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded-lg..."
        onClick={handleSearch}
      >
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {results.map((movie) => (
          <div key={movie.imdbID} style={{ marginBottom: "10px" }}>
            <h3
              onClick={() => handleMovieClick(movie.imdbID)}
              className="text-xl text-purple-600 hover:text-purple-800 cursor-pointer"
            >
              {movie.Title} ({movie.Year})
            </h3>
            <div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="object-cover border-3 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <div id="app-modal">
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          {selectedMovie && (
            <div>
              <h2>
                {selectedMovie.Title} ({selectedMovie.Year})
              </h2>
              <div>
                <img
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                  className="object-cover border-3 rounded-lg"
                />
              </div>
              <p>
                <strong>Year:</strong> {selectedMovie.Year}
              </p>
              <p>
                <strong>Genre:</strong> {selectedMovie.Genre}
              </p>
              <p>
                <strong>Actors:</strong> {selectedMovie.Actors}
              </p>
              <p>
                <strong>Language:</strong> {selectedMovie.Language}
              </p>
              <p>
                <strong>Country:</strong> {selectedMovie.Country}
              </p>
              <p>
                <strong>Awards:</strong> {selectedMovie.Awards}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {selectedMovie.Ratings?.map((rating) => (
                  <span key={rating.Source}>
                    {rating.Source}: {rating.Value}
                  </span>
                ))}
              </p>
              <p>
                <strong>Released:</strong> {selectedMovie.Released}
              </p>
              <p>
                <strong>Runtime:</strong> {selectedMovie.Runtime}
              </p>
              <p>
                <strong>Box Office:</strong> {selectedMovie.BoxOffice}
              </p>
              <p>
                <strong>Director:</strong> {selectedMovie.Director}
              </p>
              <p>
                <strong>Plot:</strong> {selectedMovie.Plot}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
