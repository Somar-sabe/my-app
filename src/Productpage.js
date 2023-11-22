// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './api';
import './ProductPage.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {

    const myRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({ category: 'All', price: '', color: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSort = (type) => {
    setSortBy(type);
    // Implement sorting logic
  };

  const handleFilter = (type, value) => {
    setFilters({ ...filters, [type]: value });
    // Implement filtering logic
  };

  const filteredProducts = applySortingAndFiltering(products, sortBy, filters);

  return (
    <div ref={myRef}>
        <div className='all'>
        <div className='left'>
      <div>
        <button onClick={() => handleSort('A-Z')}>Sort A-Z</button>
        <button onClick={() => handleSort('Z-A')}>Sort Z-A</button>
      </div>

      <div>
        <ul>
          <li onClick={() => handleFilter('category', 'All')}>All</li>
          <li onClick={() => handleFilter('category', 'bedroom')}>bedroom</li>
          <li onClick={() => handleFilter('category', 'dining')}>dining</li>
          <li onClick={() => handleFilter('category', 'living room')}>living room</li>
          <li onClick={() => handleFilter('category', 'office')}>office</li>
          {/* Add more categories */}
        </ul>
      </div>

      <div>
        <input type="range" min="0" max="100" onChange={(e) => handleFilter('price', e.target.value)} />
        {/* Adjust min, max values according to price range */}
      </div>

      <div>
        <ul>
          <li onClick={() => handleFilter('color', 'red')} style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></li>
          <li onClick={() => handleFilter('color', 'blue')} style={{ backgroundColor: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></li>
          <li onClick={() => handleFilter('color', 'yello')} style={{ backgroundColor: 'yello', borderRadius: '50%', width: '20px', height: '20px' }}></li>
          <li onClick={() => handleFilter('color', 'green')} style={{ backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px' }}></li>
         
         
          {/* Add more colors */}
        </ul>
      </div>
      </div>
      <div className="product-container">
        {filteredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className='cat'>
            <p>{product.name}</p>
            <p>{product.price}</p>
            {/* Display other product details */}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

// ProductsPage.js
// ... (other imports and code)

const applySortingAndFiltering = (products, sortBy, filters) => {
    let sortedProducts = [...products];
  
    // Sorting logic
    if (sortBy === 'A-Z') {
      sortedProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortBy === 'Z-A') {
      sortedProducts.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
  
    // Filtering logic based on selected filters
    if (filters.category !== 'All') {
      sortedProducts = sortedProducts.filter((product) => product.category === filters.category);
    }
  
    if (filters.price !== '') {
      // Assuming 'price' is a numerical property of products
      sortedProducts = sortedProducts.filter((product) => product.price <= parseInt(filters.price, 10));
    }
  
    if (filters.color !== '') {
      sortedProducts = sortedProducts.filter((product) => product.color === filters.color);
    }
  
    return sortedProducts;
  };
  
  export default ProductsPage;
  
