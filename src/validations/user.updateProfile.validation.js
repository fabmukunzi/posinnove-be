import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  institution: Joi.string().optional(),
  country: Joi.string().optional(),
  About: Joi.string().optional(),
  userBio: Joi.string().optional(),
  phone: Joi.string().optional(),
  password: Joi.string()
  .pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&+\\-*/^%=<>]{8,}$'
    )
  )
  .optional()
  .messages({
    'string.pattern.base':
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
  }),
  // Ensure at least one field is present
}).or('firstName', 'lastName', 'username', 'gender', 'institution', 'country', 'About', 'userBio', 'phone', 'password');
