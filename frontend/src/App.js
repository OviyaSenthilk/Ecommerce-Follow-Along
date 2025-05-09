import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {LoginPage,  SignupPage,Home, CreateProduct} from "./Routes/routes.js";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/product" element={<CreateProduct />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App