
const Promise = require('bluebird')
const rp = require('request-promise')
const credentials = require("../credentials")
const itemparser = require("../parsers/item.ml.parser")

module.exports = {
    getAll: (req, res, next) => {

        // Chains items search and dependant categories search
        let itemsObj
        rp(credentials.mlAPISearchURL(req.query.q, 4)) // Get Search
        .then(function (itemsResponse) {
            itemsObj = JSON.parse(itemsResponse)
            return Promise.all([
                JSON.parse(itemsResponse),
                rp(credentials.mlAPICategoriesURL(itemparser.parseItemsCategoriesId(itemsObj))) // Get categories
            ])
        })
        .then(function (responses) {
            // Reponse structure builder
            const author = credentials.author()
            const items = itemparser.parseItemsResponse(responses[0]) // 0:items
            const categories = itemparser.parseCategories(JSON.parse(responses[1])) // 1:categories
            res.send({author, categories, items})
        })
        .catch(function (error) {
            console.dir(error)
            if (error.response && error.response.body) return res.send(error.response.body)
            return res.send(error)
        })
    },

    getItem: (req, res, next) => {

        Promise.all([
            rp(credentials.mlAPIItemDetailURL(req.params.id)), // Get detail
            rp(credentials.mlAPIItemDescriptionURL(req.params.id)) // Get description
        ]).then(function (responses) { 
            const detail = JSON.parse(responses[0])
            const description = JSON.parse(responses[1])
            return Promise.all([
                detail,
                description,
                rp(credentials.mlAPICategoriesURL(detail.category_id)) // Get Categories
            ])
        }).then(function (responses) {            
            // Response structure builder
            const author = credentials.author()
            const item = itemparser.parseItemDetailResponse(responses[0], responses[1]) // 0:detail & 1:description
            const categories = itemparser.parseCategories(JSON.parse(responses[2])) // 2:categories
            res.send({author, categories, item})

        })
        .catch(function (error) {
            console.dir(error)
            if (error.response && error.response.body) return res.send(error.response.body)
            return res.send(error)
        })
    }
}