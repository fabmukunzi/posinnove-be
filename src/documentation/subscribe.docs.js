const subscribePaths = {
    "/api/subscribe": {
      post: {
        summary: "Create a new subscription",
        tags: ["Subscriptions"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["names", "email"],
                properties: {
                  names: { type: "string" },
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: "Subscription created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        subscribe: {
                          type: "object",
                          properties: {
                            id: { type: "string", format: "uuid" },
                            names: { type: "string" },
                            email: { type: "string", format: "email" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" }
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
            description: "Internal server error"
          }
        }
      }
    },
    // "/api/subscribe/{id}": {
    //   delete: {
    //     summary: "Unsubscribe a user",
    //     tags: ["Subscriptions"],
    //     parameters: [
    //       {
    //         in: "path",
    //         name: "id",
    //         required: true,
    //         schema: {
    //           type: "string",
    //           format: "uuid"
    //         }
    //       }
    //     ],
    //     responses: {
    //       '200': {
    //         description: "Subscription cancelled successfully"
    //       },
    //       '500': {
    //         description: "Internal server error"
    //       }
    //     }
    //   }
    // },
    "/api/subscribe/notify": {
      post: {
        summary: "Send notification email for new blog post",
        tags: ["Notifications"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "summary", "postId"],
                properties: {
                  title: { type: "string" },
                  summary: { type: "string" },
                  postId: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: "Notification emails sent successfully"
          },
          '500': {
            description: "Failed to send notification emails"
          }
        }
      }
    }
  };
  
  export default subscribePaths;