"use client";

import Image from "next/image";
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
  Genre?: string;
  Actors?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: { Source: string; Value: string }[];
  Released?: string;
  Runtime?: string;
  BoxOffice?: string;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
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
    console.log(data);
    if (data.Response === "True") {
      setResults(data.Search);
      setTotalResults(data.totalResults);
    } else {
      setResults([]);
      setTotalResults(0);
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

  const sortResults = (order: 'asc' | 'desc') => {
    const sortedResults = [...results].sort((a, b) => {
      return order === 'asc'
        ? parseInt(a.Year) - parseInt(b.Year) // Older to newer
        : parseInt(b.Year) - parseInt(a.Year); // Newer to older
    });
    setResults(sortedResults);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl text-dark-500">Movie Search</h1>
        <div className="flex items-center">
          <input
            className="shadow-md text-lg rounded-l-lg w-72 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button
            className="bg-purple-800 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-r-lg flex items-center"
            type="button"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 1a10 10 0 100 20 10 10 0 000-20zm7 10a7 7 0 11-14 0 7 7 0 0114 0zM21 21l-4.35-4.35"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 text-xl mt-2">
          Search for your favorite movies and find detailed information about
          them. Click on the movie for more details.
        </p>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => sortResults('asc')}
          >
            Sort Old to New
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => sortResults('desc')}
          >
            Sort New to Old
          </button>
        </div>
      </div>
      {results.length === 0 && totalResults === 0 && (
        <div className="flex justify-center mt-8">
          <Image
            src="/undraw_home-cinema_jdm1.svg"
            alt="Home Cinema"
            className="border-2 w-120 h-auto"
            width={384}
            height={240}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-16 p-8">
        {results.map((movie) => (
          <div
            key={movie.imdbID}
            className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer transition duration-300 hover:bg-gray-300 relative group"
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <h3 className="text-xl text-purple-800">
              {movie.Title} ({movie.Year})
            </h3>
            <Image
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/generic-movie-poster.jpg"
              }
              alt={movie.Title}
              className="object-contain rounded-lg w-full h-120 p-2"
              width={300}
              height={192}
              unoptimized={!movie.Poster.startsWith("http")}
            />
            <div className="absolute inset-x-0 bottom-50 flex justify-center">
              <p className="bg-purple-800 bg-opacity-5 text-white p-4 rounded-lg text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                More Info
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4 p-8 cursor-pointer">
        <p className="mb-4">Total Results: {totalResults}</p>{" "}
        <div className="flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-l"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-r"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>

      <div id="app-modal">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="bg-white border-3 rounded-lg w-11/12 sm:w-1/2 max-w-2xl mx-auto p-4"
          overlayClassName="fixed inset-0 text-gray flex justify-center items-center"
        >
          {selectedMovie && (
            <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
              {" "}
              <h1 className="text-2xl text-purple-800 mb-4">
                {selectedMovie.Title} ({selectedMovie.Year})
              </h1>
              <div>
                <Image
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                  className="object-cover border-3 rounded-lg"
                  width={300}
                  height={192}
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
    </>
  );
};

export default HomePage;
