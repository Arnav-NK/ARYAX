import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated === null) return <div>Loading...</div>; // avoid early redirect
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={isAuthenticated ? '/home' : '/login'} replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppWrapper;
