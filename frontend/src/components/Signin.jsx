import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Signin = () => {
    const [inputs,setInputs]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate();

    const sendRequest= async()=>{
        const res=await axios.post("http://localhost:5000/api/login",{
            email:inputs.email,
            password:inputs.password
        }).catch((err)=>console.log(err));
        const data=await res.data;
        return data;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    sendRequest().then(()=>navigate("/welcome"));

    }
    const handleChange=(e)=>{
        setInputs(preval=>({
            ...preval,
            [e.target.name]:e.target.value
        }))
    }
  return (
    <Box>
        <Paper sx={{width:"40%",textAlign:'center',mx:"auto",mt:5,px:3,py:2}}>
        <Typography variant='h3' letterSpacing="-1px" mb={5}>Login</Typography>
        <form onSubmit={handleSubmit}>
           <Box sx={{display:'flex',flexDirection:'column',gap:3}}>
            <TextField type="email" name="email" onChange={handleChange} value={inputs.email} label="Email" fullWidth />
            <TextField type="password" name="password" onChange={handleChange} value={inputs.password} label="Password" fullWidth />
            <Button variant="contained" type="submit" sx={{textTransform:'none',fontSize:"20px"}} disableElevation size="medium">Login</Button>
           </Box>
        </form>
        </Paper>
    </Box>
  )
}

export default Signin