// frontend/src/pages/Register.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.password_confirmation) {
            return setError("Passwords do not match");
        }

        const result = await register(formData.name, formData.email, formData.password, formData.password_confirmation);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                    <input type="text" placeholder="Full Name" required className="w-full px-3 py-3 border rounded-md"
                        onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input type="email" placeholder="Email address" required className="w-full px-3 py-3 border rounded-md"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="password" placeholder="Password" required className="w-full px-3 py-3 border rounded-md"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <input type="password" placeholder="Confirm Password" required className="w-full px-3 py-3 border rounded-md"
                        onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})} />
                    
                    <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition">
                        Register
                    </button>
                    <div className="text-sm text-center">
                        <Link to="/login" className="text-blue-600 hover:text-blue-500">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;