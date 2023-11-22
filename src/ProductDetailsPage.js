import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import { getProductById } from './api';
import './singleproduct.css';
import { useCart } from './CartContext';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [availableColors, setAvailableColors] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        if (data && data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].url);
        }

        if (data && data.colors && data.colors.length > 0) {
          setAvailableColors(data.colors);
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        color: selectedColor,
        // Add other necessary properties
      };

      addToCart(itemToAdd); // Add the selected product to the cart via CartContext

      // Navigate to the CheckoutPage after adding to the cart
      navigate('/checkout');
    }
  };

  return (
    <div className='product-details'>
      {product ? (
        <div className='colm'>
          <div className="image-gallery">
          <button onClick={() => navigate(-1)}>Back to products</button>

            <img src={selectedImage} alt={product.name} className="big-image" />

            <div className="thumbnails">
              {product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={product.name}
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(image.url)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Stock: {product.stock}</p>

            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min={1}
                onChange={handleQuantityChange}
              />
            </div>

            <div>
              <p>Available Colors:</p>
              <div>
                {availableColors.map((color) => (
                  <span
                    key={color}
                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  ></span>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
