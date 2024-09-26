// import Expertise from "./expertise.model";

export default function associateModels(models) {
  const { User, projectCategory, Project, Enrollment, Interest, Expertise } = models;

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
}
