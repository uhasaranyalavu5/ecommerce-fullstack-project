import React, { useState } from 'react';

function ProductList({ products, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', stock: '' });

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditFormData({ name: product.name, description: product.description, price: product.price, stock: product.stock });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value, });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingId, editFormData);
    setEditingId(null);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className={editingId === product.id ? "product-edit-form" : "product-item"}>
            {editingId === product.id ? (
              <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" value={editFormData.name} onChange={handleFormChange} required />
                <textarea name="description" value={editFormData.description} onChange={handleFormChange} />
                <input type="number" step="0.01" name="price" value={editFormData.price} onChange={handleFormChange} required />
                <input type="number" name="stock" value={editFormData.stock} onChange={handleFormChange} required />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
              </form>
            ) : (
              <div className="product-item-content">
                <span>{product.name} - ${product.price} (Stock: {product.stock})</span>
                <div className="product-item-actions">
                  <button onClick={() => handleEditClick(product)} className="edit-btn">Edit</button>
                  <button onClick={() => onDelete(product.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;