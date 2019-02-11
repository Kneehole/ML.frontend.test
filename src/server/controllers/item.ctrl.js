
const request = require("request")
const credentials = require("../credentials")
const itemparser = require("../parsers/item.ml.parser")

module.exports = {
    getAll: (req, res, next) => {
        request.get(credentials.mlAPISearchURL(req.query.q, 4), (error, response, body) => {
            if(error) {
                res.send(error)
            }

            // Reponse structure builder
            const author = credentials.author()
            const items = itemparser.parseItemsResponse(body)
            const categories = itemparser.parseItemsCategories(body)
            res.send({author, categories, items})
        })
    },

    getItem: (req, res, next) => {
        res.send("Item detail")
    }
}