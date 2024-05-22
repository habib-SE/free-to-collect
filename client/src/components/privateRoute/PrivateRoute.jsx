// src/components/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem('userData');
  const jsonData = storedUserData ? JSON.parse(storedUserData) : null;
  const isDonor = jsonData?.user?.is_donor;

  useEffect(() => {
    if (!jsonData?.token) {
      navigate('/login');
    } else if (!isDonor) {
      alert('You are not a donor!');
      navigate('/');
    }
  }, [jsonData, navigate, isDonor]);

  if (!jsonData?.token || !isDonor) {
    return null; // Render nothing while redirecting
  }

  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
