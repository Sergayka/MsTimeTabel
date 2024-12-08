import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SchedulePage from './pages/SchedulePage';
import AddSchedulePage from './pages/AddSchedulePage';
import LoginPage from './pages/LoginPage'; // Новый компонент для логина

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SchedulePage />} />
                <Route path="/add" element={<AddSchedulePage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Новый маршрут */}
            </Routes>
        </Router>
    );
}

export default App;
