import './App.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const [userData, setUserData] = useState();
  const userDetail = useSelector((state) => state.user.user)

  useEffect(() => {
    setUserData(userDetail);
  }, [userDetail, setUserData, userData])
  return (
    <div className="App">
      Movies thammayya appp
    </div>
  );
}

export default App;
