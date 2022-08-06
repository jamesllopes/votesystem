const schemaVotes = require('../validation/schemaVotes')

const validationVotes = async (req, res, next) => {
    try {
        await schemaVotes.validate(req.body)
    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }
    next()
}


module.exports = {
    validationVotes
}