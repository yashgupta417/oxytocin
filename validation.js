const Joi=require("joi")

const datePlannerValidator=function(data){
    const schema=Joi.object({
        likes: Joi.array().items(Joi.string()).min(1).required(),
        startingLatitude: Joi.number().required(),
        startingLongitude: Joi.number().required()
    }).options({allowUnknown:true})

    return schema.validate(data).error
}

module.exports = {
    datePlannerValidator
}