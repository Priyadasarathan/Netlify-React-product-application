// import { response } from 'express';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
// import Cart from '../../cart/Cart';
import './SingleProduct.scss'


const SingleProduct = () => {
    const { id } = useParams()
    const [single, setSingle] = useState([]);
    // const [cartPage, setCartPage] = useState([]);


    async function singleProduct() {
        try {
            let response = await axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            const json = response?.data || []
            setSingle(json)
            // fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
        }
        // .then((response)=>response.json())
        // // .then((json)=>json.data)
        // .then((json)=>setSingle(json?.data)) 
        catch (err) {
            console.log(err.message, 'error from api')
        }
    }

    useEffect(() => {
        singleProduct()
    }, [])

    // console.log(single?.data?.attributes?.description, 'products');

    //Add to cart function

    function addToCart(single) {
        // Retrieve existing cart items from localStorage or initialize as an empty array
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Add the new item to the existing items
        const updatedCartItems = [...existingCartItems, single];
        // Store the updated items back into localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        console.log(single, 'single product of the add to cart');

        // function deletecart (single){
        //     //retrieve existing cart items from localstorage or initialize as an empty array
        //     const existingcartitems = json.parse(localstorage.getItem('cartitems')|| '[]');
        //     //add the new item to the existing items
        //     const updatedcartitems = [...existingcartitems, single];
        //     //store the updated items back into localstorage
        //     localstorage.setItem('cartitems', json.stringify(updatedCartItems));
        //     console.log(single, 'single of life but now i am committed');
        // }

        toast.success('🦄 Product successfully add to cart', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    return (
        <>
            {
                single?.data?.attributes && (

                    <div className='container single-product'>
                        <div className=' d-flex mt-5'>
                            <div className='wrap-image'>
                                <img src={single?.data?.attributes?.image} width='600px' height='400px' />
                            </div>
                            <div className='single-product-content'>
                                <h3>{single?.data?.attributes?.title}</h3>
                                <h3>{single?.data?.attributes?.company}</h3>
                                <h4> $ {(parseFloat(single?.data?.attributes?.price) / 100).toFixed(2)}</h4>
                                <h6>{single?.data?.attributes?.description}</h6>
                                <button className='p-2 bg-success text-white' onClick={() => addToCart(single)}>Add to cart</button>
                                {/* <button className='p-2 bg-success text-white' onClick={(()=><Cart passingid={single?.data?.id}/>)}>Add to Cart</button> */}
                                {/* <button className='p-2 bg-success text-white' onClick={() =>(single)}>Add to Cart</button> */}
                                {/* <button className='p-2 bg-success text-white' onClick={(()=> {<Cart passingid={single}/>})}>Add to Cart</button> */}
                            </div>
                        </div>
                    </div>
                )}
            {/* {<Cart passingid={single}/>} */}
        </>
    )
}


export default SingleProduct