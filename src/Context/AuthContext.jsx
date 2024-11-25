import React, { createContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure correct import for jwtDecode
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_BASE;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          setUser({
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name,
          });
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (err) {
        console.error("Error decoding token:", err.message);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${BaseURL}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      const decodedToken = jwtDecode(token);
      setUser({
        id: decodedToken.userId,
        email: decodedToken.email,
        name: decodedToken.name,
      });
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err.response?.data || "Login failed";
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      await axios.post(
        `${BaseURL}/auth/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      throw err.response?.data || "Registration failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register, // Expose register function
      logout,
      loading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
