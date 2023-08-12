import "./MovieDetails.css";
import { useState, useEffect } from "react";
import StarRating from "./StarRating.js"
import img from '../assets/mock-data/images/gabbarsingh.jpg'
import { useSelector, useDispatch } from "react-redux";
// import { getAllMovies } from "../redux/MovieSlice";
import { getUserDetails } from "../redux/UserReducer";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { getAllMovies } from "../redux/MovieSlice";

export default function MovieDetails() {
    const dispatch = useDispatch();
    // const movies = useSelector((state) => state.movie.movies);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [movieDetail, setMovieDetail] = useState({});
    const [feedback, setFeedback] = useState({ userAlreadyRated: false, userFeedbackFlag: false });
    const { id } = useParams();
    const userDetail = useSelector((state) => state.user.user)

    function submitReview() {
        let updatedMovieDetail = {};
        if (movieDetail.reviews && movieDetail.reviews.length > 0) {
            let totalRating = 0;
            movieDetail.reviews.forEach(ele => {
                totalRating = totalRating + ele.rating;
            })
            const updatedRating = (totalRating + userRating) / (movieDetail.reviews.length + 1);
            if (feedback.userAlreadyRated) {
                const movieReviews = movieDetail.reviews;
                movieReviews.forEach(ele => {
                    if (ele.email === userDetail[0].email) {
                        ele.rating = userRating;
                        ele.review = (userReview)
                    }
                })
                setMovieDetail((prevState) => ({
                    ...prevState,
                    rating: updatedRating, reviews: movieReviews
                }))
            } else {
                movieDetailObjGenerator(userRating, true);
            }
            updatedMovieDetail = movieDetail;
        }
        else {
            movieDetailObjGenerator();
            updatedMovieDetail = movieDetail;
            console.log(updatedMovieDetail)  // API call
        }
        setFeedback({ userAlreadyRated: true, userFeedbackFlag: true })
    }
    const movieDetailObjGenerator = (ratingVal, ratingSent = false) => {
        const userReviewData =
        {
            name: userDetail[0].name,
            email: userDetail[0].email,
            rating: userRating,
            review: (userReview)
        }
        if (ratingSent === true) {
            setMovieDetail((prevState) => ({
                ...prevState,
                rating: ratingVal,
                reviews: movieDetail.reviews.concat(userReviewData)
            }))
        } else {

            setMovieDetail((prevState) => ({
                ...prevState,
                rating: userRating,
                reviews: movieDetail.reviews.concat((userReviewData))
            }))
        }
    }
    useEffect(() => {
        const emailId = localStorage.getItem('emailId')
        if (typeof userDetail === 'object' && Object.keys(userDetail).length === 0) {
            dispatch(getUserDetails({ email: emailId }));
        }
        axios.get(`http://localhost:8080/api/movies/${id}`).then((res => {
            setMovieDetail(res.data)
            if (res.data.reviews && res.data.reviews.length > 0) {
                const userReviewData = res.data.reviews.find(ele => ele.email === emailId);
                if (userReviewData && Object.keys(userReviewData).length > 0) {
                    setFeedback({ userAlreadyRated: true, userFeedbackFlag: true });
                    setUserRating(userReviewData.rating);
                    setUserReview(userReviewData.review);
                    // const userReviewIndex = res.data.reviews.findIndex(ele => ele.email === emailId);
                    // if (res.data.reviews.length > 1) {
                    //     setMovieDetail((prevState) => ({
                    //         ...prevState,
                    //         reviews: res.data.reviews.splice(userReviewIndex, 1)[0]
                    //     }));
                    // }
                    console.log(userDetail)

                }

            }
        })).catch(err => console.log(err))
    }, [id, dispatch, userDetail]);

    // const movieId = parseInt(id);
    // const movieDetailData = movies.find(movie => movie.id === movieId);
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '40px 40px 40px 40px', width: '100%', minHeight: '100vh' }}>
            <br />
            <table >
                <tbody>
                    <tr>
                        <td>
                            <img src={img} alt={`${movieDetail.title} poster`} height="300" width="300" />
                        </td>
                        <td className="moviedata">
                            <div ><h3 className="movie-title">{movieDetail.title}</h3></div>
                            <div className="movie-info">
                                <span className="movie-detail-title">Released Year 🗓 :</span> {movieDetail.year}
                            </div>
                            <div className="synopsis-container">
                                <div className="movie-detail-title" id="synopsis">Synopsis :</div>
                                <div className="movie-description">{movieDetail.synopsis}</div>
                            </div>
                            <div className="movie-info">
                                <span className="movie-detail-title">  Overall Rating ⭐️ :</span> {movieDetail.rating}
                            </div>
                            <br />
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            {< div className="user-review-rating">
                {feedback.userFeedbackFlag === false ? (
                    <>
                        <div className="rr-title title-align" >User Ratings & review</div>
                        <div className="rating" >
                            <div className="rr-container">
                                <div className="rating-container">
                                    <div className="feedback-title">Rating</div>
                                    <StarRating maxRating={5} size={24} onSetRating={setUserRating} defaultRating={userRating} />
                                </div>
                                <div className="review-container">
                                    <div className="feedback-title"> Review</div>
                                    <textarea className="review" value={userReview} placeholder="write your review"
                                        onChange={(e) => setUserReview(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="submit-button-container">
                            {feedback.userAlreadyRated && <button className="button-class cancel-button" onClick={() => {
                                setFeedback((prevState) => ({
                                    ...prevState,
                                    userFeedbackFlag: true
                                }));
                            }}>Cancel</button>}
                            <button className=" button-class submit-button" onClick={submitReview}>{feedback.userAlreadyRated === false ? 'Submit' : 'Update'}</button>
                        </div>
                    </>) : (
                    <div className="rating-review-view-section">
                        <div className="rr-title"> User Ratings & review - view
                            <i className="bi bi-pencil-fill edit-icon" onClick={() => {
                                setFeedback((prevState) => ({
                                    ...prevState,
                                    userFeedbackFlag: false
                                }));
                            }}></i>
                        </div>
                        <div className="feedback-title">  <span className="movie-detail-title">   Rating ⭐️ :</span>   {userRating}</div>
                        <div className="feedback-title">{userReview}</div>
                    </div>
                )}
            </div>}
            <div className="user-reviews" >
                <div className="rr-title">Reviews</div>
                {(movieDetail.reviews && movieDetail.reviews.length > 0) &&
                    (
                        movieDetail.reviews.map((ele, ind) => (
                            <div key={ind} className="review-list">
                                <div className="review-list-element"> <span className="movie-detail-title review-list-element"> User  :</span> {ele.name}</div>

                                <div className="review-list-element"><span className="movie-detail-title"> User rating  : </span> {Array.from({ length: ele.rating }, (_, starIndex) => (
                                    <span key={starIndex}>⭐️</span>
                                ))}</div>
                                <div className="review-data" >  {(ele.review)}</div>
                            </div>
                        ))
                    )
                }
            </div>
        </div >
    )
}

