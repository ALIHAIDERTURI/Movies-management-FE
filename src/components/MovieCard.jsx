import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.posterUrl.replace('100x100', '400x400')} alt={`${movie.title} poster`} />
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <p>Rating: {movie.rating}</p>
            </div>
        </div>
    );
};

export default MovieCard;