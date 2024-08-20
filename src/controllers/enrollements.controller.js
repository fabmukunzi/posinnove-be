import Enrollment from "../database/models/enrollement.model";
import Project from "../database/models/project.model";
import User from "../database/models/user.model";


export const createEnrollment = async (req, res) => {
    const {projectId} = req.params.id;
    const userId = req.user.id;
    try {
      const newEnrollment = await Enrollment.create({ projectId, userId });
      return res.status(201).json({
        status: "success",
        message: "Enrollment created successfully",
        data: {
          enrollment: newEnrollment,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
}
export const  unEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEnrollment = await Enrollment.destroy({ where: { id } });
    return res.status(200).json({
      status: "success",
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const getProjectEnrollments = async (req, res) => {
    const { projectId } = req.params;
    const creatorId = req.user.id;
  
    try {
      const project = await Project.findByPk(projectId, {
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });
  
      if (!project) {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
        });
      }
  
      // Check if the requesting user is the project creator
      if (project.creator.id !== creatorId) {
        return res.status(403).json({
          status: "error",
          message: "Only project creator can view enrollments",
        });
      }
  
      const enrollments = await Enrollment.findAll({
        where: { projectId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
  
      return res.status(200).json({
        status: "success",
        message: "Project enrollments retrieved successfully",
        data: {
          projectId,
          enrollments: enrollments.map(enrollment => enrollment.user),
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }