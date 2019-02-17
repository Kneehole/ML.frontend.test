const itemscontroller = require('../controllers/item.ctrl')

/**
 * Router configuration for items
 * @param {Object} router - The router to add routes
 */
module.exports = (router) => {

    /** get all items 
     * i.e.: /items?q={keywords}
    */
    router
        .route('/items')
        .get(itemscontroller.getAll)

    /** get a particlular item to view 
     * i.e.: /items/{itemId}
    */
    router
        .route('/items/:id')
        .get(itemscontroller.getItem)
}