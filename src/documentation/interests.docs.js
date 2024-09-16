const interestPaths = {
    '/api/interests': {
      post: {
        summary: 'Add interests for a user',
        tags: ['Interests'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  interestNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of interest names to add'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Interests added successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    newInterests: { type: 'object' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Failed to add interests',
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
      patch: {
        summary: 'Update interests for a user',
        tags: ['Interests'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  interestNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of updated interest names'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Interests updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    interest: { type: 'object' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'No interests found for this user',
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
            description: 'Failed to update interests',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    error: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      },
      get: {
        summary: 'Get interests for a user',
        tags: ['Interests'],
        security: [{ BearerAuth: [] }],
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
            description: 'Interests retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    interests: { type: 'object' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'No interests found for this user',
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
            description: 'Failed to retrieve interests',
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
  
  export default interestPaths;