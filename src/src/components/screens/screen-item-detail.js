import React, {Component} from 'react'
import Breadcrumb from '../breadcrumb/breadcrumb'
import ItemDetail from '../item-detail/item-detail'

class ScreenItemDetail extends Component {

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

    getItemId = (props) => {
        props = props || this.props
        return props.match.params.id
    }

    // Fetch items from API
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

    addToCart = () => {
        alert("Función no disponible")
    }

    render () {
        return (
            <div>
                <Breadcrumb items={this.state.categories}/>
                <ItemDetail item={this.state.item} addToCartClick={this.addToCart}/>
                {this.state.error ? "Error" : ""}
            </div>
        )
    }   
}

export default ScreenItemDetail;