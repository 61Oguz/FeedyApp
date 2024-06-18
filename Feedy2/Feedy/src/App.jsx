import './Components/LoginForm/LoginForm.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import LoginForm from "./Components/LoginForm/LoginForm.jsx";
import RegisterForm from "./Components/RegisterForm/RegisterForm.jsx";
import WelcomePage from "./Components/HomePage/WelcomePage.jsx";

function App() {


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/welcome" element={<WelcomePage/>}/>
                </Routes>
            </Router>
        </div>

    );

}

export default App
