import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

import queryString from 'query-string';
import ItemsList from '../items-list/items-list'
import Breadcrumb from '../breadcrumb/breadcrumb';
import Spinner from '../spinner/spinner';

import './_screens.scss'

/** Component that represents an items list result screen */
class ScreenItemsResult extends Component {

    /** Get default state preset
     * @return {Object}
     */
    defaultState = () => {
        return {
            isLoaded: false,
            items: [],
            categories: [], 
            error: false,
            searchParam: ''
        }
    }
    state = this.defaultState()

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

    /** Get the Query string search value
     * @param {Object} props - current props to parse
     * @return {string}
     */
    getSearchParam = (props) => {
        props = props || this.props
        const params = queryString.parse(props.location.search)
        if (params.search && params.search.length > 0) return params.search
    }

    /** Fetch items from API 
     * @param {string} search - search value to use for fetching results
     */ 
    getItems = (search) => {
        if (!search) return this.props.history.replace('/')
        this.setState({
            ...this.defaultState(), 
            searchParam:search});

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

    /** Handle item click */ 
    onItemClickHandler = (item) => {
        this.props.history.push('/items/' + item.id)
    }

    render(){
        if (this.state.isLoaded) {
            if (!this.state.error) {
                return (
                    <div>
                        <Helmet>
                            <title>{this.state.searchParam} en ML Challenge</title>
                        </Helmet>
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