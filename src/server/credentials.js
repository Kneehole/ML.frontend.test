

module.exports = {

    author: () => {
        return {
            name: 'Nahuel',
            lastname: 'Morales'
          }
    },

    mlAPISearchURL: (query, limit) => {
        let url = "https://api.mercadolibre.com/sites/MLA/search?q=" + query
        if (limit)  url += "&limit=" + limit
        return url
    }
}