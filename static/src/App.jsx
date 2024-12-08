import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';  // Импортируем нашу страницу профиля
import SchedulePage from './pages/SchedulePage';
import AddSchedulePage from './pages/AddSchedulePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SchedulePage />} />
                <Route path="/add" element={<AddSchedulePage />} />
            </Routes>
        </Router>
    );
}

export default App;
