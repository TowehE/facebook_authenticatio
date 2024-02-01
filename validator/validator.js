const joi = require("@hapi/joi")

const validateCreateUser = (data)=>{
    try {
        const validateSchema =joi.object({
            firstName: joi.string().min(3).max(20).regex(/^[a-zA-Z]+$/).required().messages({
                "string.patter.base": "kindly use alphabet",
                "string.empty": "First name cannot be empty",
        }),
        

        lastName: joi.string().min(3).max(20).regex(/^[a-zA-Z]+$/).messages({
            "string.patter.base": "kindly use alphabet",
            "string.empty": "First name cannot be empty",
        }),
        password: joi.string().min(8).max(20).pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
            "string.empty": "password cannot be empty",
            "string.min": "password must contain 8 characters long",
            "string.patter.base": "password must contain uppercase,lowercase, lowercase and numbers",
        }),
        email: joi.string().email({ tlds: { allow: false } }).min(5).pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)).trim().required().messages({
            "string.empty":"email cannot be left empty",
            "string.pattern.base": "Invalid email format"
             
        }),  
        gender: joi.string().pattern(new RegExp(/(?:m|M|male|Male|f|F|female|Female|FEMALE|MALE|Not prefer to say)$/)).messages({
            "string.patter.base": "kindly input if you're a male of femal",
            "string.empty": "First name cannot be empty",
        })
    })

        return validateSchema.validate(data)
    } catch (error) {
       console.log(error.message)
    }
}

module.exports = {validateCreateUser}