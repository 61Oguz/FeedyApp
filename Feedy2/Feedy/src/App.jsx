import "./Pages/styles/LoginForm.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./Pages/Pages/LoginPage/LoginForm.jsx";
import RegisterForm from "./Pages/Pages/RegisterPage/RegisterForm.jsx";
import WelcomePage from "./Pages/Pages/WelcomePage.jsx";
import ProfilePage from "./Pages/Pages/ProfilePage.jsx";
import FoodLogPage from "./Pages/Pages/FoodLogPage.jsx";
import FoodSuggestionPage from "./Pages/Pages/FoodSuggestionPage.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/foodlog" element={<FoodLogPage />} />
          <Route path="/foodsuggestions" element={ <FoodSuggestionPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
