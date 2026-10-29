import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                <Link to="/" className="text-3xl font-serif text-[#D4AF37] tracking-widest">MJ AURA</Link>
                
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-[#D4AF37] hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-sm text-gray-300 hover:text-[#D4AF37]">Dashboard</Link>
                            )}
                            <button onClick={() => { logout(); navigate('/login'); }} className="text-sm text-gray-300 hover:text-red-500">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-sm text-[#D4AF37] border border-[#D4AF37] px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;