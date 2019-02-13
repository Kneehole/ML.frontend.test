import React, {Component} from 'react'
import Breadcrumb from './breadcrumb/breadcrumb'

class ItemDetail extends Component {

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
                    item: result.items ? result.items : {},
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

    render () {
        return (
            <div>
                <Breadcrumb items={this.state.categories}/>
                {this.state.item.title}
                {this.state.error ? "Error" : ""}
            </div>
        )
    }   
}

export default ItemDetail;