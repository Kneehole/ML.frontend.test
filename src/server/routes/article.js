const articlecontroller = require('./../controllers/article.ctrl')

module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(articlecontroller.getAll)

    /**
     * get a particlular article to view
     */
    router
        .route('/article/:id')
        .get(articlecontroller.getArticle)
}