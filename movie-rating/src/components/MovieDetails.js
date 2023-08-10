import "./MovieDetails.css";
import {useState} from "react";
const movies=[
    { id: 1,
      title: "Inception",
      year: 2010,
      poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      rating: 8.8,
      reviews: [
        {
          rating: 9.0,
          review: "A complex movie",
          user: "balajimurali",
          email: "balajimurali1999@gmail.com"
        },
        {
            rating: 8.8,
            review: "Thriller",
            user: "tammayya",
            email:"tammayyaarava789@gmail.com"
        }
      ]},
      {
        id: 2,
        title: "The Shawshank Redemption",
        year: 1994,
        synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3,
        reviews: [
        {
          rating: 9.0,
          review: "A good movie",
          user: "balajimurali",
          email: "balajimurali1999@gmail.com"
        }
      ]},
      {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        synopsis: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        rating: 9.0,
        reviews: []
      }
    ]
export default function MovieDetails(){
    const [isOpen,setOpen]=useState(true);
    const movie=movies.at(0);
    return (
        <main>
            <button className="toggle" onClick={()=>setOpen(!isOpen)}> Go To Back </button>
            {isOpen &&( <div>
            <br/><br/>
            <table className="#table">
                <tr>
                    <td colspan="2"><img src={movie.poster} alt={`${movie.title} poster`} height="200" width="200" /></td>
                </tr>
                <tr>
                    <td><h3>Movie Name</h3></td>
                    <td><i><b>{movie.title}</b></i></td>
                </tr>
                <tr>
                    <td><h3>Movie Released Year</h3></td>
                    <td><span>🗓</span>
                        <span>{movie.year}</span>
                    </td>
                </tr>
                <tr>
                    <td><h3>Movie Description</h3></td>
                    <td>{movie.synopsis}</td>
                </tr>
                <tr>
                    <td><h3>Overall Rating</h3></td>
                    <td><span>⭐️</span>
                        <span>{movie.rating}</span>
                    </td>
                </tr>
                <tr>
                    <td><h3>Reviews</h3></td>
                    <td>{movie.reviews.map(r=><Review r={r}/>)}</td>
                </tr>
            </table>
            </div>)}
        </main>
    )
}
function Review({r}){
    return(
        <p>
            <span><b>{r.user}:</b></span>
            <span>{r.rating}</span><br/><span>{r.review}</span>
            <br/> <br/> <br/>
        </p>
    )
}