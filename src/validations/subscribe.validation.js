import Joi from 'joi';

const subscriberValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({ 'string.email': 'Please enter a valid email address' }),
  
  names: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({ 'string.min': 'names is required' }),
 
  
  
});

const validateSubscriber = (req, res, next) => {
  const { error } = subscriberValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

export default validateSubscriber;
