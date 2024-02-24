import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Product.scss';
import GridView from './gridView/GridView';
import ListView from './listView/ListView';
import axios from 'axios';

function Product() {
    const [products, setProducts] = useState([]);
    const [gridProducts, setGridProduct] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const getProductRef = useRef();

    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState(0);

    const handleChange = (event) => setInputValue(event.target.value);
    const handleChangeSelect = (event) => setSelectedCategory(event.target.value);
    const handleCompany = (event) => setCompany(event.target.value);
    const handlePrice = (event) => setPrice(parseFloat(event.target.value));

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
            const response = await axios.get(`https://strapi-store-server.onrender.com/api/products?page=${page}&search=${inputValue}&category=${selectedCategory}&company=${company}${price !== 0 ? `&price=${price}` : ''}`);

            const json = response?.data?.data || [];
            if (json) {
                setProducts(json);
                setTotalPage(response?.data?.meta?.pagination?.pageCount);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [page, inputValue, selectedCategory, company, price]);

    useEffect(() => {
        getProducts();
    }, [getProducts, page, inputValue, selectedCategory, company, price]);
    console.log(price, 'price');
    return (
        <>
            <div className='select-wrap'>
                <form className='form-control'>
                    <div>
                        <label>Search Product
                            <input type='text' value={inputValue} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Select Category
                            <select value={selectedCategory} onChange={handleChangeSelect}>
                                <option value="">Select...</option>
                                <option value="all">all</option>
                                <option value="Tables">Tables</option>
                                <option value="Chairs">Chairs</option>
                                <option value="Kids">Kids</option>
                                <option value="Sofas">Sofas</option>
                                <option value="Beds">Beds</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Select Company
                            <select value={company} onChange={handleCompany}>
                                <option value="">Select...</option>
                                <option value="all">all</option>
                                <option value="Modenza">Modenza</option>
                                <option value="Luxora">Luxora</option>
                                <option value="Artifex">Artifex</option>
                                <option value="Comfora">Comfora</option>
                                <option value="Homestead">Homestead</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Select Company
                            <select value={company} onChange={handleCompany}>
                                <option vlaue > </option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label><span className='me-3'>Select Price</span>
                            <span>0</span>
                            <input type='range' className="" value={price} min="0" max="1000" onChange={handlePrice} />
                            <span>max:$ 1000.00</span>
                        </label>
                    </div>
                    <div>
                        <button onClick={() => {
                            setInputValue('');
                            setSelectedCategory('');
                            setCompany('');
                            setPrice(0);
                        }}>Reset</button>
                    </div>
                </form>
            </div>

            <div>
                <button onClick={() => setGridProduct(true)}>Grid</button>
                <button onClick={() => setGridProduct(false)}>List</button>
            </div>
            {gridProducts ? <GridView products={products} /> : <ListView products={products} />}
            {Array(totalPage).fill().map((_, idx) => <button onClick={() => setPage(idx + 1)} key={idx}>{idx + 1}</button>)}
        </>
    );
}

export default Product;
