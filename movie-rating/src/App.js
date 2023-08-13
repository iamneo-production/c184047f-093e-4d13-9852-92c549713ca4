import './App.css';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies"
import MovieDetails from './components/MovieDetails';
import Loginpage from './components/Login';
import { getUserDetails } from "./redux/UserReducer";
import Header from './components/Header';
// in package.json if react-scripts are not running with port try PORT=8081 
//  try "start": "PORT=8081 react-scripts start" in scripts or "react-scripts start --port=8081"

function App() {
  const usersDetails = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const emailId = localStorage.getItem('emailId');
  const userDetailRef = useRef(null);
  useEffect(() => {
    if (typeof usersDetails === 'object' && Object.keys(usersDetails).length === 0) {
      dispatch(getUserDetails());
    } else {
      if (emailId && emailId.length > 0 && usersDetails) {
        userDetailRef.current = usersDetails.find(ele => ele.email === emailId)
      }
    }
  }, [usersDetails, dispatch, emailId])
  return (
    (usersDetails.length > 0 && <div className="App">
      <Header username={userDetailRef.current}></Header>
      <Routes>
        <Route path="/" element={<Movies />}></Route>
        <Route path= "/movies/:id/reviews" element={emailId && emailId.length > 0 ? <MovieDetails /> : <Loginpage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
      </Routes>
    </div>)

  );
}

export default App;
