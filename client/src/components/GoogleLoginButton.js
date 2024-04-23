import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/userSlice'; // Assuming you have an action to set user token

const GoogleLoginButton = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleSuccess = (credentialResponse) => {
        console.log(credentialResponse);
        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log("decodedtoken:", decodedToken);

        // Assuming you have an action to set the user token
        dispatch(login(decodedToken)); // Properly dispatch an action with the decoded token

        const token = "ExampleToken"; // Simulate getting a token (you might want to set it in your Redux store)
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};

export default GoogleLoginButton;
