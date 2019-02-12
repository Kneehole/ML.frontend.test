import React from 'react'
import ItemsListItem from './items-list-item'

const ItemsList = (props) => {

    const items = props.items.map((item) => {
        return (
            <ItemsListItem key={item.id} item={item}/>
        )
    })

    return (
        <div>
            {items}
        </div>
    )
}

export default ItemsList