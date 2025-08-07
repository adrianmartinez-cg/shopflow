import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import SignupPage from './pages/auth/SignupPage';
import './App.css';

function App() {
  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;