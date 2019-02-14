
module.exports = {

    conditions: {
        new: "Nuevo",
        used: "Usado",
        not_specified: '',
        default: '' 
    },

    getDescription: (conditionId) => {
        const conditions = module.exports.conditions
        return conditions[conditionId] ? conditions[conditionId] : conditions.default
    }
}