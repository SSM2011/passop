import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authenticated state
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authenticated state
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[87vh]">
        {isAuthenticated ? (
          <div>
            <button
              onClick={handleLogout}
              className="p-2 m-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            <Manager />
          </div>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;

