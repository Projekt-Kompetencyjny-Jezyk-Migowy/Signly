import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CameraTesting from './pages/CameraTesting/CameraTesting';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/camera" element={<CameraTesting />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
