import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const ListView = ({products}) => {
  return (
    <div className='grid-format'>

    {products.length > 0 ? (
        products.map(product => (

            <Container key={product.id}>
                <Row>
                    <Col>
                        <img src={product.attributes.image} />
                        <div>

                            <h4>{product.attributes.title}</h4>
                            <h4 className='company'>{product.attributes.company}</h4>
                        </div>
                        <h5>$ {product.attributes.price}</h5>
                    </Col>
                </Row>
            </Container>
        ))
    ) : (
        <div>No data available</div>
    )}
</div>
  )
}

export default ListView