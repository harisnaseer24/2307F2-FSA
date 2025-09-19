import fs from  'node:fs';



// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const products=data.products;




let index =(req, res) => {
   try {
     res.status(200).json({message:"Showing our products",products:products});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

let singleProduct =(req, res) => {
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
}





const productController= {
    index,
    singleProduct
 }


 export default productController;