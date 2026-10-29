// frontend/src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/" />; // Agar admin nahi hai to wapas home bhej do
    }

    return children;
};

export default ProtectedRoute;