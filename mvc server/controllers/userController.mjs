
import User from '../models/userModel.mjs';
import  bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"

// fetch all users
let index =async (req, res) => {
   try {
    let users= await User.find();
    if (users) {
      res.status(200).json({message:"Our users",users:users});
      
    } else {
      res.status(500).json({message:"Failed to fetch users"});
      
    }
   
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

// add user
let Signup =async (req, res) => {
   try {
    const { username , email, password}=req.body;
    // checking if the user doesn't exist
    let checkUser= await User.findOne({email:email});
    if (checkUser) {
      res.status(200).json({message:"User already exist from this email. Please login..!"});
    } else {

      // hashing the password
      const hashPassword = bcrypt.hashSync( password , 10);
      console.log(hashPassword);
      let newUser= new User(
        {
        username,
        email,
        password:hashPassword,
        }
      )
      let adduser =await newUser.save();
      if (adduser) {
        res.status(200).json({message:"Registration is sucessfull.",user:adduser});
        
      } else {
      
        res.status(500).json({message:"Failed to register user"});
      }
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

//login

let Login =async (req, res) => {
   try {
    const {  email, password}=req.body;
    // checking if the user doesn't exist
    let checkUser= await User.findOne({email:email});
    if (checkUser) {
      // hashing the password

      const checkPassword = bcrypt.compareSync( password   , checkUser.password) // true/false
      console.log(checkPassword)
      console.log(checkUser)
    
      if (checkPassword) {
        const token= await jwt.sign({checkUser}, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({message:"Login success...!",user:checkUser,token:token});
      } else {
      
        res.status(401).json({message:"Invalid Credentials"});
      }
    } else {
      res.status(404).json({message:"User not found. Please Signup..!"});
      
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}






//login

let DeleteUser =async (req, res) => {
   try {
    const {  id}=req.params;
    // checking if the user doesn't exist
    let delUser= await User.findByIdAndDelete(id);
    if (delUser) {
     
        res.status(200).json({message:"User deleted successfully...!",user:delUser});
        
      
    } else {
      res.status(400).json({message:"Failed to delete user!"});
      
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}


const userController= {
    index,
    Signup,
    Login,
    DeleteUser
  
 }


 export default userController;