import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="selected-products">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    min={1}
                    onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                  />
                  <p>Color: {item.color}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-price">
          <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
