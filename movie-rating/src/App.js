import './App.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies"
function App() {
  const [userData, setUserData] = useState();
  const userDetail = useSelector((state) => state.user.user)

  useEffect(() => {
    setUserData(userDetail);
  }, [userDetail, setUserData, userData])
  return (
    <div className="App">

      <Router>
        <Routes>
          {/* <Route  path="/" element={<Navigate to="/movies"/>}></Route>  <MovieDetails /> */}
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<Movies />}></Route>
        </Routes>
      </Router>

    </div>

  );
}

export default App;
