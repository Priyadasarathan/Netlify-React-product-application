import React, { useCallback, useEffect, useRef, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './Product.scss'
import GridView from './gridView/GridView';
import ListView from './listView/ListView';
import axios from 'axios';
// import { Link } from 'phosphor-react';

function Product() {
    const [products, setProducts] = useState([]);
    const [gridProducts, setGridProduct] = useState(true);
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1);
    const getProductRef = useRef();

    useEffect(() => {
        if (getProductRef.current) {
            getProductRef.current.abort();
        }
    }, []);

    const getProducts = useCallback(async () => {
        try {
            if (getProductRef.current) {
                getProductRef.current.abort();
            }
            getProductRef.current = new AbortController();
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                signal: getProductRef.current.signal
            }
            let response = await axios.get(`https://strapi-store-server.onrender.com/api/products?page=${page}`)
            const json = response?.data?.data || []
            if (json) {
                setProducts(json || []);
                setTotalPage(response?.data?.meta?.pagination?.pageCount)

            }
        } catch (error) {
            console.log(error.message, 'error')
        }

    }, [page]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);


    return (
        <>

            <div className='select-wrap '>
                <form className='form-control'>

                    <div>
                        <label>Select Product
                            <input />
                        </label>
                    </div>
                    <div>
                        <label>Select Category
                            <input />
                        </label>
                    </div>
                    <div>
                        <label>Select Company
                            <input />
                        </label>
                    </div>
                    <div>
                        <label>Sort by
                            <input />
                        </label>
                    </div>
                    <div>
                        <label>Select Price
                            <input />
                        </label>
                    </div>
                    <div>
                        <label>Free Shipping
                            <input />
                        </label>
                    </div>
                    <div>
                        <button>Search</button>
                    </div>
                    <div>
                        <button>Reset</button>
                    </div>
                </form>
            </div>

            <div>
                <button onClick={() => setGridProduct(true)}>Grid</button>

                <button onClick={() => setGridProduct(false)}>List</button>
            </div>
            {
                gridProducts ?
                    <GridView products={products} /> :
                    <ListView products={products} />

            }
            {
                Array(totalPage).fill().map((_, idx) => <button onClick={() => setPage(idx+1)} key={idx}>{idx+1}</button>)
            }

        </>
    );
}

export default Product;
