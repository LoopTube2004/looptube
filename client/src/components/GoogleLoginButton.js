import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/userSlice'; // Assuming you have an action to set user token
import axios from 'axios'
import styles from './GoogleLoginButton.module.css'
// const GoogleLoginButton = () => {
//         const user = useSelector((state) => state.user.user);
//         const dispatch = useDispatch();

//         const handleSuccess = (credentialResponse) => {
//                 console.log(credentialResponse);
//                 const decodedToken = jwtDecode(credentialResponse.credential);
//                 console.log("decodedtoken:", decodedToken);

//                 // Assuming you have an action to set the user token
//                 dispatch(login(decodedToken)); // Properly dispatch an action with the decoded token

//                 const token = "ExampleToken"; // Simulate getting a token (you might want to set it in your Redux store)
//         };

//         const handleError = () => {
//                 console.log('Login Failed');
//         };

//         return (
//                 <GoogleLogin
//                         onSuccess={handleSuccess}
//                         onError={handleError}
//                 />
//         );
// };

const GoogleLoginButton = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const google_token = tokenResponse.access_token 
            try {
                const response = await axios.get('http://localhost:4000/api/auth/login', {
                    headers: { Authorization: `Bearer ${google_token}` }
                })
                console.log("response is", response)
                dispatch(login(response.data))
                localStorage.setItem('user', JSON.stringify(response.data));
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
