import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden group hover:border-[#D4AF37] transition-all duration-500">
      <div className="h-80 overflow-hidden relative">
        <img 
          src={product.image_path ? `http://127.0.0.1:8000/storage/${product.image_path}` : 'https://via.placeholder.com/400'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
      </div>
      
      <div className="p-6 text-center">
        <h2 className="text-2xl font-serif text-[#D4AF37] mb-2">{product.name}</h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        <p className="text-xl font-bold text-white mb-6">Rs. {product.price}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded hover:bg-yellow-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;