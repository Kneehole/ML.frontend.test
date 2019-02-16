import React from 'react'
import ItemsListItem from './items-list-item'
import './_items-list.scss'

const ItemsList = ({onItemClick, items}) => {
    const viewItems = items.map((item) => {
        return (
            <ItemsListItem key={item.id} item={item} onClick={(i) => onItemClick(i)}/>
        )
    })

    return (
        <div className="list_container">
            {viewItems}
        </div>
    )
}

export default ItemsList