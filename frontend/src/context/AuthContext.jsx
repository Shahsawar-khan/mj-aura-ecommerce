// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in (Token in LocalStorage)
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { access_token, user } = response.data;
            
            // Save to LocalStorage
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setUser(user);
            
            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/'); // Filhal admin ko bhi home par bhej rahe hain
            } else {
                navigate('/');
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };
        const register = async (name, email, password, password_confirmation) => {
        try {
            const response = await api.post('/register', { 
                name, email, password, password_confirmation 
            });
            
            const { access_token, user } = response.data;
            
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/');
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed. Check your inputs.' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    // AuthContext.jsx ke end mein
return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}> {/* <-- register hona chahiye */}
        {!loading && children}
    </AuthContext.Provider>
);
};