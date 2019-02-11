

module.exports = {
    
    /**
     * Parse items categories from ml search response
     */
    parseItemsCategories: (body) => {
        bodyObj = JSON.parse(body)

        const categories = bodyObj.available_filters.filter(item => item.id == "category")[0].values
        return categories.sort((i1, i2) => i2.results - i1.results).map(item => item.name)
    },

    /**
     * Parse items from ml search response
     */
    parseItemsResponse: (body) => {
        bodyObj = JSON.parse(body)

        const mlResults = bodyObj.results
        const results = []

        const length = mlResults.length
        for (let index = 0; index < length; index++) {
            const mlItem = mlResults[index];
            results.push(module.exports.parseItem(mlItem))
        }
        return results;
    },

    /**
     * Item builder from an ml search item
     */
    parseItem: (item) => {
        return {
            "id": item.id,
            "title": item.title,
            "price": {
                "currency": item.currency_id,
                "amount":  Math.trunc(item.price),
                "decimals": +(item.price - Math.trunc(item.price)).toFixed(2)
            },
            "picture": item.thumbnail,
            "condition": item.condition,
            "free_shipping": item.shipping.free_shipping
        }
    }

}