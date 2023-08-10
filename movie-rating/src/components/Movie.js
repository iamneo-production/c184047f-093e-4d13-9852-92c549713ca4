import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function MovieCard({ movie }) {
  return (
    <Card style={{ width: "200px", margin: "10px", padding: "10px" }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.imagePath} // Assuming your movie object has an "imagePath" field
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">
          <Link to={`/movies/${movie.id}/reviews`}>{movie.title}</Link>
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
