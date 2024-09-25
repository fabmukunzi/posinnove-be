import basicInfo from './basicInfo';
import projectPaths from './project.docs';
import welcomeRouteDocs from './welcome.docs';
import authenticationPaths from './auth.docs';
import userPaths from './user.docs';
import projectCategoryPaths from './projectCategory.docs';
import profilePaths from './profile.docs';
import subscribePaths from './subscribe.docs';
import expertisePaths from './expertise.doc';

export default {
    ...basicInfo,
    paths: {
        ...welcomeRouteDocs,
        ...projectPaths,
        ...authenticationPaths,
        ...userPaths,
        ...profilePaths,
        ...projectCategoryPaths,
        ...subscribePaths,
        ...expertisePaths
    },
};