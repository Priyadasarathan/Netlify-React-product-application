// import { response } from 'express';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const { id } = useParams()


    const [single, setSingle] = useState([]);

    async function singleProduct() {
        let response = await axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
        const json = response?.data || []
        setSingle(json)
        // fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
        // .then((response)=>response.json())
        // // .then((json)=>json.data)
        // .then((json)=>setSingle(json?.data)) 
    }
    useEffect(() => {
        singleProduct()
    }, [])

    console.log(single?.data?.attributes?.description, 'products');
    return (
        <>
            {
                single?.data?.attributes && (
                    <div className='d-flex mt-5'>
                        <div>
                            <img src={single?.data?.attributes?.image} width='700px' />

                        </div>
                        <div className=''>
                            <h3>{single?.data?.attributes?.title}</h3>
                            <h3>{single?.data?.attributes?.company}</h3>
                            <h4> $ {single?.data?.attributes?.price}</h4>
                            <h6>{single?.data?.attributes?.description}</h6>
                        </div>
                    </div>
                )}
        </>
    )
}

export default SingleProduct