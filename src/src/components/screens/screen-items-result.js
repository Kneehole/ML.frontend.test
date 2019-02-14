import React, { Component } from 'react'
import queryString from 'query-string';
import ItemsList from '../items-list/items-list'
import Breadcrumb from '../breadcrumb/breadcrumb';
import Spinner from '../spinner/spinner';

import './_screens.scss'

class ScreenItemsResult extends Component {

    defaultState = () => {
        return {
            isLoaded: false,
            items: [],
            categories: [], 
            error: false
        }
    }
    state = this.defaultState();

    // Lifecycle control
    componentDidMount = () => {
        this.getItems(this.getSearchParam())
    }

    componentDidUpdate = (prevProps) => {
        const search = this.getSearchParam()
        if (search !== this.getSearchParam(prevProps)) {
            this.getItems(search)
        }
    }

    getSearchParam = (props) => {
        props = props || this.props
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
                    categories: result.categories,
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
                        <Breadcrumb items={this.state.categories}/>
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
                <Spinner/>
            )
        }
        
    }
}

export default ScreenItemsResult;