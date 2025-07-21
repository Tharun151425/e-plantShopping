import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.cost.substring(1)) * item.quantity;
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="p-6">
  <div className="cart-header border p-10 rounded-4xl w-fit mb-10 shadow-xl flex flex-col justify-around items-center">
    <h2 className="text-green-600 font-semibold text-xl">
      Shopping Cart
    </h2>
    <div className="cart-summary bg-gray-100 mt-4 px-6 py-4 rounded-xl">
      <div className="text-gray-700">
        Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </div>
      <div className="cart-total text-gray-900 font-semibold">
        Total Amount: ${calculateTotalAmount()}
      </div>
    </div>
  </div>
</div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="btn-continue" onClick={handleContinueShopping}>Start Shopping</button>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-controls">
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button" 
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button" 
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${calculateTotalCost(item)}
                  </div>
                  <button 
                    className="cart-item-delete" 
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-actions">
          <button className="btn-continue" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="btn-checkout" onClick={() => setShowDialog(true)}>
            Checkout
          </button>
        </div>
      )}

      {showDialog && (
        <div className="checkout-dialog-overlay">
          <div className="checkout-dialog">
            <h3>Coming Soon!</h3>
            <p>Thank you for shopping with Paradise Nursery. Online checkout will be available soon.</p>
            <div className="checkout-dialog-actions">
              <button onClick={() => setShowDialog(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;


