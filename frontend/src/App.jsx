import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NavBar from "./pages/NavBar";
import FluffyCloud from './components/FluffyCloud';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // ✅ Get token from context

  return token ? children : <Navigate to="/pages/loginpage" />; // ✅ Redirect if no token
};

// 🔹 Wrap Dashboard route inside `ProtectedRoute`
<Route path="/pages/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


function App() {
  const [count, setCount] = useState(0)
  const { token } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pages/loginpage" element={<LoginPage />} />
        <Route path="/pages/registerpage" element={<RegisterPage />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/products" element={<Products />} />
        <Route path="/pages/services" element={<Services />} />
        <Route path="/pages/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to={token ? "/pages/dashboard" : "/pages/loginpage"} />} />
      </Routes>
      <div>
        <img
          src="/images/cropFooter.png"
          alt="Green crops growing in neat rows under a bright sky, suggesting a healthy and thriving nursery environment"
          className="cropImage" />
      </div>
     

     <div className="footer-container">
      <div className="footer-item">
      <p>Serving the community since 1955</p>
      <p>Tulelake, Calfornia Phone: <a href="tel:15355551234">(535) 555-1234</a></p>
      <p>Macdoel, California <a href="tel:15355551234">(535) 555-1234</a></p>
      <p>Susanville, California  <a href="tel:15302546867">(530) 254-6867</a></p>
      </div>

      <div className="footer-item">
      <p>Specializing In:</p>
      <p>Trees and Large Growth boundaries</p>
      <p>Commercial Nursery Supply</p>
      <p>Hard To Find Plants</p>
      </div>
      </div>


    </>
  )
}

export default App
