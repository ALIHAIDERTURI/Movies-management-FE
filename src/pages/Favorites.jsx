import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import { toggleFavorite, getFavorites } from '../services/api'; // Import from api.js
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ClipLoader } from 'react-spinners';

const Favorites = () => {
  const { user } = useContext(AuthContext);
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
        const data = await getFavorites(); // Use the axios wrapper here
        setFavorites(data);
      } catch (error) {
        setError(error.message);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleToggleFavorite = async (movieId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authorization token required');
      return;
    }

    try {
      const result = await toggleFavorite(movieId);
      setFavorites((prevFavorites) =>
        prevFavorites.some((movie) => movie.movieId === movieId)
          ? prevFavorites.filter((movie) => movie.movieId !== movieId)
          : [...prevFavorites, result.favorite]
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loader">
      <ClipLoader color="#3498db" loading={loading} size={50} />
    </div>;
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
                  ? <MdOutlineFavorite size={'30px'} color="red" />
                  : <MdFavoriteBorder size={'30px'} color="red" />}
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
