import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Row } from 'react-bootstrap'
import './_breadcrumb.scss'

/**
 * Represents a simple breadcrumb of titles
 * @param {array} items - Ordered list of Strings to use as breadcrumb 
 */
const Breadcrumb = ({items}) => {

    const viewItems = items.map(item => {
        return (
            <span key={item}>
                <Link to={"/items?search=" + item}>{item}</Link> {items[items.length-1] !== item ? " > " : ""}
            </span>
        )
    })

    return (
        <Container>
            <Row>
             <div className="breadcrumbText">{viewItems}</div>
            </Row>
        </Container>
    )
}

export default Breadcrumb