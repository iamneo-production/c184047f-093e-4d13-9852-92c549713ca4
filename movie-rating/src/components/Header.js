import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from "../redux/UserReducer";
import '../App.css'

export default function Header({ credentialHandle }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let emailId = localStorage.getItem('emailId');
    const [userName, setUserName] = useState(null);
    const usersDetails = useSelector((state) => state.user.user);
    useEffect
        (() => {
            if (typeof usersDetails === 'object' && Object.keys(usersDetails).length === 0) {
                dispatch(getUserDetails());
            } else {
                if (emailId && emailId.length > 0 && usersDetails) {
                    const userNameData = usersDetails.find(ele => ele.email === emailId);
                    setUserName(userNameData.name);
                     credentialHandle(userNameData.email);
                }
            }
        }, [usersDetails, dispatch, emailId, credentialHandle]);
    return (userName && userName.length > 0 ? <div className="header-container">
        <div className='user-area'> Hi {userName}</div>
        <div className='header-title' onClick={() => { navigate('/') }}>MovieReview</div>
        <div className='logout' onClick={() => {
            localStorage.clear();
            setUserName(null);
            credentialHandle('')
            if (location.pathname !== '/') {
                navigate('/login')
            }
        }}>Logout</div>
    </div> :
        <div className="header-container">
            <div className='header-title-login' onClick={() => { navigate('/') }}>MovieReview</div>
            {location.pathname !== '/login' && <div className='login-area' onClick={() => { navigate('/login') }} >Login</div>}
        </div>)
}