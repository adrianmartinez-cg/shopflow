import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import InitialPage from './pages/InitialPage';
import SignupPage from './pages/auth/SignupPage';
import './App.css';
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import CreateProductPage from './pages/user/product/CreateProductPage';
import ProductPage from './pages/user/product/ProductPage';

export const App = () => {
  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </div>
  );
}