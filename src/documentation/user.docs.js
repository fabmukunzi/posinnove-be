const userPaths = {
    '/api/users': {
      get: {
        summary: 'Get All Users',
        tags: ['Users'],
        security: [{ Bearer: [] }],
        responses: {
          '200': {
            description: 'Users fetched successfully'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/users/{id}': {
      get: {
        summary: 'Get Single User',
        tags: ['Users'],
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
            description: 'User fetched successfully'
          },
          '404': {
            description: 'User not found'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/users/{id}/status': {
      patch: {
        summary: 'Change Account Status',
        tags: ['Users'],
        security: [{ Bearer: [] }],
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
                  reasonDeactivated: { type: 'string' }
                },
                required: ['reasonDeactivated']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Account status changed successfully'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    }
  };
  
  export default userPaths;