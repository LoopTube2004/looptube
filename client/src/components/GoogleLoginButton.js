import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'; // Assuming you have an action to set user token
import axios from 'axios'
import styles from './GoogleLoginButton.module.css'


const GoogleLoginButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const google_token = tokenResponse.access_token 
            try {
                const response = await axios.get('http://localhost:4000/api/auth/login', {
                    headers: { Authorization: `Bearer ${google_token}` }
                })
                dispatch(login(response.data))
                console.log("Google_token is", google_token)
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/')  //Navigate to "/" home page after login successfully
            } catch (err) { 
                console.log("there is error in GoogleLOginButton.js", err)
            }
        },

        onError: (error) => console.error('Login Failed:', error),
    });
    
    return (
        <button onClick={() => googleLogin()} className={styles["google-login-button"]}>
            Login with Google 🚀
        </button>
    );
}


export default GoogleLoginButton;
