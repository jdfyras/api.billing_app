const Joi = require('joi')

const Contratschema = Joi.object({
    numContrat: Joi.number().required(),
    cin: Joi.number().required(),
    date_debut: Joi.date().required(),
    date_fin: Joi.date().required(),
    Etat: Joi.string().required(),
})

module.exports = {
    Contratschema,
}
