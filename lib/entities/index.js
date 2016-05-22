var Joi = require('joi')

var userSchema = {
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    area: Joi.string().required(),
    phone: Joi.string().regex(/^[0-9]{10,14}$/).required(),
    picture:Joi.string(),
    state:Joi.string()
}

var loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required()
}

var newsSchema = {
    title: Joi.string().required(),
    subtitle: Joi.string(),
    content: Joi.string().required(),
    comments: Joi.array().items(Joi.object({content: Joi.string().required(),
           date: Joi.string().required(), username: Joi.string().required(),
           pictures: Joi.array().items(Joi.string()) })),
    pictures: Joi.array().items(Joi.string())
}

module.exports = {
	schema: {user: userSchema, login: loginSchema, news: newsSchema}
}
