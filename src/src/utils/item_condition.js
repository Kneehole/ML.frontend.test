
module.exports = {

    conditions: {
        new: "Nuevo",
        used: "Usado",
        not_specified: '',
        default: '' 
    },

    /**
     * Get description of an item condition
     * @param {string} conditionId - condition's id
     * @return {string}
     */
    getDescription: (conditionId) => {
        const conditions = module.exports.conditions
        return conditions[conditionId] ? conditions[conditionId] : conditions.default
    }
}