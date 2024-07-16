import Joi from 'joi';


const projectValidationSchema = Joi.object({
  title: Joi.string().required(),
  projectContent: Joi.string().required(),
  projectCategoryId: Joi.string().required(),
  maxAttendances: Joi.string().required(),
  startDate: Joi.date().required(),
 deadline: Joi.date().required(),
 level:Joi.number().required(),
 coverImage: Joi.string().required(),
});

const validateProject = (req, res, next) => {
  const { error } = projectValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details.map((detail) => detail.message),
    });
  }
  next();
};

export { projectValidationSchema, validateProject };
