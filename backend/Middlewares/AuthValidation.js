const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(100).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be a 10-digit number.'
    }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .required()
    .messages({
      'any.only': 'Gender must be Male, Female, or Other.'
    })
});

const signupValidation = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message, 
      success: false
    });
  }

  next();
};


module.exports = {
  signupValidation,
  loginValidation
};
