import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Movies from "./components/Movies"


function App() {
  return (
    <div className="App">
      <h1>Hello in movies list page</h1>
       <Router>
          <Routes>
            <Route  path="/" element={<Navigate to="/movies"/>}></Route>
            <Route path="/movies" element={<Movies />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
