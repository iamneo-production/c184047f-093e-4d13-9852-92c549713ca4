import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, element, isAuthenticated }) => {
    console.log(isAuthenticated ? 'yes' : 'no')
    return isAuthenticated ? (
        <Routes>
            <Route path={path} element={element} /></Routes>
    ) : (
        <Navigate to="/"  />
    );
};

export default ProtectedRoute;