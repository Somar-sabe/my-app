import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './Productpage';
import ProductDetailsPage from './ProductDetailsPage';
import CheckoutPage from './CheckoutPage';
import Navbar from './components/navbar';
import { CartProvider } from './CartContext'; // Import CartProvider

function App() {
  return (
    <div className="App">
      <CartProvider> {/* Wrap your Router with CartProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;





