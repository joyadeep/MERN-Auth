const express=require('express');
const { signup, signin, verifyToken, getUser, refreshToken } = require('../controllers/userController');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({message:"user get request"})
})

router.post("/signup",signup);
router.post("/login",signin);
router.get("/user",verifyToken,getUser);
router.get("/refresh",refreshToken,verifyToken,getUser);
module.exports=router;