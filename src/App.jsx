import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound'; // Import NotFound component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container mx-auto mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
