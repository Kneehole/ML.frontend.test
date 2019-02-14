import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import './_item-detail.scss'

const Currency = require("../../utils/currency")

const ItemDetail = ({item}) => {
    
    // empty item
    if (!item || Object.keys(item).length === 0) {
        return (<div></div>)
    }

    const price = Currency.getSymbol(item.price.currency) + ' ' + (item.price.amount + item.price.decimals)
    return (
        <Container className="item_detail_container">
            <Row>
                <Col xs={6} sm md={8}>
                    <Image src={item.picture} className="image" />
                </Col>
                <Col xs={6} sm md={4} className="right_col"> 
                    <div className="state_sold">{item.state} - {item.sold_count} vendidos</div>
                    <div className="title">{item.title}</div>
                    <div className="price">{price}</div>

                    <Button className="buy_button">Comprar</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="desc_title">Descripción del producto</div>
                    <div className="description">{item.description}</div>
                </Col> 
            </Row>
        </Container>
    )
}

export default ItemDetail