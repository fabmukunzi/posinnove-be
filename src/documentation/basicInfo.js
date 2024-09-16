const basicInfo = {
    openapi: "3.0.0",
    info: {
      title: "Posinnove API",
      version: "1.0.0",
      description: "This is the APIs documentation for Posinnove Platform"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server"
      },
      {
        url: "https://posinnove-be.vercel.app/",
        description: "Production server (HTTPS)"
      }
    ],
    tags: [
      {
        name: "Welcome",
        description: "Welcome endpoints for Posinnove Backend"
      },
      {
        name: "Authentication",
        description: "APIs for managing Authentication"
      },
      {
        name: "Interests",
        description: "APIs for managing user interests"
      },
      {
        name: "Profile",
        description: "APIs for managing Profile"
      },
      {
        name: "Users",
        description: "APIs for managing Users"
      },
      {
        name: "Project Categories",
        description: "APIs for managing Project Categories"
      },{
        name: "Project",
        description: "APIs for managing Projects"
      },
      
    ],
    components: {
        securitySchemes: {
            Bearer: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
          }
    },
    security: [
      {
        Bearer: []
      }
    ]
  };
  
  export default basicInfo;