import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './_breadcrumb.scss'

/**
 * Represents a simple breadcrumb of titles
 * @param {array} items - Ordered list of Strings to use as breadcrumb 
 */
const Breadcrumb = ({items}) => {

    let nestingText = ''
    items.forEach(item => {
        nestingText += (nestingText.length ? ' > ' : '') + item
    });

    return (
        <Container>
            <Row>
             <div className="breadcrumbText">{nestingText}</div>
            </Row>
        </Container>
    )
}

export default Breadcrumb