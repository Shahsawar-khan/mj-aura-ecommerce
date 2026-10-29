import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#D4AF37] text-2xl font-serif animate-pulse">Loading MJ Aura...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section - Luxury Look */}
        <div className="text-center mb-20 mt-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#D4AF37] mb-6 tracking-wider">
            MJ AURA
          </h1>
          <p className="text-lg md:text-xl text-gray-400 tracking-[0.3em] uppercase">
            Discover the Essence of Luxury
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-8"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center text-gray-500 text-lg mt-10">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;