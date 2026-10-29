import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Cart Provider Import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart'; // Cart Page Import
import Checkout from './pages/Checkout'; // Checkout Page Import
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* AuthProvider sab se bahar hai kyunke login state sabko chahiye */}
      <AuthProvider>
        {/* CartProvider Auth ke andar hai taake user cart use kar sake */}
        <CartProvider>
          <div className="min-h-screen bg-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;