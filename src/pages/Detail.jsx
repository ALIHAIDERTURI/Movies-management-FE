import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { ClipLoader } from 'react-spinners';

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`https://itunes.apple.com/lookup?id=${id}`);
      setMovie(data.results[0]);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (!movie){
    return(
      <div className="loader">
  <ClipLoader color="#3498db" loading={loading} size={50} />
</div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={movie.artworkUrl100.replace('100x100', '400x400')} alt={movie.trackName} className="w-full md:w-1/3" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.trackName}</h1>
          <p><strong>Genre:</strong> {movie.primaryGenreName}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Price:</strong> ${movie.trackPrice || 'N/A'}</p>
          <p className="mt-4">{movie.longDescription || 'No description available.'}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        {movie.previewUrl ? (
          <ReactPlayer url={movie.previewUrl} controls width="100%" height="100%" />
        ) : (
          <p>No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
