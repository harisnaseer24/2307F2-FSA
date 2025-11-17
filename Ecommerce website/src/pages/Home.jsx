// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products,setProducts]= useState([])
  const [categories,setCategories]= useState([])
// api - call to fetch all products


const   getProducts=async ()=>{
  try {
const response= await axios.get("https://2307f2-fsa-deployment-production.up.railway.app/product");
console.log(response.data)
setProducts(response.data.products)
    
  } catch (error) {
    console.log("Something went wrong",error)
  }
}

//Getting unique categories from products
products.map((item)=>{
  let category={
    title:item.category,
  }

  if(!categories.find((cat)=>cat.title===item.category)){
    setCategories([...categories,category])
  }
  console.log(category)
})


useEffect(()=>{
  getProducts();
},[])


  return (
    <div>
      <Banner />
      <Categories categories ={categories}/>
      <BestSelling />
      <Products allproducts={products} />
      <Footer/>
    </div>
  );
};

export default Home;
