import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import the new Home page
import SignupPage from './pages/auth/SignupPage';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;