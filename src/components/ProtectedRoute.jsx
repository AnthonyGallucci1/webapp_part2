import React from 'react';
import { Navigate } from 'react-router-dom';

<<<<<<< HEAD
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
=======
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signin" />;
}
>>>>>>> development
