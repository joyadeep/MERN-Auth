const express=require("express")
const app=express();
const connectDB=require('./configs/dbConfig')
const cors=require('cors');
const userRouter=require('./routes/userRoutes')
const cookieParser=require('cookie-parser')


//middlewares
app.use(express.json());
connectDB();
app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(cookieParser());
app.use('/api',userRouter);



app.listen(5000,()=>{
    console.log("server running at port 5000");
})