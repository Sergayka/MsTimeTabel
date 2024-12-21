import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage.jsx';
import AddSchedulePage from './pages/AddSchedulePage';
import LoginPage from './pages/LoginPage'; // Новый компонент для логина
import TeacherPage from './pages/TeacherPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/teacher/:teacherName" element={<TeacherPage />} />
            </Routes>
        </Router>
    );
}

export default App;
