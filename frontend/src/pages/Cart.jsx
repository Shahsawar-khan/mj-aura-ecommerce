import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif text-[#D4AF37] mb-8 text-center">Your Shopping Bag</h1>
                
                {cart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-400 mb-6">Your bag is empty.</p>
                        <Link to="/" className="bg-[#D4AF37] text-black px-6 py-3 rounded font-bold">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-2/3 space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center bg-[#111] p-4 rounded-lg border border-gray-800">
                                    <img src={`http://127.0.0.1:8000/storage/${item.image_path}`} className="w-20 h-20 object-cover rounded" alt=""/>
                                    <div className="ml-4 flex-grow">
                                        <h3 className="text-[#D4AF37] font-bold">{item.name}</h3>
                                        <p className="text-gray-400">Qty: {item.qty}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">Rs. {item.price * item.qty}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm mt-2">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="md:w-1/3 bg-[#111] p-6 rounded-lg border border-gray-800 h-fit">
                            <h2 className="text-2xl font-serif mb-4 border-b border-gray-800 pb-2">Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span>Total</span>
                                <span className="text-[#D4AF37] font-bold text-xl">Rs. {cartTotal}</span>
                            </div>
                            <button onClick={() => navigate('/checkout')} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded hover:bg-yellow-600 transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Cart;