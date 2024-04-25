import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/userSlice'; // Assuming you have an action to set user token
import axios from 'axios'
// const GoogleLoginButton = () => {
//     const user = useSelector((state) => state.user.user);
//     const dispatch = useDispatch();

//     const handleSuccess = (credentialResponse) => {
//         console.log(credentialResponse);
//         const decodedToken = jwtDecode(credentialResponse.credential);
//         console.log("decodedtoken:", decodedToken);

//         // Assuming you have an action to set the user token
//         dispatch(login(decodedToken)); // Properly dispatch an action with the decoded token

//         const token = "ExampleToken"; // Simulate getting a token (you might want to set it in your Redux store)
//     };

//     const handleError = () => {
//         console.log('Login Failed');
//     };

//     return (
//         <GoogleLogin
//             onSuccess={handleSuccess}
//             onError={handleError}
//         />
//     );
// };

const GoogleLoginButton = () => {
    const googleLogin = useGoogleLogin({
      onSuccess: tokenResponse => {
        console.log('Token Response:', tokenResponse);  // Check the whole tokenResponse object
        const google_token = tokenResponse.access_token
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google_token}`, { //How to decode google token
                headers: {
                    Authorization: `Bearer ${google_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log("res.data: ", res.data);
            })
            .catch((err) => console.log(err));
      },
      onError: (error) => console.error('Login Failed:', error),
    });
  
    return (
      <button onClick={() => googleLogin()} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
        Login with Google
      </button>
    );
}


export default GoogleLoginButton;
