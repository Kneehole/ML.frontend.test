import React, { Component } from 'react'
import queryString from 'query-string';

class ItemsResult extends Component {

    defaultState = () => {
        return {
            isLoaded: false,
            items: [], 
            error: false
        }
    }
    state = this.defaultState();

    componentDidMount = () => {
        this.getItems(this.getSearchParam(this.props))
    }

    componentDidUpdate = (prevProps) => {
        const search = this.getSearchParam(this.props)
        const prevSearch = this.getSearchParam(prevProps)
        if (search !== prevSearch) this.getItems(search)
    }

    getSearchParam =  (props) => {
        const params = queryString.parse(props.location.search)
        if (params.search && params.search.length > 0) return params.search
    }

    getItems = (search) => {
        if (!search) return this.props.history.replace('/')
        this.setState(this.defaultState());

        fetch("/api/items?q=" + search)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result.items ? result.items.length : 0,
                    error: result.error ? true : false
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true
                });
            }
        )
    }

    render(){
        return (
            <div>
                {this.state.isLoaded?"loaded":"loading"}<br/>
                {this.state.items}<br/>
                {this.state.error?"error":""}
            </div>
        )
    }
}

export default ItemsResult;