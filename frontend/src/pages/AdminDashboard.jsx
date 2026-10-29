// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ total_products: 0, total_orders: 0, total_revenue: 0 });
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock_quantity: '', category_id: '1', image: null
  });
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    try {
      const prodRes = await api.get('/products');
      setProducts(prodRes.data.data);
      
      const token = localStorage.getItem('token');
      const statsRes = await api.get('/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Adding product...');
    setErrorMsg('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock_quantity', formData.stock_quantity);
    data.append('category_id', formData.category_id);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      await api.post('/admin/products', data, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Product Added Successfully!');
      setFormData({ name: '', description: '', price: '', stock_quantity: '', category_id: '1', image: null });
      fetchData(); 
    } catch (error) {
      setMessage('');
      // Laravel ka exact validation error nikalne ke liye
      if (error.response && error.response.data.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setErrorMsg(firstError);
      } else {
        setErrorMsg('Error adding product. Check console.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats.total_products}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.total_orders}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">Rs. {stats.total_revenue || 0}</p>
        </div>
      </div>

      {/* Main Content Grid - Mobile par stack hoga, Desktop par side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Add Product Form */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1 h-fit">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Add New Perfume</h2>
          
          {message && <p className="mb-3 text-sm text-green-600 bg-green-50 p-2 rounded font-medium">{message}</p>}
          {errorMsg && <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded font-medium">{errorMsg}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input type="text" placeholder="Product Name" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            
            <textarea placeholder="Description" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm" rows="3"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            
            <input type="number" placeholder="Price (Rs.)" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            
            <input type="number" placeholder="Stock Quantity" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              value={formData.stock_quantity} onChange={e => setFormData({...formData, stock_quantity: e.target.value})} />
            
            <div>
              <label className="block text-xs md:text-sm text-gray-600 mb-1 font-medium">Product Image (JPG, PNG, WEBP)</label>
              <input type="file" required className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-sm" 
                onChange={e => setFormData({...formData, image: e.target.files[0]})} />
            </div>
            
            <button type="submit" className="w-full bg-gray-900 text-white py-2.5 rounded-md hover:bg-gray-800 transition font-medium text-sm md:text-base">
              Save Product
            </button>
          </form>
        </div>

        {/* Products List Table */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">All Products</h2>
          
          {/* Table wrapper with horizontal scroll for small screens */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="p-3 border-b font-medium">Image</th>
                  <th className="p-3 border-b font-medium">Name</th>
                  <th className="p-3 border-b font-medium">Price</th>
                  <th className="p-3 border-b font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <img src={`http://127.0.0.1:8000/storage/${product.image_path}`} alt="img" className="w-10 h-10 md:w-12 md:h-12 object-cover rounded shadow-sm" />
                    </td>
                    <td className="p-3 font-medium text-gray-800 text-sm md:text-base">{product.name}</td>
                    <td className="p-3 text-blue-600 font-semibold text-sm md:text-base">Rs. {product.price}</td>
                    <td className="p-3 text-gray-600 text-sm md:text-base">{product.stock_quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;