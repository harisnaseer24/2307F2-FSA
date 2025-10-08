import fs from  'node:fs';
import Product from '../models/productModel.mjs';



// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const products=data.products;



// fetch all products
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




//get product by id
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

//get product by brand
let getProductByBrand = async (req, res) => {
    try {
let brand= req.params.brand;
let products = await Product.find({brand:brand}) // find returns an array of objects
if (products.length > 0) {
  res.status(200).json({message:`Showing products of ${brand}`,products:products});
} else {
  res.status(404).json({message:"No product found"});
}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

//delete a product
let deleteProduct = async (req, res) => {
    try {
let id= req.params.id;
let delProduct = await Product.deleteOne(id)
if (delProduct) {
  res.status(200).json({message:"Product deleted successfully..!",product:delProduct});
} else {
  res.status(404).json({message:"No product found"});
}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

// editProduct - put request
let editProduct =async (req, res) => {
   try {
    const id=req.params.id;
    const prod= await Product.findById(id);
if (prod) {

    const product=req.body;
    let updatedProduct= new Product(
      {

        _id:id,
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
    let updateprod =await Product.updateOne({_id:id},updatedProduct);
    if (updateprod) {
      res.status(200).json({message:"Product updated successfully",product:updateprod});
      
    } else {
      res.status(500).json({message:"Failed to edit product"});
      
    }
      
    } else {
      res.status(500).json({message:"Failed to edit product"});
      
    }
    

  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}
// Image Upload
// add product
let addProductWithImage =async (req, res) => {
   try {
    //  console.log(req.file.path)
console.log(req.files)
let imagesArray= [];
req.files.forEach(element => {
  imagesArray.push(element.path)
});
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
        // images:[req.file.path],
        images:imagesArray,

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


const productController= {
    index,
    addProduct,
    singleProduct,
    getProductByBrand,
    deleteProduct,
    editProduct,
    addProductWithImage
 }


 export default productController;