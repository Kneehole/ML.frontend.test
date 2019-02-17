import React from 'react'
import ItemsListItem from './items-list-item'
import './_items-list.scss'

/**
 * Function for callback 'onItemClick(item)'
 * @param {Object} item - The item clicked 
 */

/** Component of a list of items 
 * @property {array} items - the list of items to display
 * @property {function} onItemClick - callback for item clicking detection
 */
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