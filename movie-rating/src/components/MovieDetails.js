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
    const [feedback,setFeedback]=useState(true);
    const movie=movies.at(0);
    function submitReview(){

        console.log(userRating+" "+userReview);
        setFeedback(false);
    }
    return (
        <main>
            <button className="toggle" onClick={()=>setOpen(!isOpen)}> Go To Back </button>
            {isOpen &&( <div>
            <br/>
                <table>
                    <tr>
                        <td>
                        <img src={movie.poster} alt={`${movie.title} poster`} height="400" width="500" />
                        </td>
                        <td className="moviedata">
                            <div><i><h3>{movie.title}</h3></i></div><br/>
                            <div><span>Released Year 🗓 </span>
                                <span>{movie.year}</span></div><br/>
                            <div>Movie Description : {movie.synopsis}</div><br/>
                            <div><span>Overall Rating ⭐️ </span>
                                 <span>{movie.rating}</span></div><br/>
                        </td>
                    </tr>
                </table>
                <hr/>
                {feedback ?(
                <p style={{textAlign:"center"}}><i>You're feedback !</i>
                    <div className="rating" style={{textAlign:"center"}}>
                        <StarRating maxRating={5} size={24} onSetRating={setUserRating}/>
                        <textarea className="review"  value={userReview} placeholder="write your review"
                        onChange={(e)=>setUserReview(e.target.value)}></textarea>
                    </div>
                    <button onClick={submitReview}>submit</button>
                </p>):(
                    <p style={{textAlign:"center"}}>You're feedback submitted</p>
                )}  
                <hr/>
                <p style={{textAlign:"center"}}>
                <h3>Reviews</h3>
                {movie.reviews.map(r=><Review r={r}/>)}
                </p>
            </div>)}
        </main>
    )
}
function Review({r}){
    return(
        <p>
            <span><b>{r.user} &nbsp;&nbsp; </b>review : {r.rating}⭐️  &nbsp;&nbsp; {r.review}</span>
            <br/> <br/>
        </p>
    )
}
