import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../services/api"; // Import the getFavorites API method
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";


const MovieGrid = React.memo(({ movies, onAddToFavorites }) => {
  const [favorites, setFavoritesState] = useState([]);

  // Fetch favorites on component mount to sync state with backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavoritesState(data.favorites || []); // Sync favorites with backend
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
      }
    };
    fetchFavorites();
  }, []); // This will run only once when the component mounts

  const handleAddToFavorites = (movieId) => {
    setFavoritesState((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId];
      return updatedFavorites;
    });
    onAddToFavorites(movieId);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price === "number" && !isNaN(price)) {
      return price.toFixed(2); // Format to two decimal places
    }
    return "N/A"; // Fallback if price is not valid
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie, index) => (
        <div
          key={`${movie.trackId}-${index}`}
          className="relative border rounded-lg overflow-hidden bg-gray-100"
        >
          <Link className="" to={`/detail/${movie.trackId}`}>
            <img
              src={
                movie.artworkUrl100
                  ? movie.artworkUrl100.replace("100x100", "400x400")
                  : "fallback-image.jpg"
              }
              alt={movie.trackName}
              className="w-full mb-2"
              loading="lazy"
            />
           <div className=" p-4 pb-0">
           <h2 className="text-lg font-bold">{movie.trackName}</h2>
            <p>{movie.primaryGenreName}</p>
            <p className="text-green-500">
              ${formatPrice(movie.collectionPrice)}
            </p>
           </div>
          </Link>
          <button
            onClick={() => handleAddToFavorites(movie.trackId)}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white ${favorites.includes(
              movie.trackId 
            )}`}
          >
            {favorites.includes(movie.trackId) ? (
              <MdOutlineFavorite size={"30px"} color="red" />
            ) : (
              <MdFavoriteBorder size={"30px"} color="red" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
});

export default MovieGrid;
