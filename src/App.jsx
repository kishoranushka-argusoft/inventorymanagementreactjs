import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Categories from './pages/categories'
import Sellers from './pages/Sellers'
import Transactions from './pages/transactions'
// import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <BrowserRouter>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App