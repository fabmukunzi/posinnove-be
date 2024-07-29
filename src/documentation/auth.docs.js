const authenticationPaths = {
    '/api/users/signup': {
      post: {
        summary: 'User Sign Up',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                  gender: { type: 'string' },
                  role: { type: 'string' }
                },
                required: ['firstName', 'lastName', 'email', 'password', 'gender']
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/users/login': {
      post: {
        summary: 'User Login',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully logged in'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/users/verify-email/{token}': {
      get: {
        summary: 'Verify User Account',
        tags: ['Authentication'],
        parameters: [
          {
            in: 'path',
            name: 'token',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Account verified successfully'
          },
          '400': {
            description: 'Verification failed'
          }
        }
      }
    },
    '/api/users/forgetpassword': {
      post: {
        summary: 'Forget Password',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' }
                },
                required: ['email']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Reset password email sent successfully'
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
    '/api/users/resetpassword/{token}': {
      patch: {
        summary: 'Reset Password',
        tags: ['Authentication'],
        parameters: [
          {
            in: 'path',
            name: 'token',
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
                  password: { type: 'string' }
                },
                required: ['password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Password reset successfully'
          },
          '404': {
            description: 'Invalid or expired token'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    }
  };
  
  export default authenticationPaths;