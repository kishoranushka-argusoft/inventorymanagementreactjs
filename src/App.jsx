import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Categories from './pages/categories'
import Sellers from './pages/Sellers'
import Transactions from './pages/transactions'
import AddProductForm from './pages/form/addproductform'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from './pages/form/categoryform'
// import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <BrowserRouter>
      {/* <Sidebar /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/addproduct" element={<AddProductForm name="Add" />} />
        <Route path="/editproduct" element={<AddProductForm name="Edit" />} />
        <Route path="/addcategory" element={<CategoryForm />} name="Add"/>
        <Route path="/editcategory" element={<CategoryForm />} name="Edit" />
      </Routes>
    </BrowserRouter>
  );
}

export default App