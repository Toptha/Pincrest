import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const PincrestLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123' || username === 'Preetham' && password === 'root') {
      alert("Login successful! \nPlease return to the home page");
      setError('');
    } else {
      setError('Invalid username or password!');
    }
  };

  useEffect(() => {
    const handlePasswordMouseover = () => {
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Password should contain at least one uppercase letter, one lowercase letter, a number, a special character, and be at least 8 characters long.';
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '12px';
      tooltip.style.top = '50px';
      tooltip.style.left = '20px';
      tooltip.id = 'password-tooltip';
      document.getElementById('password-group').appendChild(tooltip);
    };

    const handlePasswordMouseout = () => {
      const tooltip = document.getElementById('password-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    };

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('mouseover', handlePasswordMouseover);
      passwordInput.addEventListener('mouseout', handlePasswordMouseout);
    }

    return () => {
      if (passwordInput) {
        passwordInput.removeEventListener('mouseover', handlePasswordMouseover);
        passwordInput.removeEventListener('mouseout', handlePasswordMouseout);
      }
    };
  }, []);

  return (
    <div className="page-wrapper">
      <div className="title">
        <h1 className="text-5xl mb-2 text-[#e60023]">Pincrest</h1>
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-box bg-[#333] p-10 rounded-lg shadow-lg w-[350px] max-w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-8 text-red-500">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-6 relative">
              <input
                className="w-full px-5 py-3 border-2 border-red-500 rounded-full bg-black text-white outline-none focus:border-[maroon] transition-all duration-300"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none">
                Username
              </label>
            </div>
            <div id="password-group" className="input-group mb-6 relative">
              <input
                className="w-full px-5 py-3 border-2 border-red-500 rounded-full bg-black text-white outline-none focus:border-[maroon] transition-all duration-300"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-bold rounded-full hover:bg-[maroon] focus:outline-none focus:shadow-outline transition-all duration-300"
            >
              Login
            </button>
          </form>
          {error && (
            <div id="error-message" className="error-message text-[#e74c3c] text-center mt-4 text-sm">
              {error}
            </div>
          )}
          <p className="mt-4">
            <a href="#" className="text-red-500">Forgot Password?</a>
          </p>
          <p className="mt-4">
            <a href="/signup" className="text-[#e60023]">Are You a New User?</a>
          </p>
          <p className="mt-4">
            <a href="/home" className="text-[#e60023]">Home</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const PincrestSignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters long');
    } else {
      alert("Signup Successful!");
      // Here you would typically send the data to your server
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    const handlePasswordMouseover = () => {
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Password should contain at least one uppercase letter, one lowercase letter, a number, a special character, and be at least 8 characters long.';
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '12px';
      tooltip.style.top = '50px';
      tooltip.style.left = '20px';
      tooltip.id = 'password-tooltip';
      document.getElementById('password-group').appendChild(tooltip);
    };

    const handlePasswordMouseout = () => {
      const tooltip = document.getElementById('password-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    };

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('mouseover', handlePasswordMouseover);
      passwordInput.addEventListener('mouseout', handlePasswordMouseout);
    }

    return () => {
      if (passwordInput) {
        passwordInput.removeEventListener('mouseover', handlePasswordMouseover);
        passwordInput.removeEventListener('mouseout', handlePasswordMouseout);
      }
    };
  }, []);

  return (
    <div className="page-wrapper">
      <div className="title">
        <h1 className="text-5xl mb-2 text-[#e60023]">Pincrest</h1>
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="signup-box bg-[#333] p-10 rounded-lg shadow-lg w-[350px] max-w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-8 text-red-500">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-6 relative">
              <input
                className="w-full px-5 py-3 border-2 border-red-500 rounded-full bg-black text-white outline-none focus:border-[maroon] transition-all duration-300"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none">
                Username
              </label>
            </div>
            <div className="input-group mb-6 relative">
              <input
                className="w-full px-5 py-3 border-2 border-red-500 rounded-full bg-black text-white outline-none focus:border-[maroon] transition-all duration-300"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none">
                Email
              </label>
            </div>
            <div id="password-group" className="input-group mb-6 relative">
              <input
                className="w-full px-5 py-3 border-2 border-red-500 rounded-full bg-black text-white outline-none focus:border-[maroon] transition-all duration-300"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-bold rounded-full hover:bg-[maroon] focus:outline-none focus:shadow-outline transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
          {error && (
            <div id="error-message" className="error-message text-[#e74c3c] text-center mt-4 text-sm">
              {error}
            </div>
          )}
          <p className="mt-4">
            <a href="/login" className="text-[#e60023]">Already an Existing user?</a>
          </p>
          <p className="mt-4">
            <a href="/home" className="text-[#e60023]">Home</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export { PincrestLoginPage, PincrestSignupPage };