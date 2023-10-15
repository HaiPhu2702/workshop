import React, { useEffect } from 'react';

const PublicRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return <Component {...rest} />
};

export default PublicRoute;
