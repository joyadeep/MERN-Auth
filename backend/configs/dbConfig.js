const mongoose=require('mongoose');


const connectDB=async()=>{
    try {
        const conn=await mongoose.connect("mongodb+srv://admin:admin@cluster0.r0ujjmf.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
         });
         console.log(`Connected with database successfully`);
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB;
