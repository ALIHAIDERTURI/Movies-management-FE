import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext'; // Adjust the import path

const Register = () => {
  const { register } = useContext(AuthContext); // Access register function
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err || 'Something went wrong!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
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

export default Register;
