import { EnrollmentService } from "../services/enrolloments.services";


export const createNewEnrollment = async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.body;

    if (!projectId) {
        return res.status(400).json({
            status: 'fail',
            message: 'Project ID is required',
        })
    }

    const newEnrollmentData = {
        userId,
        projectId
    };

    try {
        const enrollmentResponse = await EnrollmentService.createNewEnrollments(newEnrollmentData);

        return res.status(201).json({
            status: 'success',
            message: 'Enrollment successful',
            data: enrollmentResponse
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'An internal server error occured',
            error: error.message
        })
    }
}

export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await EnrollmentService.getAllEnrollments();

        return res.status(200).json({
            message: 'Successfully fetched all Enrollments',
            enrollments
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to get Enrollments',
            error: error.message
        })
    }
}


export const getSingleEnrollment = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Required enrollment ID missing',
        })
    }

    try {
        const enrollmentData = await EnrollmentService.getSingleEnrollment(id);

        if (!enrollmentData) {
            return res.status(404).json({
                message: 'Enrollment Not Found',
            })
        }

        if (enrollmentData.userId !== userId || req.user.role !== 'admin') {
            return res.status(401).json({
                message: 'You are not authorized to view this enrollment'
            })
        }

        return res.status(200).json({
            message: 'Enrollment fetched successfully',
            data: enrollmentData
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch Enrollment',
            error: error.message
        })
    }
}

export const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Enrollment id missing'
        })
    }
    
    try {

        await EnrollmentService.deleteEnrollment(id);

        return res.status(204).json({
            status: 'success',
            message: 'Enrollment deleted successfully',
        })
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: 'Failed to Delete Enrollment',
            error: err.message
        })
    }
}