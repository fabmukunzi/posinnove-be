const enrollmentPaths = {
    'api/enrollments': {
        post: {
            summary: 'Add a new enrollment for a user',
            tags: ['Enrollments'],
            security: [{ Bearer: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                projectId: {
                                    type: 'string',
                                    description: 'ID of the project the user is being enrolled in',
                                },
                            },
                            required: ['projectId'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Enrollment successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Enrollment successful' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string', description: 'Enrollment ID' },
                                            userId: { type: 'string', description: 'User ID' },
                                            projectId: { type: 'string', description: 'Project ID' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Project ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Project ID is required' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
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

        get: {
            summary: 'Get all enrollments',
            tags: ['Enrollments'],
            security: [{ Bearer: [] }],
            responses: {
                '200': {
                    description: 'Successfully fetched all enrollments',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Successfully fetched all Enrollments' },
                                    enrollments: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                userId: { type: 'string' },
                                                projectId: { type: 'string' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to get enrollments',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Failed to get Enrollments' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    'api/enrollments/{id}': {
        get: {
            summary: 'Get a specific enrollment',
            tags: ['Enrollments'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Enrollment fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Enrollment fetched successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            userId: { type: 'string' },
                                            projectId: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Enrollment ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Required enrollment ID missing' },
                                },
                            },
                        },
                    },
                },
                '401': {
                    description: 'Unauthorized to view the enrollment',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'You are not authorized to view this enrollment' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Enrollment not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Enrollment Not Found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to fetch the enrollment',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Failed to fetch Enrollment' },
                                    error: { type: 'string', example: 'Detailed error message' },
                                },
                            },
                        },
                    },
                },
            },
        },

        delete: {
            summary: 'Delete a specific enrollment',
            tags: ['Enrollments'],
            security: [{ Bearer: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'ID of the enrollment to delete',
                },
            ],
            responses: {
                '204': {
                    description: 'Enrollment deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Enrollment deleted successfully' },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Enrollment ID is required',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Enrollment id missing' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to Delete Enrollment',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: 'Failed to Delete Enrollment' },
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

export default enrollmentPaths;
