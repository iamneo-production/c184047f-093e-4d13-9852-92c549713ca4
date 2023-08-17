import './App.css';
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies"
import MovieDetails from './components/MovieDetails';
import Loginpage from './components/Login';
import Header from './components/Header';
import { useState } from 'react';
// in package.json if react-scripts are not running with port try PORT=8081 
//  try "start": "PORT=8081 react-scripts start" in scripts or "react-scripts start --port=8081"

function App() {
  const [emailId, setEmailId] = useState('');
  const credentialHandle = (value) => {
    setEmailId(value);
  }


  return (
    <div className="App">
      {<Header credentialHandle={credentialHandle}></Header>}
      <Routes>
        <Route path="/" element={<Movies />}></Route>
        <Route path="/movies/:id/reviews" element={emailId && emailId.length > 0 ? <MovieDetails /> : <Loginpage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
      </Routes>
    </div >

  );
}

export default App;
