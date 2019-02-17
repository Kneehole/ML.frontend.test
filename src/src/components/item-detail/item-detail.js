import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import Price from '../price/price'

import './_item-detail.scss'

const Condition = require("../../utils/item_condition")

/** Component of an item detail 
 * @property {array} item - the item to display
 * @property {function} addToCartClick - callback for handling buy action
 */
const ItemDetail = ({item, addToCartClick}) => {
    
    /** Handle click and forward upwards*/
    const addToCartHandler = () => {
        addToCartClick()
    }

    // Empty item control 
    if (!item || Object.keys(item).length === 0) {
        return (<div></div>)
    }

    return (
        <Container className="item_detail_container">
            <Row>
                <Col xs={6} sm md={9} className="image_col">
                    <Image src={item.picture} alt={item.title} className="image" />
                </Col>
                <Col xs={6} sm md className="right_col"> 
                    <div className="condition_sold"><span>{Condition.getDescription(item.condition)}</span> - <span>{item.sold_quantity}</span> vendidos</div>
                    <h1 className="title">{item.title}</h1>
                    <div className="price"><Price  price={item.price} /></div>
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