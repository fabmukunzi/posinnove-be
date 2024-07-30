const projectCategoryPaths = {
    '/api/categories': {
      post: {
        summary: 'Create a new project category',
        tags: ['Project Categories'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  projectCategory: { type: 'string' },
                  description: { type: 'string' }
                },
                required: ['projectCategory', 'description']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Project category created successfully',
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
                        projectCategory: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            projectCategory: { type: 'string' },
                            description: { type: 'string' },
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
          '500': {
            description: 'Internal server error'
          }
        }
      },
      get: {
        summary: 'Get all project categories',
        tags: ['Project Categories'],
        responses: {
          '200': {
            description: 'Project categories retrieved successfully',
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
                        projectCategories: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'string' },
                              projectCategory: { type: 'string' },
                              description: { type: 'string' },
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
    '/api/categories/{id}': {
      get: {
        summary: 'Get a project category by ID',
        tags: ['Project Categories'],
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
            description: 'Project category retrieved successfully',
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
                        projectCategory: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            projectCategory: { type: 'string' },
                            description: { type: 'string' },
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
          '500': {
            description: 'Internal server error'
          }
        }
      },
      patch: {
        summary: 'Update a project category',
        tags: ['Project Categories'],
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
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  projectCategory: { type: 'string' },
                  description: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Project category updated successfully',
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
                        projectCategory: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            projectCategory: { type: 'string' },
                            description: { type: 'string' },
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
          '500': {
            description: 'Internal server error'
          }
        }
      },
      delete: {
        summary: 'Delete a project category',
        tags: ['Project Categories'],
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
            description: 'Project category deleted successfully',
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
          '500': {
            description: 'Internal server error'
          }
        }
      }
    }
  };
  
  export default projectCategoryPaths;