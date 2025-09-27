import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await api.get('/api/customers/');
    setCustomers(response.data);
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await api.delete(`/api/customers/${id}/`);
      fetchCustomers();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Customers</h1>
        <Link to="/add-customer" className="button-link">Add New Customer</Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.first_name} {customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td className="actions">
                <Link to={`/edit-customer/${customer.id}`} className="button-link">Edit</Link>
                <button onClick={() => deleteCustomer(customer.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerListPage;