const projectPaths = {
  '/api/projects': {
    post: {
      summary: 'Create a new project',
      tags: ['Project'],
      security: [{ Bearer: [] }],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                projectCategoryId: { type: 'string' },
                projectContent: { type: 'string' },
                maxAttendances: { type: 'integer' },
                level: { type: 'integer' },
                deadline: { type: 'string', format: 'date-time' },
                startDate: { type: 'string', format: 'date-time' },
                coverImage: { type: 'string', format: 'binary' },
                uploads: { 
                  type: 'array',
                  items: { type: 'string', format: 'binary' }
                }
              },
              required: ['title', 'projectCategoryId', 'projectContent', 'maxAttendances', 'level', 'deadline', 'startDate', 'coverImage', 'uploads']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Project created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  projectCategoryId: { type: 'string' },
                  coverImage: { type: 'string' },
                  projectContent: { type: 'string' },
                  maxAttendances: { type: 'integer' },
                  level: { type: 'integer' },
                  deadline: { type: 'string', format: 'date-time' },
                  startDate: { type: 'string', format: 'date-time' },
                  author: { type: 'string' },
                  uploads: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        '400': {
          description: 'Bad request'
        },
        '500': {
          description: 'Internal server error'
        }
      }
    },
    get: {
      summary: 'Get all projects',
      tags: ['Project'],
      security: [{ Bearer: [] }],
      responses: {
        '200': {
          description: 'Projects retrieved successfully',
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
                      projects: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            projectCategoryId: { type: 'string' },
                            coverImage: { type: 'string' },
                            projectContent: { type: 'string' },
                            maxAttendances: { type: 'integer' },
                            level: { type: 'integer' },
                            deadline: { type: 'string', format: 'date-time' },
                            startDate: { type: 'string', format: 'date-time' },
                            author: { type: 'string' },
                            uploads: {
                              type: 'array',
                              items: { type: 'string' }
                            },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' }
                          }
                        }
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
  '/api/projects/{id}': {
    get: {
      summary: 'Get a single project by ID',
      tags: ['Project'],
      security: [{ Bearer: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Project ID'
        }
      ],
      responses: {
        '200': {
          description: 'Project retrieved successfully',
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
                      project: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          title: { type: 'string' },
                          projectCategoryId: { type: 'string' },
                          coverImage: { type: 'string' },
                          projectContent: { type: 'string' },
                          maxAttendances: { type: 'integer' },
                          level: { type: 'integer' },
                          deadline: { type: 'string', format: 'date-time' },
                          startDate: { type: 'string', format: 'date-time' },
                          author: { type: 'string' },
                          uploads: {
                            type: 'array',
                            items: { type: 'string' }
                          },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '404': {
          description: 'Project not found'
        },
        '500': {
          description: 'Internal server error'
        }
      }
    },
    delete: {
      summary: 'Delete a project',
      tags: ['Project'],
      security: [{ Bearer: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Project ID'
        }
      ],
      responses: {
        '200': {
          description: 'Project deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '404': {
          description: 'Project not found'
        },
        '500': {
          description: 'Internal server error'
        }
      }
    }
  }
};

export default projectPaths;