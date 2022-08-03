const schemaQuestions = require('../validation/schemaQuestions')

const validationQuestions = async (req, res, next) => {
    try {
        await schemaQuestions.validate(req.body)
    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }
    next()
}

module.exports = {
    validationQuestions
}