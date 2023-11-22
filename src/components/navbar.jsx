// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="left-links">
          <Link to="/" className="company-icon">Company Logo</Link>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="right-links">
          <Link to="/login">Login</Link>
          <Link to="/Checkout" className="shopping-cart-icon"><FaShoppingCart /></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
