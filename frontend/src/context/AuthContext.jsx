import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sr_user');
    const token = localStorage.getItem('sr_token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      const { token, username, role, id } = response.data;
      const userData = { id, username, role };
      
      localStorage.setItem('sr_token', token);
      localStorage.setItem('sr_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("AuthContext Login error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data || 'Invalid credentials or server error.';
      return { 
        success: false, 
        message: typeof errorMessage === 'string' ? errorMessage : 'Invalid credentials or server error.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('sr_token');
    localStorage.removeItem('sr_user');
    setUser(null);
  };

  const signup = async (userData) => {
    try {
      await apiRegister(userData);
      return { success: true };
    } catch (error) {
      console.error("AuthContext Signup error:", error);
      
      if (!error.response) {
        return { 
          success: false, 
          message: 'Server unreachable. Please check your connection or try again later.' 
        };
      }

      const message = error.response.data?.message || error.response.data || 'Registration failed.';
      return { 
        success: false, 
        message: typeof message === 'string' ? message : 'Registration failed.' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
