import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Movies.css"; // Import the CSS file for MovieCard styles

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}/reviews`} style={{ textDecoration: "none" }}>
    <Card className="movie-card">
      <CardMedia
        component="img"
        width="200"
        height="300"
        image={require(`../assets/mock-data/images/${movie.imagePath}`)} // Assuming your movie object has an "imagePath" field
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">
          <Link style={{ textDecoration: "none"}} to={`/movies/${movie.id}/reviews`}>{movie.title}</Link>
        </Typography>
        <Typography variant="body2" marginTop={2}>
          {movie.year}
        </Typography>
        <Typography variant="body2" marginTop={2}>
          Rating: {movie.rating} ⭐️
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}

export default MovieCard;
