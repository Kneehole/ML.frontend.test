

module.exports = {
    
    /**
     * Parse best items categories id from ml search response
     */
    parseItemsCategoriesId: (itemsObj) => {
        const allFilter = itemsObj.available_filters.concat(itemsObj.filters)
        const categoryFilter = allFilter.filter(item => item.id == "category");
        if (categoryFilter.length > 0) {
            return categoryFilter[0].values.sort((i1, i2) => i2.results - i1.results)[0].id
        }
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
            results.push(module.exports.parseSearchItem(mlItem))
        }
        return results;
    },

    /**
     * Item builder from an ml search item
     */
    parseSearchItem: (item) => {
        return Object.assign(module.exports.parseItem(item),
        {
            "address_state": item.address.state_name
        })
    },

    /**
     * Item builder from ml item detail and description
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
     * Base Item builder 
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
            "free_shipping": item.shipping.free_shipping,
        }
    }
}