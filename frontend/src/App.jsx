import { Routes, Route } from 'react-router-dom';

// Import All Page Components
import LoginPage from './pages/LoginPage';
import DashboardHomePage from './pages/DashboardHomePage';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import CustomerListPage from './pages/CustomerListPage';
import AddCustomerPage from './pages/AddCustomerPage';
import EditCustomerPage from './pages/EditCustomerPage';
import RegistrationPage from './pages/RegistrationPage';
import CartPage from './pages/CartPage';

// Import Layout & Helper Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} /> 
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* These are the nested pages that will have the navbar */}
        <Route index element={<DashboardHomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="add-product" element={<AddProductPage />} />
        <Route path="edit-product/:id" element={<EditProductPage />} />
        <Route path="customers" element={<CustomerListPage />} />
        <Route path="add-customer" element={<AddCustomerPage />} />
        <Route path="edit-customer/:id" element={<EditCustomerPage />} />
        <Route path="cart" element={<CartPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;