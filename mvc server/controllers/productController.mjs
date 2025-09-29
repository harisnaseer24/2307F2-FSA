import fs from  'node:fs';
import Product from '../models/productModel.mjs';



// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const products=data.products;




let index =async (req, res) => {
   try {
    let products= await Product.find();
    if (products) {
      res.status(200).json({message:"Our products",products:products});
      
    } else {
      res.status(500).json({message:"Failed to fetch product"});
      
    }
  
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

// add product
let addProduct =async (req, res) => {
   try {

    const product=req.body;
    let newProduct= new Product(
      {
        title:product.title,
        description:product.description,
        price:product.price,
        discount:product.discount,
        stock:product.stock,
        brand:product.brand,
        category:product.category,
        rating:product.rating,
        images:product.images,

      }
    )
    let addprod =await newProduct.save();
    if (addprod) {
      res.status(200).json({message:"Product added successfully",product:addprod});
      
    } else {
      res.status(500).json({message:"Failed to add product"});
      
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}





let singleProduct = async (req, res) => {
    try {
let id= req.params.id;
let product = await Product.findById(id)
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
    addProduct,
    singleProduct
 }


 export default productController;