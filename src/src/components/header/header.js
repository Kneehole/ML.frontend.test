import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import './_header.scss'

class Header extends Component {

    state = {
        searchQuery: ''
    }

    inputChangeHandler = (event) => {
        this.setState({
            searchQuery: event.target.value
        })
    }

    inputKeyPressHandler = (event) => {
        if (event.key === "Enter") {
            this.inputSubmitHandler();
        }
    }

    inputSubmitHandler = () => {
        if (this.state.searchQuery.length > 0) {
            this.props.history.push('/items?search=' + this.state.searchQuery)
        }
    }

    render() {
        return (
            <div className="header">
                <Container >
                    <Row>
                        <Col xs={2} sm={2} md={1}>
                            <Link to="/"><div className="logo"/></Link>
                        </Col>
                        <Col xs={10} sm={10} md={11}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Nunca dejes de buscar"
                                    aria-label="Nunca dejes de buscar"
                                    onChange={this.inputChangeHandler}
                                    onKeyPress={this.inputKeyPressHandler}/>
                                <InputGroup.Append>
                                    <InputGroup.Text onClick={this.inputSubmitHandler}><i className="ic-search"></i></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(Header);