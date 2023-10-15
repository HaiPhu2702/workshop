import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true; // You should replace this with your actual authentication logic

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
