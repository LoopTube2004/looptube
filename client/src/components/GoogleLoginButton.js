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
      onSuccess: async (tokenResponse) => {
        console.log('Token Response:', tokenResponse);  // Check the whole tokenResponse object
        console.log("Acces token is: ", tokenResponse.access_token)
        const google_token = tokenResponse.access_token
        const response = await axios.get('http://localhost:4000/api/auth/login', {
          headers: { Authorization: `Bearer ${google_token}` }
        })
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
