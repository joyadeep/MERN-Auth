import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Typography} from '@mui/material'
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Welcome from './components/Welcome';


function App() {
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="/login" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/welcome" element={<Welcome/>} />
      </Routes>
    </main>
    </>
  )
}

export default App
