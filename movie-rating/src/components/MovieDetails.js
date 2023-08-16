import "./MovieDetails.css";
import { useState, useEffect } from "react";
import StarRating from "./StarRating.js"
import { useSelector } from "react-redux";
// import { getAllMovies } from "../redux/MovieSlice";
// import { getUserDetails } from "../redux/UserReducer";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";

// import { getAllMovies } from "../redux/MovieSlice";

export default function MovieDetails() {
    // const movies = useSelector((state) => state.movie.movies);
    const emailId = localStorage.getItem('emailId');

    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [movieDetail, setMovieDetail] = useState({});
    const [feedback, setFeedback] = useState({ userAlreadyRated: false, userFeedbackFlag: false });
    const { id } = useParams();
    const userDetail = useSelector((state) => state.user.user)

    function submitReview() {
        // let updatedMovieDetail = {};
        // if (movieDetail.reviews && movieDetail.reviews.length > 0) {
        //     let totalRating = 0;
        //     const movieReviews = movieDetail.reviews;

        //     if (feedback.userAlreadyRated) {
        //         movieReviews.forEach(ele => {
        //             if (ele.email === emailId) {
        //                 ele.rating = userRating;
        //                 ele.review = (userReview)
        //             } else {
        //                 totalRating = totalRating + ele.rating;
        //             }
        //         })
        //         let updatedRating = (totalRating + userRating) / (movieDetail.reviews.length);
        //         movieDetail[`rating`] = updatedRating.toFixed(1);
        //     } else {
        //         movieReviews.forEach(ele => {
        //             totalRating = totalRating + ele.rating;
        //         });
        //         const newTotalRating = totalRating + userRating;
        //         const newTotalReviews = movieReviews.length + 1;
        //         const updatedRating = (newTotalRating / newTotalReviews); 
        //         movieDetail[`rating`] = updatedRating.toFixed(1)
        //         movieDetailObjGenerator(userRating, true);
        //     }
        //     updatedMovieDetail = movieDetail;
        // }
        // else {
        //     movieDetailObjGenerator();
        //     updatedMovieDetail = movieDetail;
        // }
        // if not working try https://ide-fbecccadeabdedfcebceacafcdfdaafcdadabbbdecf.project.examly.io/proxy/8080
        if (feedback.userAlreadyRated === false) {
            const userReviewData =
            {
                name: userDetail.find(ele => ele.email === emailId).name,
                email: emailId,
                rating: userRating,
                review: (userReview)
            }; console.log('hi')
            movieDetail.reviews.push(userReviewData)
            console.log(movieDetail.reviews)
        } else if (feedback.userAlreadyRated === true && movieDetail.reviews.length > 0) {
            movieDetail.reviews.forEach(ele => {
                if (ele.email === emailId) {
                    ele.rating = userRating;
                    ele.review = userReview
                }
            })
        };
        console.log(movieDetail.reviews)
        if (movieDetail.reviews.length > 0) {
            let totalRatingVal = 0;
            movieDetail.reviews.forEach(ele => {
                totalRatingVal = totalRatingVal + ele.rating;
            });
            const ratingVal = totalRatingVal / movieDetail.reviews.length;
            movieDetail.rating = ratingVal;
        } else {
            MovieDetails.rating = userRating;

        }
        axios.put(`http://localhost:8080/api/movies/${id}`, movieDetail).then(res => {
            setMovieDetail(res.data)
        }).catch(err => { console.log(err) })
        setFeedback({ userAlreadyRated: true, userFeedbackFlag: true });
    }
    // const movieDetailObjGenerator = (ratingVal, ratingSent = false) => {
    //     const userName = userDetail.find(ele => ele.email === emailId).name
    //     const userReviewData =
    //     {
    //         name: userName,
    //         email: emailId,
    //         rating: userRating,
    //         review: (userReview)
    //     }
    //     if (ratingSent === true) {
    //         movieDetail[`rating`] = ratingVal;
    //         movieDetail[`reviews`] = movieDetail.reviews.concat(userReviewData)

    //     } else {
    //         movieDetail[`rating`] = userRating;
    //         movieDetail[`reviews`] = movieDetail.reviews.concat(userReviewData)
    //     }
    // }
    useEffect(() => {
        (async () => { // if not working try https://ide-fbecccadeabdedfcebceacafcdfdaafcdadabbbdecf.project.examly.io/proxy/8080
            await axios.get(`http://localhost:8080/api/movies/${id}`).then((res => {
                setMovieDetail(res.data)
                if (res.data.reviews && res.data.reviews.length > 0) {
                    const userReviewData = res.data.reviews.find(ele => ele.email === emailId);
                    if (userReviewData && Object.keys(userReviewData).length > 0) {
                        setFeedback({ userAlreadyRated: true, userFeedbackFlag: true });
                        setUserRating(userReviewData.rating);
                        setUserReview(userReviewData.review);
                    }
                }
            })).catch(err => console.log(err))
        }
        )();
    }, [id, userDetail, emailId]);

    // const movieId = parseInt(id);
    // const movieDetailData = movies.find(movie => movie.id === movieId);
    return (
        (userDetail.length > 0 && <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '40px 40px 40px 40px', width: '100%', minHeight: '100vh' }}>
            <br />
            <table >
                <tbody>
                    <tr>
                        <td>
                            {movieDetail.imagePath && (
                                <CardMedia
                                    component="img"
                                    width="200"
                                    height="300"
                                    image={require(`../assets/mock-data/images/${movieDetail.imagePath}`)}
                                    alt={movieDetail.title}
                                />
                            )}
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
            {(movieDetail.reviews && movieDetail.reviews.length > 0) ?
                <div className="user-reviews" >
                    {<div className="rr-title">Reviews</div>}
                    {
                        (
                            movieDetail.reviews.map((ele, ind) => (
                                ele.email !== emailId && (
                                    <div key={ind} className="review-list">
                                        <div className="review-list-element">
                                            <span className="movie-detail-title review-list-element"> User  :</span> {ele.name}
                                        </div>
                                        <div className="review-list-element">
                                            <span className="movie-detail-title"> User rating  : </span> {Array.from({ length: ele.rating }, (_, starIndex) => (
                                                <span key={starIndex}>⭐️</span>
                                            ))}
                                        </div>
                                        <div className="review-data">{ele.review} </div>
                                    </div>
                                )
                            ))
                        )

                    }
                </div> : <div className="user-reviews" > <div className="rr-title">Reviews</div>
                   <div className="no-reviews"> No reviews yet. </div>
                </div>}
        </div >)
    )
}

