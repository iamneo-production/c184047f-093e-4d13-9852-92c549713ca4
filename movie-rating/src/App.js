import {useEffect, useState} from "react";
import './App.css';

const movieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function App() {
  const [movies,setMovies]=useState(movieData);
  const [query,setQuery]=useState("");

  useEffect(()=>{
    setMovies(movies.filter(m=>m.Title.includes(query)))
  },[query])
  return (
    <>
      <NavBar query={query} setQuery={setQuery}/>

      <main className="main">
        <div>
          {movies?.map(m=>(
            <li key={m.imdbID}>
              <img src={m.Poster} alt={`${m.Title} image`} width="100" height="100" />
              <h3>{m.Title}</h3>
              <p>{m.Year}</p>
              <br/>
            </li>
          ))}
        </div>
      </main>
    </>
  );
}

function NavBar({query,setQuery}){
  return (
    <nav className="nav-bar">
        <h1 style={{color:"red"}}>Movie Rating App 🍿</h1>
        <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>
    </nav>
  );
}