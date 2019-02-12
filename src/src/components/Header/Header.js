import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import './_header.scss'

class Header extends Component {
    render() {
        return (
            <Container className="header">
                <Row>
                    <Col xs={0} sm={0} md={1} />
                    <Col xs={2} sm={2} md={1}>
                        <Link to="/"><div className="logo"/></Link>
                    </Col>
                    <Col xs={9} sm={9} md={9}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Nunca dejes de buscar"
                                aria-label="Nunca dejes de buscar"/>
                            <InputGroup.Append>
                                <InputGroup.Text><i className="ic-search"></i></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col xs={1} sm={1} md={1} />
                </Row>
            </Container>
        )
    }
}

export default Header;
