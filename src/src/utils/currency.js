
module.exports = {

    currencies: {
        ARS: "$",
        default: "$" 
    },

    getSymbol: (currencyId) => {
        const currencies = module.exports.currencies
        return currencies[currencyId] ? currencies[currencyId] : currencies.default
    }
}