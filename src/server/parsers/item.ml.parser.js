

module.exports = {
    
    /**
     * Parse best items categories id from ml search response
     */
    parseItemsCategoriesId: (itemsObj) => {
        const categories = itemsObj.available_filters.filter(item => item.id == "category")[0].values
        return categories.sort((i1, i2) => i2.results - i1.results)[0].id
    },

    /**
     * Parse categories from ml categories response
     */
    parseCategories: (categoriesObj) => {
        return categoriesObj.path_from_root.map(item => item.name)
    },

    /**
     * Parse items from ml search response
     */
    parseItemsResponse: (bodyObj) => {
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
     * Parse item detail from ml item detail and description
     */
    parseItemDetailResponse: (item, description) => {
        return Object.assign(module.exports.parseItem(item),
        {
            "picture": item.pictures[0].url,
            "sold_quantity":item.sold_quantity,
            "description": description.plain_text
        })
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