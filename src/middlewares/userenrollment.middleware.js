import { handleInternalServerError, handleNotFound } from "../utils/errorHandlers";
import { ProjectService } from "../services/project.services";
import Enrollment from "../database/models/enrollement.model";

export const checkEnrollmentStatus = async (req, res, next) => {
    const user = req.user;
    const { projectId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({
            where: { userId: user.id, projectId }
        });

        if (enrollment) {
            if (user.role === 'instructor' || user.role === 'admin') {
                const projectWithTasksAndEnrollments = await ProjectService.getProjectWithTasksAndEnrollments(projectId);
                if (handleNotFound(res, { 'Project with Tasks and Enrollments': projectWithTasksAndEnrollments })) return next();

                req.project = projectWithTasksAndEnrollments;
                return next();
            }

            const projectWithTasks = await ProjectService.getProjectWithTasks(projectId);
            if (handleNotFound(res, { 'Project with Tasks': projectWithTasks })) return next();

            req.project = projectWithTasks;
            return next();
        }

        const projectWithoutTasks = await ProjectService.getProjectById(projectId);
        if (handleNotFound(res, { 'Project without Tasks': projectWithoutTasks })) return next();

        req.project = projectWithoutTasks;
        return next();

    } catch (error) {
        return handleInternalServerError(res, error);
    }
};
