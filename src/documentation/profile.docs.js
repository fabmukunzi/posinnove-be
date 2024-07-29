const profilePaths = {
    '/api/users/profile': {
      get: {
        summary: 'Get User Profile',
        tags: ['Profile'],
        security: [{ Bearer: [] }],
        responses: {
          '200': {
            description: 'Profile fetched successfully'
          },
          '500': {
            description: 'Internal server error'
          }
        }
      }
    }
  };
  
  export default profilePaths;