import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../pages/logo/Logo';


const Header = () => {

    const { pathname } = useLocation()
    const links = [
        // {
        //     title: <h3 className='logo-c p-0'>C</h3>,
        //     path: '/',
        //     isActive: pathname === '/' && true
        // },
        {
            title: "home",
            path: '/',
            isActive: pathname === '/' && true
        },
        {
            title: "about",
            path: '/about',
            isActive: pathname.includes('/about') && true
        },
        {
            title: "product",
            path: '/product',
            isActive: pathname.includes('/product') && true
        },
        {
            title: "cart",
            path: '/cart',
            isActive: pathname.includes('/cart') && true
        },
        // {
        //     title:<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRezl2LYIF9Am9ClTafAppqrq9CgskQ1FLKQ-p5f_C1skyj1WQmh68O&usqp=CAE&s' width='30px' alt="Cart"/>,
        //     path: '/cart',
        //     isActive: pathname.includes('/cart') && true
        // },

    ]
    return (
        <>
            <div className='header-wrap py-1'>
                <div className="container">

                    <div className='navbar  '>
                        <h3 className='logo-c'><Logo/></h3>
                        <div className='d-flex gap-5 nav-links'>

                            {links.map((curr, idx) => (
                                <li key={idx} className={`${curr.isActive && ''}`}
                                ><Link to={curr.path} className={`${curr.isActive && 'active'}`}>{curr.title}</Link></li>
                            ))}
                        </div>
                        <div>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRezl2LYIF9Am9ClTafAppqrq9CgskQ1FLKQ-p5f_C1skyj1WQmh68O&usqp=CAE&s' width='30px' alt="Cart" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header