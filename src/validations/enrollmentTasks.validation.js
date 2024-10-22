import Joi from 'joi';

const enrollmentTaskValidationSchema = Joi.object({
  enrollmentId: Joi.string().required(),
  taskId: Joi.string().required(),
  status: Joi.string()
    .valid('not_started', 'in_progress', 'review_pending', 'completed')
    .default('not_started'),
  isCompleted: Joi.boolean().default(false),
  submissionContent: Joi.string().allow(''),
  startedAt: Joi.date().optional(),
  completedAt: Joi.date().optional(),
});

const validateEnrollmentTask = (data) => {
  return enrollmentTaskValidationSchema.validate(data, { abortEarly: false });
};

export { enrollmentTaskValidationSchema, validateEnrollmentTask };
