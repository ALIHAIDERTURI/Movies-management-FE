import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true

    try {
      await login({ email, password }); // Attempt login
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // Redirect after success
    } catch (err) {
      setLoading(false); // Reset loading state
      toast.error(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input 
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className='text-[14px]'>
            <input className='me-2' 
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
