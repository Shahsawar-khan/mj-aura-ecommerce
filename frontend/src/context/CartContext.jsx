import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Local storage se cart load karein
    useEffect(() => {
        const savedCart = localStorage.getItem('mj_aura_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // Jab bhi cart change ho, local storage update karein
    useEffect(() => {
        localStorage.setItem('mj_aura_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
    const clearCart = () => setCart([]);
    
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
    const cartCount = cart.reduce((count, item) => count + item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};