const expertisePaths = {
    '/api/expertises': {
      post: {
        summary: 'Add or update expertise for a user',
        tags: ['Expertise'],
        security: [{ Bearer: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  expertiseNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of expertise names to add or update'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Expertise added or updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    newExpertise: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        userId: { type: 'string' },
                        expertiseNames: {
                          type: 'array',
                          items: { type: 'string' }
                        },
                        updatedAt: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' }
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Failed to add or update expertise',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    error: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      get: {
        summary: 'Get expertise for a user',
        tags: ['Expertise'],
        security: [{ Bearer: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            schema: {
              type: 'string'
            },
            required: false,
            description: 'User ID (optional, defaults to authenticated user)'
          }
        ],
        responses: {
          '200': {
            description: 'Expertise retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        expertise: {
                          type: 'array',
                          items: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'No expertise found for this user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Failed to retrieve expertise',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    error: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  
  export default expertisePaths;  