import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const GridView = ({ products }) => {
    return (

        <div className='product-cards'>
            {products?.length > 0 ? (
                products.map(product => (
                    <div key={product.id} className='products'>
                        <div className='cards'>
                            <Link to={`/product/${parseInt(product.id)}`} style={{ textDecoration: 'none' }}>
                                <Card
                                    style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.attributes.image} className='product_img' width='300px' />
                                    <Card.Body>
                                        <Card.Title>{product.attributes.title}</Card.Title>
                                        <Card.Text>$ {(parseFloat(product.attributes.price) / 100).toFixed(2)}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No products available</div>
            )}
        </div>
    )
}

export default GridView