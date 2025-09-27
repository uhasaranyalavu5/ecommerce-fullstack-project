import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

function EditProductPage() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    // Fetch the specific product's data when the page loads
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/products/${id}/`, formData);
      navigate('/'); // Go back to the product list after updating
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Edit Product</h1>
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
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}

export default EditProductPage;