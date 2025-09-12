// const express = require('express')
import express from 'express'
import fs from  'node:fs';



// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const products=data.products;



const app = express()
const port = 3000
//body parser middleware(to parse json data in request body)
app.use(express.json())


//request,
// request.params.id 
// request.query.id 
// request.body.data

//  response.send()
// response.json()
// response.status(200).send()


app.get('/', (req, res) =>{

  try {
     res.status(200).send('Hello World!');
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
 
})

// Route Parameters (They are compulsory)
// app.get('/product/:id', (req, res) => {
// res.json({name:"Product no "+ req.params.id})
// })
// //Query Parameters (They are optional)
// app.get('/categories', (req, res) => {
// if (req.query.name) {

//   res.json({name:"Category :"+req.query.name})
// } else {
//   res.json({name:"All Categories "})

// }
// })
// //Request Body (They are used to send data to server)

// app.get('/contact', (req, res) => {
// // const name=req.body.name;
// // const age=req.body.age;
// // const city=req.body.city;
// //Destructuring
// const {name ,age ,city}=req.body;
//   res.json({name:name, age:age,city:city})
// })

// 12-9-2025
app.get('/products', (req, res) =>{

  try {
     res.status(200).json({message:"Showing our products",products:products});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }

})

//find product by id:
app.get('/product/:id', (req, res) =>{
  try {
let id= req.params.id;
let product = products.find((prd)=>{
  return prd.id== id
})
if (product) {
  res.status(200).json({message:"Product found",product:product});
} else {
  res.status(404).json({message:"No product found"});
}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// create 3 routes
// 1.  create an api for getting the user data from CNIC using route parameter.
// 2.  create an api for getting the user preference whether he provides his interest in birds otherwise send fishes in response (use query parameter like ?interest=birds).
//3. create an api for getting the movies data from request body and send the same data in   response. 

//Use proper error handling and status codes in response.
//AI tools are not allowed.