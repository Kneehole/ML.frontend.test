import React, { Component } from 'react'
import queryString from 'query-string';
import ItemsList from './items-list/items-list'

import './_items-result.scss'

class ItemsResult extends Component {

    defaultState = () => {
        return {
            isLoaded: false,
            items: [], 
            error: false
        }
    }
    state = this.defaultState();

    // Lifecycle control
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

    // Fetch items from API
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

    // Handle item clicked
    onItemClickHandler = (item) => {
        this.props.history.push('/items/' + item.id)
    }

    render(){
        if (this.state.isLoaded) {
            if (!this.state.error) {
                return (
                    <div>
                        <div>
                            <br/>
                        </div>
                        <ItemsList items={this.state.items} onItemClick={this.onItemClickHandler} />
                    </div>
                )
            } else {
                return (
                    <div className="no-results">
                        No hay publicaciones que coincidan con tu búsqueda
                    </div>
                )
            }
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        
    }
}

export default ItemsResult;