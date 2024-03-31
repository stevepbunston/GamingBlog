const Joi = require('joi');

module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required(),
        game: Joi.string().required(),
        image: Joi.string().required(),
        release: Joi.string().required(),
        console: Joi.string().required(),
        blog: Joi.string().required(),
    }).required()
});
