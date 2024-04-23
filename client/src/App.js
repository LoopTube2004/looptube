import Home from './pages/Home';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';

function App() {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const user = useSelector((state) => state.user.user);
    console.log("App.js, googleClientId:", googleClientId)
    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <BrowserRouter>
                <div className="App">
                    {/*Customization for toast, top-center, show for 3 seconds, and bold text*/}
                    <Toaster    
                        position="top-center" 
                        reverseOrder={false}
                        toastOptions={{
                            duration: 3000, 
                            style: {
                                fontWeight: 'bold'
                            }
                        }} /> 
                    <Routes>
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
                        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
