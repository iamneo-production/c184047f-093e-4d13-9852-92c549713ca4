import React, { useState } from 'react';
import "./Movie.css";

const Movie = (props) => {
    const { movie } = props;
    return (
        <div className='card'>
            <h3>Name: {movie.title}</h3>
            <p>Rating: {rating}</p>
        </div>
    );
};

export default Movie;
