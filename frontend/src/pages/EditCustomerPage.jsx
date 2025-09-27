import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

function EditCustomerPage() {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await api.get(`/api/customers/${id}/`);
      setFormData(response.data);
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/customers/${id}/`, formData);
    navigate('/customers');
  };

  return (
    <div>
      <div className="page-header"><h1>Edit Customer</h1></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <label>Last Name</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          <button type="submit">Update Customer</button>
        </form>
      </div>
    </div>
  );
}

export default EditCustomerPage;