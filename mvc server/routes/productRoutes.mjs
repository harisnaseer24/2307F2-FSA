import express from 'express'
import productController from '../controllers/productController.mjs';

const productRouter= express.Router();


// productRouter.get("route",function)
productRouter
.get("/",productController.index)
.post("/add",productController.addProduct)
.get("/:id",productController.singleProduct)



export default productRouter;