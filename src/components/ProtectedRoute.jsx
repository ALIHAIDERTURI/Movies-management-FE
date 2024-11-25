
// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import AuthContext from '../Context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;





