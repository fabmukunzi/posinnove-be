import Joi from 'joi';

const updateProjectSchema = Joi.object({
  title: Joi.string().optional(),
  projectCategoryId: Joi.string().optional(),
  projectContent: Joi.string().optional(),
  maxAttendances: Joi.string().optional(),
  startDate: Joi.date().optional(),
  deadline: Joi.date().optional(),
  level: Joi.number().optional(),
  coverImage: Joi.string().optional(),
  uploads: Joi.array().items(Joi.string()).optional(),
});

export { updateProjectSchema };
