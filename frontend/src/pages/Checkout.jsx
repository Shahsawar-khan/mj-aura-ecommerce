import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

        const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first!");
        
        setLoading(true);
        try {
            const orderItems = cart.map(item => ({
                product_id: item.id,
                quantity: item.qty,
                price: item.price
            }));

            const token = localStorage.getItem('token');
            
            await api.post('/orders', {
                shipping_address: address,
                total_amount: cartTotal,
                items: orderItems
            }, { headers: { Authorization: `Bearer ${token}` } });

            alert("Order Placed Successfully! Check Admin Dashboard.");
            clearCart();
            navigate('/');
        } catch (error) {
            console.error("Order Error Details:", error.response?.data); // Console mein detail aayegi
            // Agar Laravel validation fail hui hai toh exact error show karein
            if (error.response && error.response.data && error.response.data.message) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Error placing order. Check console for details.");
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4">
            <div className="max-w-2xl mx-auto bg-[#111] p-8 rounded-xl border border-gray-800">
                <h1 className="text-3xl font-serif text-[#D4AF37] mb-6">Checkout</h1>
                <form onSubmit={handlePlaceOrder}>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Shipping Address</label>
                        <textarea required rows="3" value={address} onChange={e => setAddress(e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#D4AF37] outline-none"></textarea>
                    </div>
                    <div className="mb-6 bg-black p-4 rounded border border-gray-800">
                        <p className="flex justify-between"><span>Total Amount:</span> <span className="text-[#D4AF37] font-bold">Rs. {cartTotal}</span></p>
                        <p className="text-sm text-gray-500 mt-2">*Payment: Cash on Delivery (Mock)</p>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded hover:bg-yellow-600 transition disabled:bg-gray-600">
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Checkout;