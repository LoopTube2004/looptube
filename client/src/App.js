import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
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
            <Home />
        </div>
    );
}

export default App;
