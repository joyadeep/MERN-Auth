import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [value,setValue]=useState();
  return (
    <AppBar elevation={0} position="sticky">
        <Toolbar>
            <Typography variant='h4' sx={{letterSpacing:"-1px"}} flexGrow={1}>MERN Auth</Typography>
            <Box>
                <Tabs textColor='inherit' indicatorColor='secondary' onChange={(e,val)=>{setValue(val)}} value={value}>
                    <Tab to="/login" label="Login" LinkComponent={Link} />
                    <Tab to="/signup" label="Signup" LinkComponent={Link}/>
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header