const enrollmentTasksPaths = {
    '/api/enrollment-tasks': {
        post: {
            summary: 'Add a new task to an enrollment',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                enrollmentId: {
                                    type: 'string',
                                    description: 'ID of the enrollment',
                                },
                                taskId: {
                                    type: 'string',
                                    description: 'ID of the task',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Task added to enrollment successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Task Added to Enrollment successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            enrollmentTaskId: { type: 'string' },
                                            enrollmentId: { type: 'string' },
                                            taskId: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request - validation error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Validation Error' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment or task not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment or Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to add task to enrollment',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/enrollment-tasks': {
        get: {
            summary: 'Get all enrollment tasks',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            responses: {
                '200': {
                    description: 'All enrollment tasks fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'All enrollments fetched successfully' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                enrollmentTaskId: { type: 'string' },
                                                enrollmentId: { type: 'string' },
                                                taskId: { type: 'string' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to fetch enrollment tasks',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/enrollment-tasks/{id}': {
        get: {
            summary: 'Get tasks by enrollment ID',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment to fetch tasks for',
                },
            ],
            responses: {
                '200': {
                    description: 'Enrollment tasks fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                enrollmentTaskId: { type: 'string' },
                                                enrollmentId: { type: 'string' },
                                                taskId: { type: 'string' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request - enrollment ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment ID is required' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment tasks not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to fetch enrollment tasks',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
        delete: {
            summary: 'Delete an enrollment task',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment task to delete',
                },
            ],
            responses: {
                '204': {
                    description: 'Enrollment task deleted successfully',
                },
                '400': {
                    description: 'Bad request - enrollment task ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task ID is required' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment task not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to delete the enrollment task',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/enrollment-tasks/{id}/start': {
        put: {
            summary: 'Start an enrollment task',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment task to start',
                },
            ],
            responses: {
                '200': {
                    description: 'Enrollment task started successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Task Started successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            enrollmentTaskId: { type: 'string' },
                                            status: { type: 'string' },
                                            startedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request - enrollment task ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task ID is required' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment task not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to start the enrollment task',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/enrollment-tasks/{id}/submit': {
        patch: {
            summary: 'Submit an enrollment task',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment task to submit',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                submissionContent: {
                                    type: 'string',
                                    description: 'Content submitted for the task',
                                    format: 'binary'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Enrollment task submitted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Task Submitted successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            enrollmentTaskId: { type: 'string' },
                                            status: { type: 'string' },
                                            submissionContent: { type: 'string' },
                                            submittedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request - submission content is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Submission content is required' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment task not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to submit the enrollment task',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/enrollment-tasks/{id}/review': {
        put: {
            summary: 'Review an enrollment task',
            tags: ['Enrollment Tasks'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment task to review',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                feedback: {
                                    type: 'string',
                                    description: 'Feedback for the task submission',
                                },
                                isApproved: {
                                    type: 'boolean',
                                    description: 'Approval status of the task submission',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Enrollment task reviewed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Task Reviewed successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            enrollmentTaskId: { type: 'string' },
                                            feedback: { type: 'string' },
                                            isApproved: { type: 'boolean' },
                                            reviewedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request - feedback is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Feedback is required' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment task not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment Task Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to review the enrollment task',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'An internal server error occurred' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default enrollmentTasksPaths;
