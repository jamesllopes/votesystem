const express = require('express');
const routes = express();
const { createQuestions } = require('./controllers/createQuestions')
const updateQuestion = require('./controllers/updateQuestion')
const { listQuestions, listOneQuestion } = require('./controllers/listQuestions')
const { validationQuestions } = require('./middlewares/validationQuestions')
const { deleteQuestion } = require('./controllers/deleteQuestions')
const { countVote } = require('./controllers/countVotes')
const { validationVotes } = require('./middlewares/validationVotes')

routes.get('/questions', listQuestions)
routes.get('/questions/:id', listOneQuestion)
routes.post('/questions', validationQuestions, createQuestions)
routes.put('/questions/:id', updateQuestion)
routes.put('/vote/:id', validationVotes, countVote)
routes.delete('/questions/:id', deleteQuestion)

module.exports = routes;