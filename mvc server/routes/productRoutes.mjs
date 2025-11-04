
import express from 'express'
import productController from '../controllers/productController.mjs';
import { upload } from '../cloudinaryConfig.mjs';
import auth from '../controllers/middlewares/auth.mjs';

const productRouter= express.Router();

// productRouter.get("route",function)
productRouter
//get requests


.get("/",productController.index)
// .get("/",auth,productController.index)


.get("/:id",productController.singleProduct)
.get("/brand/:brand",productController.getProductByBrand)

//post requests
.post("/add",productController.addProduct)
//multer middleware
// .post("/addproduct",  upload.single("image")   ,productController.addProductWithImage)
.post("/addproduct", auth, upload.array("image",5)   ,productController.addProductWithImage)


//delete requests

.delete("/:id",productController.deleteProduct)

//patch requests  
// .patch("/:id",productController.changePrice)


//put requests
.put("/:id",productController.editProduct)


export default productRouter;