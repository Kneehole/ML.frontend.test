
/** Module with required information for the API */
module.exports = {

    /** Get Author information 
     * @return {Object} 
     */
    author: () => {
        return {
            name: 'Nahuel',
            lastname: 'Morales'
          }
    },

    /** Get full url to get items from ML API 
     * @param {string} query - The query value to search items related
     * @param {number} limit - max items to retrieve
     * @param {string}
     */
    mlAPISearchURL: (query, limit) => {
        let url = "https://api.mercadolibre.com/sites/MLA/search?q=" + query
        if (limit)  url += "&limit=" + limit
        return url
    },

    /** Get full url to get an item's detail from ML API 
     * @param {string} id - The id of the item
     * @param {string}
     */
    mlAPIItemDetailURL: (id) => {
        return "https://api.mercadolibre.com/items/" + id
    },

    /** Get full url to get an item's description from ML API 
     * @param {string} id - The id of the item
     * @param {string}
     */
    mlAPIItemDescriptionURL: (id) => {
        return "https://api.mercadolibre.com/items/" + id + "/description"
    },

    /** Get full url to get the category information from ML API 
     * @param {string} id - The id of the category
     * @param {string}
     */
    mlAPICategoriesURL: (id) => {
        return "https://api.mercadolibre.com/categories/" + id
    }
}