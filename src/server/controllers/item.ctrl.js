
const rp = require('request-promise');
const credentials = require("../credentials")
const itemparser = require("../parsers/item.ml.parser")

module.exports = {
    getAll: (req, res, next) => {

        // Chains items search and dependant categories search
        let itemsObj
        rp(credentials.mlAPISearchURL(req.query.q, 4))
        .then(function (itemsResponse) {
            itemsObj = JSON.parse(itemsResponse)
            return rp(credentials.mlAPICategoriesURL(itemparser.parseItemsCategoriesId(itemsObj)))
        })
        .then(function (categoriesResp) {
            categoriesObj = JSON.parse(categoriesResp)

            // Reponse structure builder
            const author = credentials.author()
            const items = itemparser.parseItemsResponse(itemsObj)
            const categories = itemparser.parseCategories(categoriesObj)
            res.send({author, categories, items})
        })
        .catch(function (error) {
            console.dir(error)
            if (error.response && error.response.body) return res.send(error.response.body)
            return res.send(error)
        })
    },

    getItem: (req, res, next) => {

        // Chain item detail, description & categories api calls
        let itemObj, descObj
        rp(credentials.mlAPIItemDetailURL(req.params.id))
        .then(function (body) {
            itemObj = JSON.parse(body)
            return rp(credentials.mlAPIItemDescriptionURL(req.params.id))
        })
        .then(function (description) {
            descObj = JSON.parse(description)
            return rp(credentials.mlAPICategoriesURL(itemObj.category_id))
        })
        .then(function (categoriesResp) {
            categoriesObj = JSON.parse(categoriesResp)
            
            // Response structure builder
            const author = credentials.author()
            const item = itemparser.parseItemDetailResponse(itemObj, descObj)
            const categories = itemparser.parseCategories(categoriesObj)
            res.send({author, categories, item})
        })
        .catch(function (error) {
            console.dir(error)
            if (error.response && error.response.body) return res.send(error.response.body)
            return res.send(error)
        })
    }
}