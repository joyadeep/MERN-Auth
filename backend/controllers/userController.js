const User=require('../models/UserModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const SECRET_KEY="1Qaq%*&^%cdfoort\\][]["


const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existinguser;
    try {
        existinguser=await User.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if(existinguser){
        return res.status(400).json({message:"User already exist"})
    }
const hashedPassword=bcrypt.hashSync(password);
    const user=new User({
  name,email,password:hashedPassword
    });
    try {
        await user.save();
    } catch (error) {
        console.log("Error",error);
    }
    return res.status(201).json({message:user});
}


const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordMatch=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordMatch)
        {
            return res.status(400).json({message:"invalid email/password"})
        }
        const token=jwt.sign({id:existingUser._id},SECRET_KEY,{
            expiresIn:"35s"
        })

        if (req.cookies[`${existingUser._id}`]){
            req.cookeis[`${existingUser._id}`]=""
        }

        res.cookie(String(existingUser._id),token,{
            path:'/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly:true,
            sameSite:'lax'
        })

        return res.status(200).json({message:"Logged in successfully ",data:existingUser,token})
    } catch (error) {
        console.log(error);
    }
   
}

const verifyToken=async(req,res,next)=>{

    const cookies=req.headers.cookie;
    const token=cookies.split("=")[1];
    if(!token){
        return res.status(404).json({message:"No token found"});
    }
    jwt.verify(String(token),SECRET_KEY,(err,user)=>{
        if(err){
            res.status(400).json({message:"invalid token"})
        }
        console.log(user.id);
        req.id=user.id;
    });
    next();
}

const getUser=async(req,res,next)=>{
    const userid=req.id;
    try {
        const result=await User.findById(userid,"-password");
        if (!result){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({message:"user found",data:result});
    } catch (error) {
        console.log(error);
    }

}

const refreshToken=async(req,res,next)=>{
    const cookies=req.headers.cookie;
    const prevToken=cookies.split("=")[1];
    if(!prevToken){
        return res.status(404).json({message:"No token found"});
    }
    jwt.verify(String(prevToken),SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Authentication Faild"})
        }
        res.clearCookie(`${user.id}`);
        res.cookie[`${user.id}`]="";

        const token=jwt.sign({id:user.id},SECRET_KEY,{
            expiresIn:"35s"
        })

        res.cookie(String(user.id),token,{
            path:'/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly:true,
            sameSite:'lax'
        })

        req.id=user.id;
        next();
    });
}

exports.signup=signup;
exports.signin=signin;
exports.verifyToken=verifyToken;
exports.getUser=getUser;
exports.refreshToken=refreshToken;