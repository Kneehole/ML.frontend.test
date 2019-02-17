import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import './_item-detail.scss'

const Currency = require("../../utils/currency")
const Condition = require("../../utils/item_condition")

const ItemDetail = ({item, addToCartClick}) => {
    
    const addToCartHandler = () => {
        addToCartClick()
    }

    // empty item
    if (!item || Object.keys(item).length === 0) {
        return (<div></div>)
    }

    const price = Currency.getSymbol(item.price.currency) + ' ' + (item.price.amount + item.price.decimals)
    return (
        <Container className="item_detail_container">
            <Row>
                <Col xs={6} sm md={9} className="image_col">
                    <Image src={item.picture} alt={item.title} className="image" />
                </Col>
                <Col xs={6} sm md className="right_col"> 
                    <div className="condition_sold"><span>{Condition.getDescription(item.condition)}</span> - <span>{item.sold_quantity}</span> vendidos</div>
                    <h1 className="title">{item.title}</h1>
                    <p className="price">{price}</p>

                    <Button className="buy_button" onClick={addToCartHandler}>Comprar</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="desc_title">Descripción del producto</h2>
                    <p className="description">{item.description}</p>
                </Col> 
            </Row>
        </Container>
    )
}

export default ItemDetail