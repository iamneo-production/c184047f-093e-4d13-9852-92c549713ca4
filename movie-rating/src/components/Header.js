import { useNavigate } from 'react-router-dom';
import '../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from "../redux/UserReducer";

export default function Header({ username }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const usersDetails = useSelector((state) => state.user.user)
    useEffect(() => {
        if (typeof usersDetails === 'object' && Object.keys(usersDetails).length === 0) {
            dispatch(getUserDetails());
        }
    }, [dispatch, usersDetails])
    return (usersDetails && <div className="header-container">
        {username && username.name.length > 0 ? (
            <>
                <div className='user-area'> Hi {username.name}</div>
                <div className='header-title' onClick={() => { navigate('/') }}>MovieReview</div>
                <div className='logout' onClick={() => {
                    localStorage.clear(); window.location.reload()

                }}>Logout</div></>
        ) : <> <div className='header-title-login' onClick={() => { navigate('/') }}>MovieReview</div>
            <div className='login-area' onClick={() => { navigate('/login') }} >Login</div></>
        }
    </div>)
}