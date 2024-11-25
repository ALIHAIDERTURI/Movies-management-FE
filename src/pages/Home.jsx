import React, { useEffect, useState } from 'react';
import { fetchMovies, toggleFavorite } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { ClipLoader } from 'react-spinners';
import { GrPrevious , GrNext } from "react-icons/gr";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(currentPage); 
        setMovies(data.movies || []); // Set the movies
        setTotalPages(data.totalPages || 1); // Set total pages
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage]); // The page number will trigger the useEffect again

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      const response = await toggleFavorite(movieId); // Call the API function to add/remove favorite
      console.log(response); // You can log the response to verify if it's working
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#3498db" loading={loading} size={50} />
      </div>
    );
  }

  if (!movies.length) {
    return <div>No movies found</div>;
  }

  return (
    <div className='mx-4'>
      <MovieGrid movies={movies} onAddToFavorites={handleAddToFavorites} /> {/* Pass the handler here */}

      <div className="flex justify-center items-center my-6 ">
        <button className='rounded-full bg-slate-400 hover:bg-blue-500 h-[40px] w-[40px] flex justify-center items-center me-2 ' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <GrPrevious size={'20px'} color='#fff' />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'rounded-full bg-slate-400 h-[20px] w-[20px] flex justify-center items-center mx-[5px] hover:bg-slate-400 ' : 'rounded-full bg-slate-300  h-[20px] w-[20px] flex justify-center items-center mx-[5px] hover:bg-slate-400' }
          >
            {index + 1}
          </button>
        ))}
        <button className='rounded-full bg-slate-400 hover:bg-blue-500 h-[40px] w-[40px] flex justify-center items-center ms-2' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages }>
          <GrNext size={'20px'} color='#fff' />
        </button>
      </div>
    </div>
  );
};

export default Home;
