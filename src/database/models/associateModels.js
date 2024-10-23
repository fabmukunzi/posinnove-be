// import Expertise from "./expertise.model";

export default function associateModels(models) {
  const { User, projectCategory, Project, Enrollment, Interest, Expertise, Task, enrollmentTask, Feedback, Review } = models;

  // User associations
  User.hasMany(Project, { foreignKey: 'author', as: 'authoredProjects' });
  User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments' });
  User.hasMany(Expertise, { foreignKey: 'userId', as: 'userExpertises' });

  // Project associations
  Project.belongsTo(User, { foreignKey: 'author', as: 'projectAuthor' });
  Project.belongsTo(projectCategory, { foreignKey: 'projectCategoryId', as: 'category' });
  Project.hasMany(Enrollment, { foreignKey: 'projectId', as: 'enrollments' });
  User.hasMany(Interest, { foreignKey: 'userId', as: 'userInterests' });

  // ProjectCategory associations
  projectCategory.hasMany(Project, { foreignKey: 'projectCategoryId', as: 'projects' });

  // Enrollment associations
  Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'enrolledUser' });
  Enrollment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' }); 

  //interests users relationship

  Interest.belongsTo(User, { foreignKey: "userId", as: 'userInterests' });

  // Expertise users relationship
  Expertise.belongsTo(User, { foreignKey: "userId", as: 'userExpertises' });

  // Task associations
  Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
  Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

  // EnrollmentTask associations many to many
  Enrollment.belongsToMany(Task, { through: enrollmentTask, foreignKey: 'enrollmentId', as: 'tasks' });
  Task.belongsToMany(Enrollment, { through: enrollmentTask, foreignKey: 'taskId', as: 'enrollments' });

  // Feedback associations
  User.hasMany(Feedback, { foreignKey: 'mentorId', as: 'feedback_given' });
  Feedback.belongsTo(User, { foreignKey: 'mentorId', as: 'mentor' });

  Enrollment.hasMany(Feedback, { foreignKey: 'enrollmentId', as: 'feedback_recieved' });
  Feedback.belongsTo(Enrollment, { foreignKey: 'enrollmentId', as: 'enrollment' });

  enrollmentTask.hasMany(Feedback, { foreignKey: 'enrollmentTaskId', as: 'feedback_received' });
  Feedback.belongsTo(enrollmentTask, { foreignKey: 'enrollmentTaskId', as: 'task' });

  // Review associations
  Enrollment.hasOne(Review, { foreignKey: 'enrollmentId', as: 'review' });
  Review.belongsTo(Enrollment, { foreignKey: 'enrollmentId', as: 'enrollment' });

  User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
  Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Project.hasMany(Review, { foreignKey: 'projectId', as: 'reviews' });
  Review.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
}
