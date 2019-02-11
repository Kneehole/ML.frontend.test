const itemscontroller = require('../controllers/item.ctrl')

/**
 * Router configuration for items
 */
module.exports = (router) => {

    /**
     * get all items
     */
    router
        .route('/items')
        .get(itemscontroller.getAll)

    /**
     * get a particlular item to view
     */
    router
        .route('/items/:id')
        .get(itemscontroller.getItem)
}