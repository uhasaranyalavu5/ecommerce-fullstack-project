// frontend/src/pages/AddProductPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/products');
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>Price</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <label>Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit" style={{marginTop: '20px'}}>Save Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;