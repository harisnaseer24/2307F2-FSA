import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/Protectedroute";
import AdminRoute from "./components/AdminRoute";

function App() {



    const [isLoggedin, setIsloggedin] = useState(false);
     const Logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsloggedin(false)
    navigate('/login');

  }
 
 useEffect(()=>{
     const token = localStorage.getItem("token");
  if(token){
    setIsloggedin(true)
}else{
    setIsloggedin(false)
    
  }
  },[])
  
  return (
    
    <>
      <Navbar isLoggedin={isLoggedin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About  />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />    
        <Route path="/login" element={<Login />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={

          <ProtectedRoute>
            <Cart />

          </ProtectedRoute>
        } />


        <Route path="/wishlist" element={<Wishlist />} />


        <Route path="/add" element={

          <AdminRoute>
            <AddProduct />

          </AdminRoute>
        } />

        
      </Routes>
    </>
  );
}

export default App;
