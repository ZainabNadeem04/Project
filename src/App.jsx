import React from 'react'
import Main from './Main'
import Cart from './Cart'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>
 
      {/* <Main/> */}
<BrowserRouter>
<Routes>
  <Route path='/' element={<Main/>} />
  <Route path='/cart' element={<Cart/>} />
</Routes>
</BrowserRouter>
      {/* <Cart/> */}
    
    </div>
  )
}

export default App
