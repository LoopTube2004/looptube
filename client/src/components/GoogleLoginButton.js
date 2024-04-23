import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// Function to handle success response
const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential); 
    console.log("decodedtoken:", decodedToken);
};

// Function to handle error response
const handleError = () => {
    console.log('Login Failed');
};

const GoogleLoginButton = () => {
    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};

export default GoogleLoginButton;
