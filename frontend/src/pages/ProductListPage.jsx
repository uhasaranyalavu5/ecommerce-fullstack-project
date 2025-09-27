import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}/`);
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };
    const addToCart = async (productId) => {
    try {
      await api.post('/api/cart/', { product_id: productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/add-product" className="button-link">Add New Product</Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <button onClick={() => addToCart(product.id)} className="button-link">Add to Cart</button>
                <Link to={`/edit-product/${product.id}`} className="button-link">Edit</Link>
                <button onClick={() => deleteProduct(product.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListPage;