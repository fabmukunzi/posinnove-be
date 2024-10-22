import Joi from 'joi';

const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  projectId: Joi.string().uuid().required(),
  coverImage: Joi.string().optional().allow(null, ''),
  taskContent: Joi.string().required(),
});

const validateTask = (req, res, next) => {
  const { error } = taskValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details.map((detail) => detail.message),
    });
  }
  next();
};

export { taskValidationSchema, validateTask };
