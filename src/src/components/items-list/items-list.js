import React from 'react'
import ItemsListItem from './items-list-item'

const ItemsList = ({onItemClick, items}) => {
    const viewItems = items.map((item) => {
        return (
            <ItemsListItem key={item.id} item={item} onClick={(i) => onItemClick(i)}/>
        )
    })

    return (
        <div>
            {viewItems}
        </div>
    )
}

export default ItemsList