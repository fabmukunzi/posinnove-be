const taskPaths = {
    '/api/tasks': {
        get: {
            summary: 'Get all tasks',
            tags: ['Tasks'],
            responses: {
                '200': {
                    description: 'Tasks retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                projectId: { type: 'string' },
                                                title: { type: 'string' },
                                                coverImage: { type: 'string' },
                                                taskContent: { type: 'string' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        },
        post: {
            summary: 'Create a new task',
            tags: ['Tasks'],
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                projectId: { type: 'string' },
                                taskContent: { type: 'string' },
                                coverImage: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            },
                            required: ['title', 'projectId', 'taskContent', 'coverImage']
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Task created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            projectId: { type: 'string' },
                                            title: { type: 'string' },
                                            coverImage: { type: 'string' },
                                            taskContent: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error or missing file',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    error: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string' },
                                                path: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    },
    '/api/tasks/{id}': {
        get: {
            summary: 'Get a single task by ID',
            tags: ['Tasks'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Task retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            projectId: { type: 'string' },
                                            title: { type: 'string' },
                                            coverImage: { type: 'string' },
                                            taskContent: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad request, invalid parameters'
                },
                '404': {
                    description: 'Task not found'
                },
                '500': {
                    description: 'Internal server error'
                }
            }
        }
    }
};

export default taskPaths;
