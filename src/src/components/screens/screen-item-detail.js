import React, {Component} from 'react'
import { Helmet } from 'react-helmet';

import Breadcrumb from '../breadcrumb/breadcrumb'
import ItemDetail from '../item-detail/item-detail'
import Spinner from '../spinner/spinner'

/** Component that represent an item detail's screen  */
class ScreenItemDetail extends Component {

    /** Get default state preset
     * @return {Object}
     */
    defaultState = () => {
        return {
            isLoaded: false,
            item: {},
            categories: [], 
            error: false
        }
    }
    state = this.defaultState();

     // Lifecycle control
    componentDidMount = () => {
        this.getDetail(this.getItemId())
    }

    componentDidUpdate = (prevProps) => {
        if (this.getItemId() !== this.getItemId(prevProps)) {
            this.getDetail(this.getItemId())
        }
    }

    /** Get the item id from url path
     * @param {Object} props - current props to parse
     * @return {string}
     */
    getItemId = (props) => {
        props = props || this.props
        return props.match.params.id
    }

    /** Fetch item detail from API 
     * @param {string} itemId - item id to use for fetching the detail
     */
    getDetail = (itemId) => {
        if (!itemId) return this.props.history.replace('/')
        this.setState(this.defaultState());

        fetch("/api/items/" + itemId)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    item: result.item ? result.item : {},
                    categories: result.categories ? result.categories : [],
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

    /** Handle buy button click 
     * @todo Incomplete action for buying process
     */ 
    addToCart = () => {
        alert("Función no disponible")
    }

    render () {
        if (this.state.isLoaded) {
            if (!this.state.error) {
                return (
                    <div>
                        <Helmet>
                            <title>{this.state.item.title} en ML Challenge</title>
                            <meta name="description" content={this.state.item.description} />
                        </Helmet>
                        <Breadcrumb items={this.state.categories}/>
                        <ItemDetail item={this.state.item} addToCartClick={this.addToCart}/>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className="alert_icon"/>
                        <div className="no-results">
                            Parece que la página no existe
                        </div>
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

export default ScreenItemDetail;