// frontend/src/pages/CartPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart/');
      setCart(response.data);
      calculateTotal(response.data.items);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  const calculateTotal = (items) => {
    const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.product_price), 0);
    setTotal(totalValue);
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/api/cart/items/${itemId}/`);
      fetchCart(); // Refresh cart after removing item
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  };

  if (!cart) {
    return <p>Loading your cart...</p>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>₹{item.product_price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.quantity * item.product_price).toFixed(2)}</td>
                  <td className="actions">
                    <button onClick={() => removeItem(item.id)} className="delete-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
            Total: ₹{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;