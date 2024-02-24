
import React, { useEffect, useState } from 'react'
import './Cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';



function Cart() {
    const [cartGet, setCartGet] = useState();

    function cartitems() {
        const cartitem = JSON.parse(localStorage.getItem('cartItems') || []);
        setCartGet(cartitem);
    }
    useEffect(() => {
        cartitems()
    }, [])
    console.log(cartGet, 'cart single products ');

    const deleteCart = (id) => {
        alert('Are you sure want to delete')
        // console.log(id,'delete id what');
        const localItems = JSON.parse(localStorage.getItem('cartItems'))
        if (localItems) {
            //filter from localstorage 
            const filterItems = localItems.filter(item => item?.data?.id !== id)
            //update to localstorage
            localStorage.setItem('cartItems', JSON.stringify(filterItems))
            //set to state
            setCartGet(filterItems);
            toast('cart deleted!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            console.log('no cart item')
        }
    }

    return (
        <>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!cartGet?.length && cartGet?.map((carts, idx) =>
                            <tr key={idx}>
                                <td className='p-3'><img src={carts?.data?.attributes?.image} />
                                    <span className='p-3'>{carts?.data?.attributes?.category}</span></td>
                                <td className='pt-5'>{carts?.data?.attributes?.title}</td>
                                <td className='pt-5'>{carts?.data?.attributes?.company}</td>
                                <td className='pt-5'>Rs. {(parseFloat(carts?.data?.attributes?.price) / 100).toFixed(2)}</td>
                                <td className='pt-5' onClick={() => deleteCart(carts?.data?.id)}><FontAwesomeIcon icon={faTrashAlt} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Cart