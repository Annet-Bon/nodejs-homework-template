const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org', 'ua'] } }).required(),

    phone: Joi.string()
		.pattern(new RegExp("^[+][0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}$"))
		.required(),

	favorite: Joi.boolean()
	    .required(),
})

const schemaUpdateContact = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.optional(),

  	email: Joi.string()
    	.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org', 'ua'] } }).optional(),

  	phone: Joi.string()
		.pattern(new RegExp("^[+][0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}$"))
		.optional(),

}).or('name', 'email', 'phone')

const schemaUpdateContactStat = Joi.object({
	favorite: Joi.boolean()
	    .required(),
})

const validate = async (schema, obj, next) => {
  	try {
		await schema.validateAsync(obj)
		return next()
	} catch (err) {
    	console.log(err)
    	next(err)
 	}
}

module.exports = {
	validCreateContact: async (req, _res, next) => {
		return await validate(schemaCreateContact, req.body, next)
	},
	validUpdateContact: async (req, _res, next) => {
		return await validate(schemaUpdateContact, req.body, next)
	},
	validUpdateContactStat: async (req, _res, next) => {
		return await validate(schemaUpdateContactStat, req.body, next)
	},
}