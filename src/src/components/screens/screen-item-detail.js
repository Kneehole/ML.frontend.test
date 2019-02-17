import React, {Component} from 'react'
import Breadcrumb from '../breadcrumb/breadcrumb'
import ItemDetail from '../item-detail/item-detail'
import Spinner from '../spinner/spinner'

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

    // Handle buy button
    addToCart = () => {
        alert("Función no disponible")
    }

    render () {
        if (this.state.isLoaded) {
            if (!this.state.error) {
                return (
                    <div>
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