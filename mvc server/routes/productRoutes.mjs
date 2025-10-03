import express from 'express'
import productController from '../controllers/productController.mjs';

const productRouter= express.Router();

// productRouter.get("route",function)
productRouter
//get requests
.get("/",productController.index)
.get("/:id",productController.singleProduct)
.get("/brand/:brand",productController.getProductByBrand)

//post requests
.post("/add",productController.addProduct)


//delete requests

.delete("/:id",productController.deleteProduct)

//patch requests  
// .patch("/:id",productController.changePrice)


//put requests
.put("/:id",productController.editProduct)


export default productRouter;