import React, { Component } from 'react'
import queryString from 'query-string';
import ItemsList from './ItemsList/ItemsList'

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
                    items: result.items ? result.items : [],
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
                <div>
                    {this.state.isLoaded?"loaded":"loading"}<br/>
                    {this.state.items.length}<br/>
                    {this.state.error?"error":""}
                </div>
                <ItemsList items={this.state.items} />
            </div>
        )
    }
}

export default ItemsResult;