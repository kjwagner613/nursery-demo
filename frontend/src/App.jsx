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
      <Route path="/pages/contact" element={<Contact />} />
      <Route path="/pages/dashboard" element={token ? <Dashboard /> : <Navigate to="/pages/loginpage" />} />
      <Route path="*" element={<Navigate to={token ? "/pages/dashboard" : "/pages/loginpage"} />} />
    </Routes>
    <div>
      <img
        src="/images/cropFooter.png"
        alt="Green crops growing in neat rows under a bright sky, suggesting a healthy and thriving nursery environment"
        className="cropImage" />
    </div>
    <h1>Nursery Demo</h1>
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
  </>
 )
}

export default App
