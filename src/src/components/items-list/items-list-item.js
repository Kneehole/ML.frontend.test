import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import './_items-list-item.scss'

const Currency = require("../../utils/currency")

/**
 * Function for callback 'onClick(item)'
 * @param {Object} item - The item clicked 
 */

/** Component of an item from the ItemsList  
 * @property {array} item - the item to display
 * @property {function} onClick - callback for item clicking detection
 */
const ItemsListItem = ({onClick, item}) => {
    return (
        <Container className="list_item" onClick={() => onClick(item)}>
            <Row>
                <Image src={item.picture} alt={item.title} className="item_image" />
                <Col xs sm md className="middle_container">
                    <div className="price_shipping">
                        <p className="price">{Currency.getFullPriceDescription(item.price)}</p>
                        <div className={item.free_shipping ? "free_shipping" : ""} />
                    </div>
                    <h2 className="title">{item.title}</h2>
                </Col>
                <Col sm={2} md={2} className="d-none d-sm-block">
                    <p className="address">{item.address_state}</p>
                </Col>
            </Row>
             
        </Container>
    )
}

export default ItemsListItem