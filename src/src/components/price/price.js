import React from 'react'

import './_price.scss'

const Currency = require("../../utils/currency")

/** Component that represent a price */
const Price = ({price}) => {

    const getAmount = () => {
        return price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    const getDecimals = () => {
        return String(price.decimals.toFixed(2)).replace("0.", "")
    }

    return (
        <div className="price_comp">
            <span className="symbol">{Currency.getSymbol(price.currency)}</span>
            <span className="amount">{getAmount()}</span>
            <span className="decimals">{getDecimals()}</span>
        </div>
    )
}

export default Price;
