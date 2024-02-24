import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/cart/Cart'
import Logo from '../pages/logo/Logo'
import Product from '../pages/products/Product'
import SingleProduct from '../pages/products/singleProduct/SingleProduct'
import './index.scss'
const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<h6></h6>} />
            <Route path='/' element={<h6>Home</h6>} />
            <Route path='/about' element={<h6>About</h6>} />
            <Route path='/product' >
                <Route index element={<Product />} />
                <Route path=":id" element={<SingleProduct />} />
            </Route>
            <Route path='/cart' element={<h6><Cart/></h6>} />
            <Route path='/cart' element={<h6>Cart Logo</h6>} />
        </Routes>
    )
}

export default AppRouter