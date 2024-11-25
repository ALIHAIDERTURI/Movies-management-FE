import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import AuthContext from '../Context/AuthContext'; // Assuming AuthContext is correctly set up
import { toggleFavorite } from '../services/api'; // Import the API utility function
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ClipLoader } from 'react-spinners';

const Favorites = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token required');
        }

        const response = await fetch('/api/v1/movies/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setFavorites(data); // Set favorites if they are an array
        } else {
          throw new Error('Favorites data is malformed');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(error.message);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]); // Dependency on user to reload on user change

  // Handle add/remove favorite
  const handleToggleFavorite = async (movieId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authorization token required');
      return;
    }

    try {
      const result = await toggleFavorite(movieId, token); // Using the toggleFavorites function
      console.log(result); // Handle result if needed
      // Update the favorites list by re-fetching or updating state
      setFavorites((prevFavorites) =>
        prevFavorites.some((movie) => movie.movieId === movieId)
          ? prevFavorites.filter((movie) => movie.movieId !== movieId)
          : [...prevFavorites, result.favorite] // Add to list if not already in favorites
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loader">
    <ClipLoader color="#3498db" loading={loading} size={50} />
  </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='m-4'>
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.movieId} className="relative border rounded-lg bg-gray-100">
              <Link to={`/detail/${movie.movieId}`} className="block">
                <img
                  src={movie.imageUrl.replace('100x100', '400x400')}
                  alt={movie.title}
                  className="w-full mb-2"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{movie.title}</h2>
                  <p>{movie.genre}</p>
                  <p className="text-green-500">${movie.price}</p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when toggling favorite
                  handleToggleFavorite(movie.movieId);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white"
              >
                {favorites.some((fav) => fav.movieId === movie.movieId)
                  ? <MdOutlineFavorite size={'30px'} color="red" /> : <MdFavoriteBorder size={'30px'} color="red" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite movies found. Start adding some!</p>
      )}
    </div>
  );
};

export default Favorites;

