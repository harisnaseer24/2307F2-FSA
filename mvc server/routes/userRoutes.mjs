import express from 'express'
import userController from '../controllers/userController.mjs';

const userRouter= express.Router();

// productRouter.get("route",function)
userRouter
//get requests
.get("/",userController.index)


//post requests
.post("/signup",userController.Signup)
.post("/login",userController.Login)



.post("/sendEmail",userController.sendEmail)



//delete Request

.delete("/:id",userController.DeleteUser)
export default userRouter;
