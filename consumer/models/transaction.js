const Joi = require('joi');

module.exports = (app) => app.resource('transaction', {
    agencia: Joi.number(),
    conta: Joi.number(),
    cpfCnpj: Joi.number(),
    celular: Joi.number(),
    nome: Joi.string(),
    email: Joi.string(),
    message: Joi.string(),
    service: Joi.string(),
    createdAt: Joi.date(),
});