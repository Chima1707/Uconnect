var Joi = require('joi')

var UserSchema = {
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    area: Joi.string().required(),
    phone: Joi.string().regex(/^[0-9]{10,14}$/).required(),
    picture:Joi.string()
}

var loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required()
}

module.exports = {
	schema: {user: UserSchema, login: loginSchema}
}
