import "./Movie.css";

const Movie = (props) => {
    const { movie } = props;
    return (
        <div className='card'>
            <h3>Name: {movie.title}</h3>
            <p>Rating: {movie.rating}</p>
        </div>
    );
};

export default Movie;
