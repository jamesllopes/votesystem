const express = require('express');
const routes = express();
const { createQuestions } = require('./controllers/createQuestions')
const updateQuestion = require('./controllers/updateQuestion')
const { listQuestions } = require('./controllers/listQuestions')
const { validationQuestions } = require('./middlewares/validationQuestions')
const { deleteQuestion } = require('./controllers/deleteQuestions')


routes.get('/questions', listQuestions)
routes.post('/questions', validationQuestions, createQuestions)
routes.put('/questions/:id', updateQuestion)
routes.delete('/question/:id', deleteQuestion)

module.exports = routes;