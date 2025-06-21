import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CameraTesting from './pages/CameraTesting/CameraTesting';
import RoutingPage from './pages/RoutingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/camera/:letter" element={<CameraTesting />} />
        <Route path="/routing" element={<RoutingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
