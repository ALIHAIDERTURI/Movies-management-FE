import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl mb-4">Oops! Page not found.</p>
    <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
      Go to Home
    </Link>
  </div>
);

export default NotFound;
