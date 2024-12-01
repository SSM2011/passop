import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authenticated state
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authenticated state
  };

  return (
    <Router>
      <Navbar />
      <div className="min-h-[87vh]">
        <Routes>
          {/* Redirect to AuthPage if not authenticated */}
          {!isAuthenticated ? (
            <Route path="*" element={<AuthPage onLogin={handleLogin} />} />
          ) : (
            <>
              {/* Redirect to Manager by default */}
              <Route path="/" element={<Navigate to="/manager" />} />
              
              {/* Manager Page with Logout Button */}
              <Route
                path="/manager"
                element={
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 mb-4"
                    >
                      Logout
                    </button>
                    <Manager />
                  </div>
                }
              />

              {/* Password Generator Page */}
              <Route path="/password-generator" element={<PasswordGenerator />} />
              
              {/* Catch-all redirect to /manager */}
              <Route path="*" element={<Navigate to="/manager" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
