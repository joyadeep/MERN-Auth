import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Box, Typography } from '@mui/material';
axios.defaults.withCredentials=true;
const Welcome =() => {
  
  const[user,setUser]=useState();
  const[isFirstRender,setIsFirstRender]=useState(true)
  
  const refreshToken=async()=>{
    const res= await axios.get("http://localhost:5000/api/refresh",{
      withCredentials:true
    }).catch((err)=>{console.log(err);})
    const data=await res.data;
    return data;
  }
 

 
const getuser=async()=>{
  const res=await axios.get("http://localhost:5000/api/user",{withCredentials:true});
  return res.data.data;
}

useEffect(()=>{
  if(isFirstRender){
    setIsFirstRender(false);
    getuser().then((data)=>{console.log("DATA",data);
    setUser(data);
  }).catch((err)=>{console.log(err)});
  }
  const  interval=setInterval(()=>{
    refreshToken().then(data=>{console.log("REFRESH DATA",data)
  setUser(data);
  })
  },1000 * 29)
  
  return  ()=>clearInterval(interval)
},[])


  return (
   <Box>
    <Typography variant="h4">{user?.name}</Typography>
    <Typography variant="h5">{user?.email}</Typography>
    {/* <Typography>user name</Typography> */}
   </Box>
  )
}

export default Welcome