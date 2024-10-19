import Joi from 'joi';

const usersValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({ 'string.email': 'Please enter a valid email address' }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
    }),
  firstName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'string.min': 'First name is required' }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'string.min': 'Last name is required' }),
  gender: Joi.string()
    .min(3)
    .max(20)
    .optional()
    .messages({ 'string.min': 'Gender is required' }).optional(),
  role: Joi.string()
    .valid('learner', 'organization', 'instructor')
    .optional()
    .messages({ 'any.only': 'Role must be either "learner", "organization", or "instructor"' }),
}).optional();

const validateUser = (req, res, next) => {
  const { error } = usersValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

export default validateUser;
