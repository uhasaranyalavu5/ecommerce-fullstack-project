// src/pages/DashboardHomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function DashboardHomePage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/stats/');
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-container">
        {stats ? (
          <>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>{stats.product_count}</p>
            </div>
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p>{stats.customer_count}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{stats.order_count}</p>
            </div>
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/products" className="button-link">Manage Products</Link>
      </div>
    </div>
  );
}

export default DashboardHomePage;