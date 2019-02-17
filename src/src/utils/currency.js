
module.exports = {

    currencies: {
        ARS: "$",
        default: "$" 
    },

    /**
     * Get symbol of a currency
     * @param {string} currencyId - currency's id
     * @return {string}
     */
    getSymbol: (currencyId) => {
        const currencies = module.exports.currencies
        return currencies[currencyId] ? currencies[currencyId] : currencies.default
    },

    /**
     * Price formating builder
     * @param {Object} price - Price object to convert
     * @param {string} price.currency - currency's id
     * @param {number} price.amount - integer price's partition
     * @param {number} price.decimals - floating price's partition
     * @return {string}
     */
    getFullPriceDescription: (price) => {
        return module.exports.getSymbol(price.currency) + ' ' + (price.amount + price.decimals)
    }
}