import './App.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies"
import MovieDetails from './components/MovieDetails';
import Loginpage from './components/Login';
import { getUserDetails } from "./redux/UserReducer";

function App() {
  const [userData, setUserData] = useState();
  const userDetail = useSelector((state) => state.user.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const emailId = localStorage.getItem('emailId')
    if (typeof userDetail === 'object' && Object.keys(userDetail).length === 0) {
      dispatch(getUserDetails({ email: emailId }));
    }
    setUserData(userDetail);
  }, [userDetail, setUserData, userData, dispatch])
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route  path="/" element={<Navigate to="/movies"/>}></Route>  <MovieDetails /> */}
          <Route path="/" element={<Movies />}></Route>
          <Route path="/movies/:id/reviews" element={<MovieDetails canReview={userData?.isPermitted} />}></Route>
          <Route path="/login" element={<Loginpage />}></Route>

        </Routes>
      </Router>

    </div>

  );
}

export default App;
