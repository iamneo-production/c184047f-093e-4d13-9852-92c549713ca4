import "./MovieDetails.css";
import {useState} from "react";
import StarRating from "./StarRating.js"
const movies=[
    { id: 1,
      title: "Inception",
      year: 2010,
      poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      rating: 4,
      reviews: [
        {
          rating: 4,
          review: "A complex movie",
          user: "balajimurali",
          email: "balajimurali1999@gmail.com"
        },
        {
            rating: 4,
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
        rating: 5,
        reviews: [
        {
          rating: 5,
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
        rating: 5,
        reviews: []
      }
    ]
export default function MovieDetails(){
    const [isOpen,setOpen]=useState(true);
    const [userRating, setUserRating] = useState("");
    const [userReview,setUserReview]=useState("");
    const movie=movies.at(0);
    function submitReview(){
        console.log(userRating+" "+userReview);
        setUserRating("");
        setUserReview("");
    }
    return (
        <main>
            <button className="toggle" onClick={()=>setOpen(!isOpen)}> Go To Back </button>
            {isOpen &&( <div>
            <br/><br/>
            <table className="#table">
                <tr>
                    <td>
                        <img src={movie.poster} alt={`${movie.title} poster`} height="200" width="200" />
                    </td>
                    <td>
                        <p><i>You're feedback !</i>
                        <div className="rating">
                        <StarRating maxRating={5} size={24} onSetRating={setUserRating}/>
                        <input className="review" type="text" placeholder="write your review" value={userReview}
                            onChange={(e)=>setUserReview(e.target.value)}/>
                        </div>
                        <button onClick={submitReview}>submit</button>
                        </p> 
                    </td>
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