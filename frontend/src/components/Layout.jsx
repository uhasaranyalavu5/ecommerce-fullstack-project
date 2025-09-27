// frontend/src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;