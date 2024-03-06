import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AdminLogin from './AdminLogin';
import AdminForgotPassword from './AdminForgotPassword';
import AdminChangePassword from './AdminChangePassword';
import AdminCategory from './AdminCategory';
import AdminAddCategory from './AdminAddCategory';
import AdminEditCategory from './AdminEditCategory';
import AdminProduct from './AdminProduct';
import AdminAddProduct from './AdminAddProduct';
import AdminEditProduct from './AdminEditProduct';
import AdminUsers from './AdminUsers';
import AdminViewProductDetail from './AdminViewProductDetail';
import AdminOrderPrint from './AdminOrderPrint';
import AdminHome from './AdminHome';
import AdminLogout from './AdminLogout';
import AdminOrdersDetail from './AdminOrdersDetail';
import AdminOrders from './AdminOrders'
import NotFound from './NotFound'; 
import { withCookies } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MyRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/change-password" element={<AdminChangePassword />} />
        <Route path="/logout" element={<AdminLogout />} />
        <Route path="/forgot-password" element={<AdminForgotPassword />} />       
        <Route path="/category" element={<AdminCategory />} />       
        <Route path="/add-category" element={<AdminAddCategory />} />
        <Route path="/edit-category/:categoryid" element={<AdminEditCategory />} />
        <Route path="/product" element={<AdminProduct />} />
        <Route path="/add-product" element={<AdminAddProduct />} />
        <Route path="/edit-product/:productid" element={<AdminEditProduct />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/view-product-detail/:productid" element={<AdminViewProductDetail />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/order-print" element={<AdminOrderPrint />} />
        <Route path="/orders-detail/:orderid" element={<AdminOrdersDetail />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
const MyRouterWithCookies = withCookies(MyRouter);
root.render(<MyRouterWithCookies />);