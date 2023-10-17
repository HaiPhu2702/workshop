import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = false
  const token = localStorage.getItem('access_token');
  if (token) { isAuthenticated = true }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
