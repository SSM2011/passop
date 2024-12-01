import React, { useState } from 'react';

const AuthPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded credentials for demo purposes
  const users = [
    { email: 'admin@gmail.com', password: 'root@123' },
    { email: 'guest@example.com', password: 'guest123' },
    { email: 'user@example.com', password: 'password123' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const validUser = users.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    if (validUser) {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800 animate-pulse">
          Welcome Back!
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2 animate-shake">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
