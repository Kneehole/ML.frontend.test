import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import './_items-list-item.scss'

const Currency = require("../../utils/currency")

const ItemsListItem = ({item}) => {

    const price = Currency.getSymbol(item.price.currency) + ' ' + (item.price.amount + item.price.decimals)
    return (
        <Container className="list_item">
            <Row>
                <Image src={item.picture} className="item_image" />
                <Col  xs sm md>
                    <div className="price_shipping">
                        <div className="price">{price}</div>
                        <div className="free_shipping" />
                    </div>
                    <div className="title">{item.title}</div>
                </Col>
                <Col sm={2} md={2} className="d-none d-sm-block">
                    <div className="address">{item.address_state}</div>
                </Col>
            </Row>
             
        </Container>
    )
}

export default ItemsListItem