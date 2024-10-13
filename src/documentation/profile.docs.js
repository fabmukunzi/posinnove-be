import { response } from "express";
import { required, types } from "joi";

const profilePaths = {
  "/api/users/profile": {
    get: {
      summary: "Get User Profile",
      tags: ["Profile"],
      security: [{ Bearer: [] }],
      responses: {
        200: {
          description: "Profile fetched successfully",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    patch: {
      summary: "Update User Profile",
      tags: ["Profile"],
      security: [{ Bearer: [] }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                username: { type: "string" },
                email: { type: "string" },
                profileImage: { type: "string", format: "binary" },
                userCoverImage: { type: "string", format: "binary" },
                gender: { type: "string" },
                institution: { type: "string" },
                country: { type: "string" },
                About: { type: "string" },
                userBio: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  message: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      username: { type: "string" },
                      email: { type: "string" },
                      profileImage: { type: "string" },
                      userCoverImage: { type: "string" },
                      gender: { type: "string" },
                      role: { type: "string" },
                      institution: { type: "string" },
                      country: { type: "string" },
                      About: { type: "string" },
                      userBio: { type: "string" },
                      phone: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },    
  },
};

export default profilePaths;
