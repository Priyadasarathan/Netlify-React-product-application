import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { Col, Container, Row } from 'react-bootstrap';

const ListView = ({ products }) => {
    return (
        <div className='grid-format'>
            {products.length > 0 ? (
                products.map(product => (
                    <Container key={product.id}>
                        <Link to={`/product/${parseInt(product.id)}`} style={{ textDecoration: 'none' }}>
                            <Row>
                                <Col>
                                    <img src={product.attributes.image} alt={product.attributes.title} />
                                    <div>
                                        <h4>{product.attributes.title}</h4>
                                        <h4 className='company'>{product.attributes.company}</h4>
                                    </div>
                                    <h5>$ {(parseFloat(product.attributes.price) / 100).toFixed(2)}</h5>
                                </Col>
                            </Row>
                        </Link>
                    </Container>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default ListView;
