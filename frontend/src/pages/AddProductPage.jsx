import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AddProductPage() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/products/', formData);
      navigate('/'); // Go back to the product list after adding
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Add New Product</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <label>Price</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          <button type="submit">Save Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;