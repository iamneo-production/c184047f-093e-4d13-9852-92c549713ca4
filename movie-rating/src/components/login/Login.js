import { useFormik } from 'formik'
import * as Yup from "yup"
import './Login.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
export default function Loginpage() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [errorData, setErrorData] = useState('');
    const [passwordVisisblity, setPasswordVisiblity] = useState(false);
    const formikForm = useFormik({
        initialValues: {
            emailName: "",
            password: ""
        },
        validationSchema: Yup.object({
            emailName: Yup.string().email('enter valid email').required('email is a required field'),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            (async () => {

                await axios.get('https://ide-fbecccadeabdedfcebceacafcdfdaafcdadabbbdecf.project.examly.io/proxy/8080/userCredentials', { params: values }).then((res) => {
                    if (res.data.length > 0) {
                        const indexVal = res.data.findIndex(ele => {
                            return ele.email === values.emailName && ele.password === values.password;
                        });
                        if (indexVal !== -1) {
                            // dispatch(getUserDetails({ email: values.emailName }))
                            console.log(res.data)
                            setErrorData('');
                            // navigate('/')
                        } else {
                            setErrorData('Invalid Credentails');
                        }
                    } else {
                        setErrorData('Invalid Credentails');
                    }

                }).catch(err => {
                    console.log(err)
                })
            }
            )();

        },
    });
    const handlePasswordVisiblity = (visiblity) => {
        let passwordElement = document.getElementById('password-element')
        if (visiblity === true) {
            passwordElement.type = 'text';
        } else {
            passwordElement.type = 'password';
        }
        setPasswordVisiblity(visiblity);
    }
    return (
        <div className="login-container">
            {errorData.length > 0 && <div className="error-container">{errorData}</div>}
            <div className='login-title'>Login</div>
            <form onSubmit={formikForm.handleSubmit}>
                <input className='login-input-element' type='text' onChange={formikForm.handleChange}
                    onBlur={formikForm.handleBlur} name='emailName' value={formikForm.values.emailName}
                    placeholder='Email' />
                <div className={formikForm.touched.emailName && formikForm.errors.emailName ? 'login-error-message' : ''}>{formikForm.touched.emailName && formikForm.errors.emailName ? formikForm.errors.emailName : ''}</div>
                <br />
                <input type='password' id='password-element' className='login-input-element' onChange={formikForm.handleChange} onBlur={formikForm.handleBlur}
                    name='password' onPaste={(event) => { event.preventDefault() }} value={formikForm.values.password}
                    placeholder='password' >
                </input><i id='show-password' className={formikForm.values.password.length > 0 && passwordVisisblity ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}
                    onMouseUp={() => { handlePasswordVisiblity(false) }} onMouseDown={() => { handlePasswordVisiblity(true) }}></i>
                <div className={formikForm.touched.password && formikForm.errors.password ? 'login-error-message' : ''}>{formikForm.touched.password && formikForm.errors.password ? formikForm.errors.password : ''}</div><br />
                <button type='submit' className=' login-input-element login-page-buttons'>Submit</button> <br />

            </form >

        </div >
    )
}