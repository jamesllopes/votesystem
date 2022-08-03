const express = require('express');
const routes = express();
const { createQuestions } = require('./controllers/createQuestions')
const updateQuestion = require('./controllers/updateQuestion')
const { listQuestions } = require('./controllers/listQuestions')
const { validationQuestions } = require('./middlewares/validationQuestions')


routes.get('/questions', listQuestions)
routes.post('/questions', validationQuestions, createQuestions)
routes.put('/questions/:id', updateQuestion)

module.exports = routes;