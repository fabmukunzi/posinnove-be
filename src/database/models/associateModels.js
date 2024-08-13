export default function associateModels(models) {
    const { User, projectCategory, Project ,Enrollment} = models;
  
    User.hasMany(Project, { foreignKey: 'author', as: 'authoredProjects' });
    User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments' });
  
    // Project associations
    Project.belongsTo(User, { foreignKey: 'author', as: 'projectAuthor' });
    Project.belongsTo(projectCategory, { foreignKey: 'projectCategoryId', as: 'category' });
    Project.hasMany(Enrollment, { foreignKey: 'projectId', as: 'enrollments' });
  
    // ProjectCategory associations
    projectCategory.hasMany(Project, { foreignKey: 'projectCategoryId', as: 'projects' });
  
   
    Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'enrolledUser' });
    Enrollment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' }); 
  }