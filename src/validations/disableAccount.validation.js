// validations/account.validation.js
import Joi from 'joi';

const schema = Joi.object({
  reasonDeactivated: Joi.string().required().when('active', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const validateAccountStatusUpdate = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({  
     status: 'fail',
    message: 'Reason for deactivating account is required',
    errors: errors

  });
  }

  next();
};
export default validateAccountStatusUpdate;