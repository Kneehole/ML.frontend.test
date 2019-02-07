module.exports = {
    getAll: (req, res, next) => {
        res.send("Articles sample")
    },

    getArticle: (req, res, next) => {
        res.send("Article detail")
    }
}