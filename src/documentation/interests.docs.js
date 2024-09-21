const interestPaths = {
  '/api/interests': {
    post: {
      summary: 'Add or update interests for a user',
      tags: ['Interests'],
      security: [{ Bearer: [] }],
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
                  description: 'Array of interest names to add or update'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Interests added or updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  newInterests: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      userId: { type: 'string' },
                      interestNames: {
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
          description: 'Failed to add or update interests',
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
      summary: 'Get interests for a user',
      tags: ['Interests'],
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
          description: 'Interests retrieved successfully',
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
                      interests: {
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